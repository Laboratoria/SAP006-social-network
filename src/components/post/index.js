import { likesPost, numLikes, getUserData } from '../../services/index.js';

export function addPost(post) {
  const postContainer = document.createElement('div');
  postContainer.setAttribute('class', 'div-width90 div-recipe');
  postContainer.setAttribute('id', post.id);

  const postTemplate = `
    <div id="close-button" data-close-button></div>
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
        <button id="recipeLikes" data-like= ${post.id}><i id="likes-${post.id}" class="far fa-heart"></i></button>
          <p class="numLikes"> ${post.data().likes.length || 0}</p>
        <span class="material-icons commentIcon">insert_comment</span> ${post.data().comments.length}
      </div>
      <p> Por ${post.data().autor} </p>
    </div>
  `;

  postContainer.innerHTML = postTemplate;

  const div = postContainer.querySelector('.toggle-section');

  div.addEventListener('click', () => {
    div.querySelector('.recipeBody').classList.toggle('showBlock');
  });

  const button = postContainer.querySelector('#recipeLikes');
  const likes = postContainer.querySelector(`#likes-${post.id}`);
  const numberLikes = postContainer.querySelector('.numLikes');

  const postLikes = post.data().likes;
  if (postLikes.includes(getUserData().uid)) {
    likes.classList.add('fas');
  } else {
    likes.classList.add('far');
  }

  function likesNum() {
    likesPost(post.id)
      .then(() => numLikes(post.id)
        .then((massa) => {
          if (!massa.data().likes.includes(post.id)) {
            likes.classList.toggle('fas');
            numberLikes.innerHTML = massa.data().likes.length;
          } if (massa.data().likes.includes(post.id)) {
            likes.classList.toggle('far');
            numberLikes.innerHTML = massa.data().likes.length;
          }
        }));
  }
  button.addEventListener('click', likesNum);

  return postContainer;
}

// comentario
