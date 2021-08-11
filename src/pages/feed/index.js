import { loadRecipe } from '../../services/index.js';

export default () => {
  const feedContainer = document.createElement('div');
  feedContainer.setAttribute('class', 'screenContainer');

  // const feedContent = `

  //   `;

  // feedContainer.innerHTML = feedContent;

  function addPost(post) {
    const postTemplate = `
    <div id=${post.id} class="div-width85 div-recipe">

        <h3 class="title recipe-title"> ${post.data()['nome da receita']} </h3>
      
        <div> IMAGEM </div>
        
        <div class="recipeBody hide"> 
          
          <h3 class="title center">Ingredientes</h3>
          <div class="">
            ${post.data().ingredientes}
          </div>
          
          <h3 class="title center">Modo de preparo</h3>
          <div>
            ${post.data()['modo de preparo']} 
          </div>

        </div>

        <div id="recipe-footer" class="div-width100 recipe-title">
          <span class="material-icons favoriteIcon">favorite</span> ${post.data().likes}
          <span class="material-icons commentIcon">insert_comment</span></buton> ${post.data().comments.length}
        </div>
   
    </div>
    `;

    feedContainer.innerHTML += postTemplate;

    const postContainer = feedContainer.querySelectorAll('.div-recipe');
    console.log(postContainer);

    // for (post of postContainer)
    // postContainer

    // postContainer.forEach((div) => {
    //   // const id = div.querySelector('.recipeBody');
    //   div.addEventListener('click', (div) => {
    //     div.querySelector('.recipeBody').classList.toggle('show');
    //   });
    // });
  }

  loadRecipe(addPost);

  return feedContainer;
};
