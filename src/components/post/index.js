import { likesPost, deletePost, getUserData } from '../../services/index.js';

export function addPost(post) {
  const postContainer = document.createElement('div');
  postContainer.setAttribute('class', 'div-width90 div-recipe');
  postContainer.setAttribute('id', post.id);

  const postTemplate = `
    <button class="delete-button" data-delete>
      <span class="material-icons">delete</span>
    </button>
    
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

    <div class="div-width100 recipe-title recipe-footer">
      <div class="like">
        <span class="material-icons favoriteIcon">favorite</span> ${post.data().likes.length} <span class="material-icons commentIcon">insert_comment</span> ${post.data().comments.length}
        <button class="recipeLikes" data-like= ${post.id} >Curtir</button>
      </div>
      <p> Por ${post.data().autor} </p>
    </div>

    <div class="popup" data-toggle="popup">
      Você está prestes a excluir permanentemente esta receita. Você tem certeza?
      <div class="div-btns-popup">
        <button type="button" class="btn-popup btn-yes">Sim</button>
        <button type="button" class="btn-popup btn-no">Não</button>
      </div>
    </div>

    <div class="overlay" data-toggle="overlay"></div>
  `;

  postContainer.innerHTML = postTemplate;

  const div = postContainer.querySelector('.toggle-section');

  div.addEventListener('click', () => {
    div.querySelector('.recipeBody').classList.toggle('showBlock');
  });

  const button = postContainer.querySelector('.recipeLikes');

  button.addEventListener('click', () => likesPost(post.id));
  // .then(())
  // tratar erros ;

  function toggleClass() {
    const toggleClassElements = postContainer.querySelectorAll('[data-toggle]');
    toggleClassElements.forEach((elem) => elem.classList.toggle('active'));
  }

  const confirmDelete = postContainer.querySelector('.btn-yes');
  confirmDelete.addEventListener('click', () => {
    deletePost(post.id)
      .then(() => {
        toggleClass();

        const recipe = document.getElementById(post.id);
        recipe.parentNode.removeChild(recipe);
      })
      .catch((error) => {
        const popup = postContainer.querySelector('.popup');
        popup.innerHTML = ` Ops! Algo deu errado. Tente de novo mais tarde.
        <button type="button" class="btn-popup okay">Ok</button>`;
        const buttonOk = postContainer.querySelector('.okay');
        buttonOk.addEventListener('click', toggleClass);
        console.error("Error removing document: ", error);
      });
  });

  const cancelDelete = postContainer.querySelector('.btn-no');
  cancelDelete.addEventListener('click', () => {
    toggleClass();
  });

  const deleteButton = postContainer.querySelector('[data-delete]');
  deleteButton.addEventListener('click', () => toggleClass());

  const userUid = getUserData().uid;
  if (userUid === post.data().user_id) {
    deleteButton.style.display = 'block';
  }

  return postContainer;
}
