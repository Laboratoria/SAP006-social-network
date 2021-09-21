import { postarMensagem, receberUsuario } from '../../services/index.js';
import { postTemplate } from '../../componentes/index.js';

export default () => {
  const container = document.createElement("div");


  const template = `
    <head>
      <title>Wildbeast</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <link href="https://fonts.googleapis.com/css?family=Vollkorn:400,400i,700" rel="stylesheet">
      <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
      <header class="header-feed">
    <div class="container-feed">
    <a href="#" class="logo"><img src="img/pet-friendly.png" alt="pet"></a>
        <nav class=" header_menu">
    
          <ul>
        
            <li><a href="#">Perfil</a></li>
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
  <form class="feede-box">
  <label>
    <textarea name="post-input" id="post-text" placeholder="Escreva sobre seu pet..."></textarea>
     <div class="buttons">
     <button class="button-post" type="button" id="button-publicar">Publicar</button>
     </div>
    <section id="feed">
    <div id="lista-feed" class="lista-feed"></div>
    </section
    </div>
       </form> 
      </label>
    
   
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
      array_likes: [],
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
    container.querySelector('#lista-feed').innerHTML = 'Carregando...';
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
