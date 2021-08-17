import profile from './index.js';
// import postTemplate from '../feed/postTemplate.js';
import { getUserData, loadMyRecipes, deletePost } from '../../services/index.js';

export default () => {
  const myRecipesContainer = document.createElement('div');
  myRecipesContainer.append(profile());

  // tela minhas receitas com filter talvez mudar ou fazer outro

  // const userUid = localStorage.getItem('uid');
  // myRecipes(userUid);

  // if (localStorage.getItem('uid')) {
  //   const recipePost = feedSection.querySelector(`#${post.id}`);
  //   const closeButtonContainer = recipePost.querySelector('#close-button');
  //   closeButtonContainer.innerHTML = '<span class="material-icons">delete</span>';
  // }
  // function filterFeed() {
  //   feed
  // }

  // myRecipesContainer.append(postTemplate());
  function addPost(post) {
    const postTemplate = `
    <div id=${post.id} class="div-width90 div-recipe">
      <button class="delete-button" data-delete><span class="material-icons">delete</span></button>
      <div class="toggle-section" data-toggle>
        
        <h3 class="title recipe-title"> ${post.data()['nome da receita']} </h3>
      
        <div> 
          <img class="post-photo" src="image/nissin.jpg">
        </div>
        
        <div class="recipeBody" data-recipe-body>
          <div class="recipe-info">

            <div class="recipeInfo-box">
              <span class="material-icons"> schedule </span>
              <p>${post.data()['tempo de preparo']}</p>
            </div>
            
            <div class="recipeInfo-box">
              <p>${post.data().dificuldade}</p>
            </div>
            
            <div class="recipeInfo-box">
              <p>${post.data().preco}</p>
              <p>preço</p>
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

      <div id="recipe-footer" class="div-width100 recipe-title">
        <div class="like">
          <span class="material-icons favoriteIcon">favorite</span> ${post.data().likes} <span class="material-icons commentIcon">insert_comment</span> ${post.data().comments.length}
        </div>
        <p> Por ${post.data().autor} </p>
        <span class="material-icons">more_horiz</span>
      </div>
      
      <div class="popup" id="popup">
        Você está prestes a excluir permanentemente esta receita. Você tem certeza?
        <div class="div-btns-popup">
          <button type="button" id="btn-yes" class="btn-popup">Sim</button>
          <button type="button" id="btn-no" class="btn-popup">Não</button>
        </div>
      </div>

    </div>
    `;

    myRecipesContainer.innerHTML += postTemplate;

    const postContainer = myRecipesContainer.querySelectorAll('.toggle-section');

    postContainer.forEach((div) => {
      div.addEventListener('click', () => {
        div.querySelector('.recipeBody').classList.toggle('showBlock');
      });
    });

    const popup = myRecipesContainer.querySelector('#popup');

    function confirmDelete(e) {
      // const postId = e.target.parentNode.id;
      console.log(e.target.parentNode.id);
      popup.classList.add('active');
      const confirm = myRecipesContainer.querySelector('#btn-yes');
      confirm.addEventListener('click', () => {
        deletePost(post.id);
        // .then(())
      });

      const doNotConfirm = myRecipesContainer.querySelector('#btn-no');
      doNotConfirm.addEventListener('click', () => {
        popup.classList.remove('active');
      });
    }

    const btnDelete = myRecipesContainer.querySelectorAll('[data-delete]');
    btnDelete.forEach((button) => {
      button.addEventListener('click', (e) => confirmDelete(e));
    });
  }

  loadMyRecipes(addPost, getUserData().uid);
  return myRecipesContainer;
};
