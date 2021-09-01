/* eslint-disable eol-last */
import { outLogin } from '../../services/firebaseAuth.js';
import { route } from '../../routes/navigator.js';
import {
  getPosts, liked, deletePost, editPosts,
} from '../../services/firebaseData.js';
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
      const timeline = rootElement.querySelector('#timeline');
      div.innerHTML = `<div class="allPosts" data-id="${doc.id}">
          
      <div class='fotoPerfil'>
          <img src=${doc.data().image} class='imgUser'> 
          <div class="user-data"> 
            <p class="user"> ${doc.data().nome}</p>
          <div class='data-locations'>
            <p class="locations" contenteditable="false" data-title="${doc.id}">${doc.data().nomeLocalReceita}</p> 
            <p class="data">• ${doc.data().data.toDate().toLocaleDateString()}</p>
          </div>
          </div>
      </div>   
                   
    ${firebase.auth().currentUser.uid === doc.data().user_id
    ? `<div class="delete-edit">
        <button type="button" class="delete-button" data-delete="${doc.id}">Deletar</button>
       <button type="button" class="edit-button" data-edit="${doc.id}">Editar</button>
       <button type="button" style="display: none;" class="savEdit-button" data-savedits="${doc.id}"> Salvar</button>
      </div>`
    : ''}
         
          <p class="descr" contenteditable="false" data-text="${doc.id}">${doc.data().descricao}</p> 
          <p class="hashs" contenteditable="false" data-hashs="${doc.id}">${doc.data().hashTags}</p>
        
          <div class='botoes'> 
          <p class="tipo" contenteditable="false" data-tag="${doc.id}"> ${doc.data().tipo} </p>
          <button type="button" class="like"> <img id="like" data-like="${doc.id}" class="likeImg"  src="./img/coracao.svg"></button>
          <p class="beforLike" id="numberLikes" data-numLike="${doc.id}">${doc.data().curtidas.length || 0}</p>
          <span class="price" contenteditable="false" id="price" data-preco="${doc.id}">${doc.data().preco}</span>
         
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
      const editId = target.dataset.edit;
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

      if (deleteId) {
        modal.confirm('Essa postagem será excluída, deseja continuar?', () => {
          const postDiv = rootElement.querySelector(`[data-id="${deleteId}"]`);
          deletePost(deleteId).then(postDiv.remove());
        });
      }
      if (editId) {
        const post = rootElement.querySelector(`[data-id="${editId}"]`);
        const editBtn = post.querySelector(`[data-edit="${editId}"]`);
        const saveBtn = post.querySelector(`[data-savedits="${editId}"]`);
        modal.confirm('Deseja editar sua postagem?', () => {
          editBtn.style.display = 'none';
          saveBtn.style.display = 'flex';
          const editElements = post.querySelectorAll('[contenteditable="false"]');
          editElements.forEach((elemento) => {
            elemento.setAttribute('contenteditable', true);
            elemento.style.border = 'solid 2px #51fa02';
          });
        });
        saveBtn.addEventListener('click', () => {
          modal.confirm('As alterações feitas serão salvas, deseja prosseguir?', () => {
            const title = rootElement.querySelector(`[data-title="${editId}"]`).innerText;
            const text = rootElement.querySelector(`[data-text="${editId}"]`).innerText;
            const priceTag = rootElement.querySelector(`[data-preco="${editId}"]`).innerText;
            const hashtags = rootElement.querySelector(`[data-hashs="${editId}"]`).innerText;
            const tagType = rootElement.querySelector(`[data-tag="${editId}"]`).innerText;
            editBtn.style.display = 'flex';
            saveBtn.style.display = 'none';
            const editElements = post.querySelectorAll('[contenteditable="true"]');
            editElements.forEach((elemento) => {
              elemento.setAttribute('contenteditable', false);
              elemento.style.border = 'none';
            });
            editPosts(tagType, title, hashtags, priceTag,
              text, editId);
          });
        });
      }
    });
  });
  return rootElement;
};