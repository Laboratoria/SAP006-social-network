import { outLogin } from '../../services/firebaseAuth.js';
import { route } from '../../routes/navigator.js';

const db = firebase.firestore();
const rootElement = document.createElement('div');

const getPosts = () => {
  const timeline = rootElement.querySelector('#timeline');
  db.collection('posts').orderBy('data', 'desc').limit(1).get()
    .then((collectionContent) => {
      collectionContent.forEach((doc) => {
        const span = document.createElement('span');
        span.innerText = `Em: ${doc.data().data.toDate().toLocaleDateString()} '${doc.data().descricao}' por ${doc.data().nome}`;
        timeline.insertBefore(span, timeline.childNodes[0]);
      });
    });
};

export const home = () => {
  rootElement.innerHTML = ` 
  <div class="containerHome">
  <header>
    <div class="menu">
      <input type="checkbox" id="checkbox-menu">
      <label for="checkbox-menu">
      <span></span>
      <span></span>
      <span></span>
      </label>
    </div>
    <nav class="navBar">
       <ul class="nav" id="nav">
        <li><a class="links" href=""></a>Buscar</li>
        <li><a class="links" href=""></a>Perfil</li>
        </ul>
    </nav>
    <div class="addPost">
    <a id="addPost" href=""> postar</a>
    <img class="tomato" src="./img/tomato.svg">
    </div>
    <button class='btn' id='btnLogout'>Sair</button>

    <img src="./img/govegGreen.png" />

    <div class="filters">
      <button>Mercados</button>
      <button>Receitas</button>
      <button>Restaurantes</button>
    </div>

  </header>
  <main>
    <div class="publish" id='timeline'>
      <h2 class="nameUser" id="nameUser"></h2>
      <img class="imgPost" id="imgPost" src="">
      <textarea class="textPost" id="textPost" name="story" style="resize: none">
      </textarea>
      <a class="hashtag" id="hashtag"></a>
      <p class="tag" id="tag"></p>
      <button class="like" id="like"><img src="./img/coracao.svg"</button>
      <button class="price" id="price"><img src="./img/dinAmarelo.svg"<img src="./img/dinCinza.svg"</button>
      <div class="coments" id="coments">
      <p>comentario</p> 
      <button class="more" id="more">ver mais</button>
      </div>
      <button class="addComent" id="addComent"><img src=".img/addCom.svg"> 
      adicionar comentário
      </button>
    </div>
      <hr> 
  </main>
</div>
`;
  const btnLogout = rootElement.querySelector('#btnLogout');
  const btnAddPost = rootElement.querySelector('#addPost');
  // fazer logout
  btnLogout.addEventListener('click', (event) => {
    event.preventDefault();
    outLogin();
  });
  // postar
  btnAddPost.addEventListener('click', () => route('/posts'));
  getPosts();
  return rootElement;
};

// <!-- BUTAO MENU function myFunction() {
//     var x = document.getElementById("myLinks");
//     if (x.style.display === "block") {
//       x.style.display = "none";
//     } else {
//       x.style.display = "block";
//     }
//   } -->

//   return rootElement;
// };
