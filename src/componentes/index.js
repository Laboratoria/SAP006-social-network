import {
    deletarPostagem,
    receberUsuario,
  } from "../services/index.js";
  
  export function postTemplate(post) {
    const userInfo = receberUsuario();
    const componente = document.createElement("div");
    const conteudo = `
  <div id="${post.id}">
    <div class="usuario-card">
      <h3>${post.data?.username}</h3>
    </div>
    <div class="id-filme-card">
      <h2>${post.data?.film_name}</h2>
      <section>${post.data?.film_img}</section>
    </div>
    <div class="texto-card">
    <p>${post.data?.text}</p>
    </div>
    <button class="like">${post.data?.likes}Curtir</button>
    <div class="none">
      <button class="editar">Editar</button>
      <button class="deletar">Deletar</button>
    </div>
    
  </div>
  `;
    componente.innerHTML = conteudo;
  
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