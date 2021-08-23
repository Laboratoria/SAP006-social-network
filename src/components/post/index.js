import {
  likesPost, deletePost, getUserData, numLikes,
} from '../../services/index.js';
import errorModal from '../error/index.js';

export function addPost(post) {
  const postContainer = document.createElement('div');
  postContainer.setAttribute('class', 'div-width90 div-recipe');
  postContainer.setAttribute('id', post.id);

  const postTemplate = `
    <button class="menu-recipeButton">
      <span class="material-icons">more_horiz</span>
    </button>
    <ul class="recipeMenu">
      <li class="edit-button">
        <p> Editar 
          <span class="material-icons"> edit </span> </p>
      </li>
      <li class="delete-button"> <p> Excluir 
        <span class="material-icons"> deletep </span> </p> 
      </li>
    </ul>

    <div class="toggle-section">
      
      <h3 class="title recipe-title"> ${post.data()['nome da receita']} </h3>
    
      <div> 
        <img class="post-photo" src="image/nissin.jpg">
      </div>
      
      <div class="recipeBody"> 
        <div class="recipe-info">

          <div class="recipeInfo-box">
            <span class="material-icons"> schedule </span>
            <p>${post.data()['tempo de preparo']} minutos</p>
          </div>
          
          <div class="recipeInfo-box">
            <p>${post.data().dificuldade}</p>
          </div>
          
          <div class="recipeInfo-box">
            <p>${post.data().preco}</p>
            <p>custo</p>
          </div>
          
          <div class="recipeInfo-box">
            <p>${post.data().categoria}</p>
          </div>

        </div>

        <h3 class="title center-title recipe-title">Ingredientes</h3>
        <div class="">
          ${post.data().ingredientes}
        </div>
        
        <h3 class="title center-title recipe-title">Modo de preparo</h3>
        <div>
          ${post.data()['modo de preparo']} 
        </div>

      </div>
    </div>

    <div class="div-width100 recipe-title recipe-footer">
      <div class="like">
        <span class="material-icons heart favoriteIcon">favorite</span> 
            <p class="numLikes"> ${post.data().likes.length || 0} </p>
        <span class="material-icons commentIcon">insert_comment</span> ${post.data().comments.length}
        <button class="recipeLikes" data-like= ${post.id} >Curtir</button>
      </div>
      <p> Por ${post.data().autor} </p>
    </div>

    <div class="popup" data-toggle="popup">
      <h2> Deletar Receita </h2>
      <p> Você tem certeza ?
      <div class="div-btns-popup">
        <button type="button" class="btn-popup btn-yes">Deletar</button>
        <button type="button" class="btn-popup btn-no">Cancelar</button>
      </div>
    </div>

    <div class="overlay" data-toggle="overlay"></div>
  `;

  postContainer.innerHTML = postTemplate;
  const popup = postContainer.querySelector('.popup');
  const overlay = postContainer.querySelector('.overlay');
  const toggleDiv = postContainer.querySelector('.toggle-section');

  toggleDiv.addEventListener('click', () => {
    toggleDiv.querySelector('.recipeBody').classList.toggle('showBlock');
  });

  const button = postContainer.querySelector('.recipeLikes');

  const likes = postContainer.querySelector('.heart');
  const numberLikes = postContainer.querySelector('.numLikes');

  function likesNum() {
    likesPost(post.id)
      .then(() => likes.classList.toggle('test'))
      .then(() => numLikes(post.id)
        .then((massa) => {
          numberLikes.innerHTML = massa.data().likes.length;
        }));
  }

  button.addEventListener('click', likesNum);

  function toggleClass() {
    const toggleClassElements = postContainer.querySelectorAll('.overlay, .popup');
    toggleClassElements.forEach((elem) => elem.classList.toggle('active'));
  }

  const confirmDelete = postContainer.querySelector('.btn-yes');
  confirmDelete.addEventListener('click', () => {
    deletePost(post.id)
      .then(() => {
        toggleClass();
        const recipe = document.getElementById(post.id);
        recipe.remove();
      })
      .catch((error) => {
        popup.classList.remove('active');
        overlay.classList.add('active');
        postContainer.append(errorModal());
        throw Error(error);
      });
  });

  const cancelDelete = postContainer.querySelector('.btn-no');
  cancelDelete.addEventListener('click', () => {
    toggleClass();
  });

  const deleteButton = postContainer.querySelector('.delete-button');
  deleteButton.addEventListener('click', () => toggleClass());

  const menuButton = postContainer.querySelector('.menu-recipeButton');
  menuButton.addEventListener('click', () => {
    postContainer.querySelector('.recipeMenu').classList.toggle('showMenu');
  });

  const editButton = postContainer.querySelector('.edit-button');
  editButton.addEventListener('click', () => {
    console.log('hora de editar');
  });

  const userUid = getUserData().uid;
  if (userUid === post.data().user_id) {
    menuButton.style.display = 'block';
  }

  return postContainer;
}
