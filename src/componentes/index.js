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
      <div class="texto-card">
      <p>${post.data?.text}</p>
      </div>
      <div class="none">
      <button class="like">${post.data?.likes}Curtir</button>
      <button class="deletar">Deletar</button>
      </div>
    
  </div>
  `;
    componente.innerHTML = conteudo;
  
    //DELETAR
    const btnDeletar = componente.querySelector(".deletar");
    if (post.data.user_id === userInfo.uid);
    
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



