import {
    deletarPostagem,
    receberUsuario,
    adicionarLike,
    retirarLike,
  } from "../services/index.js";
  
  export function postTemplate(post) {
    const userInfo = receberUsuario();
    const componente = document.createElement("div");
    const conteudo = `
  <div id="${post.id}" class="post-id">
    <div class="usuario-card">
      <h3>${post.data?.username}</h3>
    </div>
    <div class="texto-card">
    <p>${post.data?.text}</p>
    </div>
    <div class="like">
    <span class="like-n"> ${post.data?.array_likes.length}</span>
    <button class="like" data-func="like">Curtir</button>
    </div>
    <div class="none">
      <button class="deletar">Deletar</button>
    </div>
    
  </div>
  `;
    componente.innerHTML = conteudo;

    let liked = false;
    componente.addEventListener("click", (event) => {
      if (event.target.dataset.func === "like") {
        const somarLike = () => {
          const curtir = event.target.previousElementSibling;
          const curtida = Number(curtir.innerText);
          curtir.innerText = curtida + 1;
          liked = true;
        };
        const diminuirLike = () => {
          const curtir = event.target.previousElementSibling;
          const curtida = Number(curtir.innerText);
                curtir.innerText = curtida - 1;
                liked = false;
      };

      if (liked) {
      diminuirLike();
      retirarLike(userInfo.uid, post.id);
    } 
      else {
      somarLike();
      adicionarLike(userInfo.uid, post.id);
    }
  }
});

    //DELETAR
    const btnDeletar = componente.querySelector(".deletar");
    if (post.data.user_id === userInfo.uid) {
      const divClassNone = componente.querySelector(".none");
      divClassNone.style.display = "flex";
    }
    btnDeletar.addEventListener("click", () => {
      deletarPostagem(post.id).then(() => {
        const btnsIntera = btnDeletar.parentNode;
        const divPost = btnsIntera.parentNode;
        divPost.remove();
        // console.log(btnsIntera);
      });
    });
    return componente;
}