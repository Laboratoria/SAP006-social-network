import { outLogin, deletePost } from '../../services/firebaseAuth.js';
import { route } from '../../routes/navigator.js';
import { getPosts } from '../../services/firebaseData.js';

// const deletePost = (postID) => {
//   const postsCollection = firebase.firestore().collection('posts');
//   return postsCollection.doc(postID).delete().then();
// };

// <img src=${doc.data().image class='imgPost'>
export const home = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = ` 
  <div class="containerHome">
  <header>
    <nav class="menu">
     <ul class="nav" id="nav">
      <a class="links" href="">Buscar</a>
      </ul>
    </nav>

  <div class="goPost">
  <img class="tomato" src="./img/tomato.svg">
  <a id="goPost" class="postar" href="">postar</a>
 
  </div>

  <button class='btn' id='btnLogout'>Sair</button>

  <img src="./img/govegGreen.png" />


  <div class="lines">
  <hr>
  </div>

    <div class="filters">
    <button id="receitas" class="receitas"> Receitas</button>
    <button id="restaurantes" class="restaurantes" type="submit"> Restaurantes</button>
    <button id="mercados" class="mercados"> Mercados</button>
    </div>
    
    <div class="lines">
    <hr>
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

  btnGoPost.addEventListener('click', () => route('/posts'));
  // carregar posts na tela
  getPosts().then((collectionContent) => {
    collectionContent.forEach((doc) => {
      const div = document.createElement('div');
      div.id = doc.id;
      const timeline = rootElement.querySelector('#timeline');
      div.innerHTML = `<div class="allPosts">
          <img src=${doc.data().image} class='imgUser'> 
          <p class="user"> ${doc.data().nome}</p>
          <p class="data">${doc.data().data.toDate().toLocaleDateString()}</p>
          <p class="tititulo">${doc.data().nomeLocalReceita}</p>
          <p class="descr">${doc.data().descricao}</p> 
          <button type="submit" data-deletePostButton="${doc.id}" class="delete-button"> Deletar</button>
          <p class="hashs">${doc.data().hashTags}</p>
          <p class="tipo"> ${doc.data().tipo} </p>

          <button class="like" id="like"><img class="likePrice" src="./img/coracao.svg" /></button>
          <p class="numLikes">0</p>
          <button class="price" id="price"> ${doc.data().preco} <img class="likePrice" src="./img/dinAmarelo.svg" /> <img class="likePrice" src="./img/dinCinza.svg"></button>
          <div class="coments" id="coments">
            <input class="addComent" placeholder="Comentários" /> 
          <button class="more" id="more">ver mais</button>
          <button class="addComent" id="goComent"> <img class="addCom" src="./img/addCom.svg"> adicionar comentário</button>
          </div>
          <hr> `;

      const deleteBtn = div.querySelector('.delete-button');
      function disableBtn() {
        if (firebase.auth().currentUser.uid === `${doc.data().user_id}`) {
          // fazer a mesma mesma lógica p botão de editar = editBtn.hidden = false;
          deleteBtn.hidden = false;
        } else {
          // editBtn.hidden = true;
          deleteBtn.hidden = true;
        }
      }
      disableBtn();

      deleteBtn.addEventListener('click', (e) => {
        const { target } = e;
        const postID = target.parentNode.parentNode.id;
        if (deleteBtn) {
          const deleteConfirmation = confirm('Essa postagem será excluída, deseja continuar?');
          if (deleteConfirmation) {
            deletePost(postID).then(div.remove());
          }
        }
      });

      timeline.insertBefore(div, timeline.childNodes[0]);
    });
  });
  return rootElement;
};
