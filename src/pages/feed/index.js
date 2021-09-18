import {
  postarMensagem,
  receberUsuario,
  logOut,
} from "../../services/index.js";
import { postTemplate } from "../../componentes/index.js";
export default () => {
  const container = document.createElement("div");

  const template = `
  <!-- Logo e Menu -->
  <header class="header-feed">
  <div class="container-feed">
    <h2 class="logo">Pet Friends</h2>
      <nav class=" header_menu">
        <ul>
          <li><a href="#">Sobre</a></li>				
          <li><a href="#">Produtos</a></li>				
          <li><a href="#">Portfólio</a></li>				
          <li><a href="#">Contato</a></li>			
        </ul>
      </nav>
  </div>
<nav class="sidenav">
  <ul>
    <li><a href="#"><img src="img/adocao.png" alt="Adoção" width="60" height="60"></a></li>
    <span class="rotulo">Adoção</span>
    <li><a href="#"><img src="img/racao.png" alt="Alimentação" width="60" height="60"></a></li>
    <span class="rotulo">Alimentação</span>
    <li><a href="#"><img src="img/walkingdog.png" alt="Parque" width="60" height="60"></a></li>
    <span class="rotulo">Parques</span>
  </ul>
</nav>
</div>
</header>
<form class="feede-box">
        <label>
          <textarea id="post-text" name="post-input" cols="30" rows="4" placeholder="Escreva sobre seu pet..."></textarea>
          <div class="box-btn">
          <button id="button-publicar" type="button">Publicar</button>
          </div>
   <section id="feed-list">
    <div id="lista-feed" class="lista-feed"></div>
    </section
  </label>
        
      </form> 
    
   
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
