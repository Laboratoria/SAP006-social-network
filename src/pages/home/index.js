import { outLogin } from '../../services/firebaseAuth.js';
import { route } from '../../routes/navigator.js';
import { getPosts } from '../../services/firebaseData.js';

// <img src=${doc.data().image class='imgPost'>
export const home = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = ` 
  <div class="containerHome">
  <header>
    <nav class="menu">
       <ul class="nav" id="nav">
        <li><a class="links" href=""></a>Buscar</li>
        <li><a class="links" href=""></a>Perfil</li>
        </ul>
    </nav>

    <div class="goPost">
    <img class="tomato" src="./img/tomato.svg">
    <a id="goPost" href="">postar</a>

    </div>

    <button class='btn' id='btnLogout'>Sair</button>

    <img src="./img/govegGreen.png" />

    <div class="filters">
    <button id="receitas" class="receitas"> Receitas</button>
    <button id="restaurantes" class="restaurantes" type="submit"> Restaurantes</button>
    <button id="mercados" class="mercados"> Mercados</button>
    </div>
    
  </header>
  <main>
    <div class="publish" id='timeline'>
    </div>
      <hr> 
  </main>
</div>
`;
  const btnLogout = rootElement.querySelector('#btnLogout');

  const btnGoPost = rootElement.querySelector('#goPost');

  // botão sair para fazer logout
  btnLogout.addEventListener('click', (event) => {
    event.preventDefault();
    outLogin();
  });
  // postar
  btnGoPost.addEventListener('click', () => route('/posts'));
  // carregar posts na tela
  getPosts().then((collectionContent) => {
    collectionContent.forEach((doc) => {
      const div = document.createElement('div');
      const timeline = rootElement.querySelector('#timeline');
      div.innerHTML = `<div class="allPosts">
          <img src=${doc.data().image} class='imgUser'> 
          <p class="user"> ${doc.data().nome}</p>
          <p class="data">${doc.data().data.toDate().toLocaleDateString()}</p>
          <p class="tititulo">${doc.data().nomeLocalReceita}</p>
          <p class="descr">${doc.data().descricao}</p> 
          <p class="hashs">${doc.data().hashTags}</p>
          <p class="tipo"> ${doc.data().tipo} </p>

          <button class="like" id="like"><img class="likePrice" src="./img/coracao.svg"></button>
          <p class="numLikes">0</p>
          <button class="price" id="price"> ${doc.data().preco} <img class="likePrice" src="./img/dinAmarelo.svg"> <img class="likePrice" src="./img/dinCinza.svg"></button>
          <div class="coments" id="coments">
            <input class="addComent" id="addComent" placeholder="Comentários"></input> 
          <button class="more" id="more">ver mais</button>
          <button class="addComent" id="addComent"> <img class="addCom" src="./img/addCom.svg"> adicionar comentário</button>
          </div>
          <hr> `;
      timeline.insertBefore(div, timeline.childNodes[0]);
    });
  });

  return rootElement;
};

// <h2 class="nameUser" id="nameUser"></h2>
// <img class="imgPost" id="imgPost" src="">
// <textarea class="textPost" id="textPost" name="story" style="resize: none">
// </textarea>
// <a class="hashtag" id="hashtag"></a>
// <p class="tag" id="tag"></p>
// <button class="like" id="like"><img src="./img/coracao.svg"</button>
// <button class="price" id="price"><img
// src="./img/dinAmarelo.svg"<img src="./img/dinCinza.svg"</button>

// <div class="coments" id="coments">
// <p>comentario</p>
// <button class="more" id="more">ver mais</button>
// </div>
// <button class="addComent" id="addComent"><img src=".img/addCom.svg">
// adicionar comentário
// </button>
