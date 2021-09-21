import {
  postarMensagem,
  receberUsuario,
  logOut,
} from "../../services/index.js";
import { postTemplate } from "../../componentes/index.js";
export default () => {
  const container = document.createElement("div");

  const template = `
  <header class="header-feed">
  <div class="container-feed">
  <a href="#" class="logo"><img src="img/pet-friendly.png" alt="pet"></a>
      <nav class=" header_menu">
   
        <ul>
          <li><a href="#">Sair</a></li>				
         	</ul>
      </nav>
  </div>
<nav class="sidenav">
<div class="container-feed">
  <ul>
  
    <li><a href="https://ilm.org.br/adote"><img src="img/adocao.png" alt="Adoção" width="60" height="60"></a></li>
    <span class="rotulo">Adoção</span>
    <li><a href="https://www.petlove.com.br/dicas/tipos-de-alimentos-para-caes#:~:text=Hoje%20em%20dia%2C%20al%C3%A9m%20dos,com%20o%20tempo%20ser%20inadequada."><img src="img/racao.png" alt="Alimentação" width="60" height="60"></a></li>
    <span class="rotulo">Alimentação</span>
    <li><a href="https://www.folhanoroeste.com.br/cotidiano/onde-levar-seu-cachorro-para-passear-em-sao-paulo/"><img src="img/walkingdog.png" alt="Parque" width="60" height="60"></a></li>
    <span class="rotulo">Parques</span>
  </ul>
</nav>
</div>
</header>
<div class="feede-box">
   <textarea id="post-text" name="post-input" cols="10" rows="3" placeholder="Escreva sobre seu pet..."></textarea>
      <div class="box-btn">
          <button id="button-publicar" type="button">Publicar</button>
 
  </textarea>
  </div>
<section id="feed-list">
<div id="lista-feed" class="lista-feed"></div>
   </section>
        </div>

    `;
  container.innerHTML = template;

  loadPosts();
  const userInfo = receberUsuario();

  //CRIAR POSTAGENS
  const btn = container.querySelector("#button-publicar");
  btn.addEventListener("click", () => {
    console.log("clicou aqui!");
    const text = container.querySelector("#post-text").value;
    const postagem = {
      text: text,
      user_id: userInfo.uid,
      username: userInfo.displayName,
      likes: 0,
    };

    postarMensagem(postagem)
      .then(() => {
        console.log("Document successfully written!");
        loadPosts();
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  });
  return container;

  // MOSTRAR POSTAGEM NA TELA

  function loadPosts() {
    const postsCollection = firebase.firestore().collection("postagens");
    container.querySelector("#lista-feed").innerHTML = "Carregando...";
    postsCollection.get().then((querySnapshot) => {
      container.querySelector("#lista-feed").innerHTML = "";
      querySnapshot.forEach((doc) => {
        const post = { id: doc.id, data: doc.data() };
        const componente = postTemplate(post);
        container.querySelector("#lista-feed").appendChild(componente);
      });
    });
  }
};
