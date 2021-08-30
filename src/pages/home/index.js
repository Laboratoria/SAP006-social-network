import { outLogin } from '../../services/firebaseAuth.js';
import { route } from '../../routes/navigator.js';
import { getPosts, liked, deletePost } from '../../services/firebaseData.js';
import { modal } from './modal.js';

// <img src=${doc.data().image class='imgPost'>
export const home = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = ` 
  <nav class="menu1">
  <a class="buscar" href="">Buscar</a>
 
  <div class="goPost">
 
  <a id="goPost" class="postar" href="" <img class="tomato" src="./img/tomato.svg"> postar</a>
  </div>
  <button class='btn' id='btnLogout'>Sair</button>
</nav>
  <div class="containerHome">
  <header>
  <img class='logoHome' src="./img/govegGreen.png"/>
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
    <div class="publish" id='timeline' data-post>
    </div>
 
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
      div.innerHTML = `<div class="allPosts" data-id="${doc.id}">
          
      <div class='fotoPerfil'>

          <img src=${doc.data().image} class='imgUser'> 
          <div class="irma"> 
            <p class="user"> ${doc.data().nome}</p>
          <div class='data-locations'>
            <p class="locations">${doc.data().nomeLocalReceita}</p> 
            <p class="data">• ${doc.data().data.toDate().toLocaleDateString()}</p>
          </div>
          </div>
      </div>
              
                   
    ${firebase.auth().currentUser.uid === doc.data().user_id
    ? `<div class="delete-edit">
               <button type="button" class="delete-button" data-delete="${doc.id}">Deletar</button>
            <button type="submit" data-editPostButton="${doc.id}" class="edit-button">Editar</button>
          </div>`
    : ''}
         
          <p class="descr">${doc.data().descricao}</p> 
          <p class="hashs">${doc.data().hashTags}</p>
        
          <div class='botoes'> 
          <p class="tipo"> ${doc.data().tipo} </p>
          <button type="button" class="like"> <img id="like" data-like="${doc.id}" class="likeImg"  src="./img/coracao.svg"></button>
          <p class="beforLike" id="numberLikes" data-numLike="${doc.id}">${doc.data().curtidas.length || 0}</p>
          <span class="price" id="price" data-preco>${doc.data().preco}</span>
         
          </div>

          <div class="coments" id="coments">
            <textarea class='addComent' data-item='add-comment' placeholder='Escreva um comentário!'></textarea>
            <button class="more" id="more">ver mais</button>
            <button class ='goComent' id='goComent' img class='addCom' src='./img/addCom.svg' data-item='comment'/>enviar comentário</button>
          </div>
            <hr> `;

      timeline.insertBefore(div, timeline.childNodes[0]);
    });

    const dataPost = rootElement.querySelector('[data-post]');
    dataPost.addEventListener('click', (e) => {
      const { target } = e;
      const likeId = target.dataset.like;
      const deleteId = target.dataset.delete;
      if (likeId) {
        const numberLikes = rootElement.querySelector(`[data-numLike="${likeId}"]`);
        const beforLike = numberLikes.classList.contains('beforLike');
        const number = Number(numberLikes.textContent);
        const heart = rootElement.querySelector(`[data-like="${likeId}"]`);
        if (beforLike === true) {
          numberLikes.classList.replace('beforLike', 'afterLike');
          numberLikes.innerHTML = number + 1;
          heart.src = './img/coracaoFull.svg';
          liked(likeId);
        } else {
          numberLikes.classList.replace('afterLike', 'beforLike');
          numberLikes.innerHTML = number - 1;
          heart.src = './img/coracao.svg';
          liked(likeId);
        }
      }

      // if (likeId) {
      //   const numberLikes = rootElement.querySelector(`[data-numLike="${likeId}"]`);
      //   const beforLike = numberLikes.classList.contains('beforLike');
      //   eye.src = './img/eyesClose.svg';
      //   const number = Number(numberLikes.textContent);
      //   if (beforLike === true) {
      //     numberLikes.classList.replace('beforLike', 'afterLike');
      //     numberLikes.innerHTML = number + 1;
      //     liked(likeId);
      //   } else {
      //     numberLikes.classList.replace('afterLike', 'beforLike');
      //     numberLikes.innerHTML = number - 1;
      //     liked(likeId);
      //   }
      // }
      if (deleteId) {
        modal.confirm('Essa postagem será excluída, deseja continuar?', () => {
          const postDiv = rootElement.querySelector(`[data-id="${deleteId}"]`);
          deletePost(deleteId).then(postDiv.remove());
        });
      }

      // timeline.insertBefore(div, timeline.childNodes[0]);
      //       const editBtn = div.querySelector('.edit-button');
      //       function disableEditBtn() {
      //         if (firebase.auth().currentUser.uid === `${doc.data().user_id}`) {
      //           // fazer a mesma mesma lógica p botão de editar = editBtn.hidden = false;
      //           disableEditBtn.hidden = false;
      //         } else {
      //           // editBtn.hidden = true;
      //           disableEditBtn.hidden = true;
      //           div.querySelector('.edit-button').style.display = 'none';
      //         }
      //       }
      //       disableEditBtn();
      //       editBtn.addEventListener('click', (e) => {
      //         const { target } = e;
      //         const postID = target.parentNode.parentNode.id;
      //         if (editBtn) {

      //
    });
  });
  return rootElement;
};

// function changeColorRed(td) {
//   td.style.backgroundColor = "#c516168a";
// };

// if (prompt1 == 1) {
//   document.getElementById('resul1').innerHTML = 'Certa';
//   changeColorGreen(resul1)
// } else {
//   document.getElementById('resul1').innerHTML = 'Errada';
//   changeColorRed(resul1)
// }
