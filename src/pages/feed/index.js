import { loadRecipe } from '../../services/index.js';

export default () => {
  const feedContainer = document.createElement('div');
  feedContainer.setAttribute('class', 'screenContainer');

  function addPost(post) {
    const postTemplate = `
    <div id=${post.id} class="div-width90 div-recipe">
      <div class="toggle-section">
        <h3 class="title recipe-title"> ${post.data()['nome da receita']} </h3>
      
        <div> 
          <img class="post-photo" src="image/nissin.jpg">
        </div>
        
        <div class="recipeBody"> 
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
        <p> Por Bob Esponja </p>
      </div>
      
    </div>
    `;

    feedContainer.innerHTML += postTemplate;

    const postContainer = feedContainer.querySelectorAll('.toggle-section');

    postContainer.forEach((div) => {
      div.addEventListener('click', () => {
        div.querySelector('.recipeBody').classList.toggle('show');
      });
    });
  }

  loadRecipe(addPost);

  return feedContainer;
};
