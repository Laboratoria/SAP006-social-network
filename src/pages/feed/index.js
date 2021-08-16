import { loadRecipe, likesPost } from '../../services/index.js';
import header from '../../components/header/index.js';
import footer from '../../components/footer/index.js';

export default () => {
  const feedContainer = document.createElement('div');
  feedContainer.setAttribute('class', 'screenContainer');

  feedContainer.append(header());

  const feedSection = document.createElement('section');

  function addPost(post) {
    const postTemplate = `
    <div id=${post.id} class="div-width90 div-recipe">
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
          <span class="material-icons favoriteIcon">favorite</span> ${post.data().likes} <span class="material-icons commentIcon">insert_comment</span> ${post.data().comments.length}
          <button class="recipeLikes" data-like= ${post.id} >Curtir</button>
        </div>
        <p> Por ${post.data().autor} </p>
      </div>
      
    </div>
    `;

    feedSection.innerHTML += postTemplate;

    const postContainer = feedContainer.querySelectorAll('.toggle-section');

    postContainer.forEach((div) => {
      div.addEventListener('click', () => {
        div.querySelector('.recipeBody').classList.toggle('showBlock');
      });
    });

    const btnLike = feedContainer.querySelectorAll('.recipeLikes');

    btnLike.forEach((button) => {
      button.addEventListener('click', (e) => {
        const { target } = e;
        const dataLike = target.dataset.like;
        likesPost(dataLike, post.data().likes);
      });
    });
    // const section = feedContainer.querySelector('[data-section]');
    // const userUid = getUserData().uid;

    // const likesRecipe = feedContainer.querySelector('[data-like]');
    // feedContainer.addEventListener('click', (e) => {
    //   const { target } = e;
    //   const dataLike = target.dataset.like;
    //   console.log(target.getAttribute('data-like'));
    //   if (dataLike) {
    //     likesPost(e.currentTarget.parentNode.id);
    //   likesPost(e.currentTarget.id, e.currentTarget.likes)}
    // });
  }

  // const idLikes = feedContainer.querySelectorAll('.recipeLikes');
  // console.log(idLikes);
  // for (const btnLike of idLikes) {
  //   btnLike.addEventListener('click', (e) => {
  //     likesPost(e.currentTarget.parentNode.id);
  //   })
  // };

  loadRecipe(addPost);

  feedContainer.append(feedSection);

  feedContainer.append(footer());
  return feedContainer;
};
