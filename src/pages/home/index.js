import { outLogin } from '../../services/firebaseAuth.js';
import { route } from '../../routes/navigator.js';
import { getPosts, liked } from '../../services/firebaseData.js';

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
      div.innerHTML = `<div class="allPosts" data-id=${doc.id}>
          <img src=${doc.data().image} class='imgUser'> 
          <p class="user"> ${doc.data().nome}</p>
          <p class="local">${doc.data().nomeLocalReceita}</p> 
          <p class="data"> ${doc.data().data.toDate().toLocaleDateString()}</p>
          <button type="button" class="delete-button" data-deletePostButton=${doc.id}> Deletar</button>
          <p class="descr">${doc.data().descricao}</p> 
          <p class="hashs">${doc.data().hashTags}</p>
        <div class='botoes'> 
          <p class="tipo"> ${doc.data().tipo} </p>
          <button type="button" id="like" data-like=${doc.id}><img src="./img/coracao.svg">${(doc.data().curtidas) ? doc.data().curtidas.length : '0'}</button>
          <button type="button" class="price" id="price" data-preco> ${doc.data().preco} <img class="likePrice" src="./img/dinAmarelo.svg"> <img class="likePrice" src="./img/dinCinza.svg"></button>
          <div class="coments" id="coments">
            <input class="addComent" id="addComent" placeholder="Comentários"></input> 

          <button class="more" id="more">ver mais</button>
          <button class="goComent" id="goComent"> <img class="addCom" src="./img/addCom.svg"> adicionar comentário</button>
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
          div.querySelector('.delete-button').style.display = 'none';
        }
      }
      disableBtn();

      timeline.insertBefore(div, timeline.childNodes[0]);
    });
    const dataPost = rootElement.querySelector('[data-post]');
    dataPost.addEventListener('click', (e) => {
      const { target } = e;
      console.log(target);
      const like = target.dataset.like;
      const deletePost = target.dataset.deletePostButton;
      if (like) {
        console.log('clicou no like');
        liked(like);
      }
      if (deletePost) {
        console.log('clicou no deletar');
      }
    });
  });

  return rootElement;
};
  // if (target.dataset.item === 'deletePostButton') {
//   console.log('clicou no delete');
//   const deleteConfirmation = confirm('Essa postagem será excluída, deseja continuar?');
//   if (deleteConfirmation) {
//     deletePost(div).then(div.remove());
//   }
// }
