import { outLogin } from '../../services/firebaseAuth.js';
import { route } from '../../routes/navigator.js';
import {
  getPosts, liked, deletePost,
} from '../../services/firebaseData.js';

// <img src=${doc.data().image class='imgPost'>
export const home = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = ` 
  <div class="containerHome">
  <header>
  <nav class="menu">
     <ul class="nav" id="nav">
     <li class="links" ><a href=""></a>Buscar</li>
     <li class="links" ><a href=""></a>Perfil</li>
     </ul>
     </nav>

    <div class="goPost">
    <img class="tomato" src="./img/tomato.svg">
    <a id="goPost" href="">postar</a>

    </div>

    <button class='btn' id='btnLogout'>Sair</button>

    <img src="./img/govegGreen.png" />

    </nav>
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
    <div class="publish" id="timeline" data-post> </div>
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
      const timeline = rootElement.querySelector('#timeline');
      div.innerHTML = `<div class="allPosts" data-id="${doc.id}">
          <img src=${doc.data().image} class='imgUser'> 
          <p class="user"> ${doc.data().nome}</p>
          <p class="local">${doc.data().nomeLocalReceita}</p> 
          <p class="data"> ${doc.data().data.toDate().toLocaleDateString()}</p>
          <button type="button" class="delete-button" data-delete="${doc.id}"> Deletar</button>
          <p class="descr">${doc.data().descricao}</p> 
          <p class="hashs">${doc.data().hashTags}</p>
        <div class='botoes'> 
          <p class="tipo"> ${doc.data().tipo} </p>
          <button type="button" id="like" data-like="${doc.id}"><img src="./img/coracao.svg"></button>
          <p class="beforLike" id="numberLikes" data-numLike="${doc.id}">${doc.data().curtidas.length || 0}</p>
          <button type="button" class="price" id="price" data-preco>${doc.data().preco}<img class="likePrice" src="./img/dinAmarelo.svg"> <img class="likePrice" src="./img/dinCinza.svg"></button>
          <div class="coments" id="coments">
          <p class="addComent" id="addComent" placeholder="Comentários">${doc.data().comentarios}</p>
          <button class="more" id="more">ver mais</button>
          <button class="goComent" id="goComent"> <img class="addCom" src="./img/addCom.svg"> adicionar comentário</button>
          </div> </div>
          <hr> `;

      const deleteBtn = div.querySelector('.delete-button');
      function disableBtn() {
        if (firebase.auth().currentUser.uid === `${doc.data().user_id}`) {
          // fazer a mesma mesma lógica p botão de editar = editBtn.hidden = false;
          deleteBtn.hidden = false;
        } else {
          // editBtn.hidden = true;
          deleteBtn.hidden = true;
          div.querySelector('.delete-button').style.display = 'none';
        }
      }
      disableBtn();

      timeline.insertBefore(div, timeline.childNodes[0]);

      const dataPost = rootElement.querySelector('[data-post]');
      dataPost.addEventListener('click', (e) => {
        const { target } = e;
        const likeId = target.dataset.like;
        const deleteId = target.dataset.delete;
        if (likeId) {
          const numberLikes = rootElement.querySelector(`[data-numLike="${likeId}"]`);
          const beforLike = numberLikes.classList.contains('beforLike');
          const number = Number(numberLikes.textContent);
          if (beforLike === true) {
            numberLikes.classList.replace('beforLike', 'afterLike');
            numberLikes.innerHTML = number + 1;
            liked(likeId);
          } else {
            numberLikes.classList.replace('afterLike', 'beforLike');
            numberLikes.innerHTML = number - 1;
            liked(likeId);
          }
        }
        if (deleteId) {
          const deleteConfirmation = confirm('Essa postagem será excluída, deseja continuar?');
          if (deleteConfirmation) {
            const postDiv = rootElement.querySelector(`[data-id="${deleteId}"]`);
            deletePost(deleteId).then(() => postDiv.remove());
          }
        }
      });
    });
  });

  return rootElement;
};
