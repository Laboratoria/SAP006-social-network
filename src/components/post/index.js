import {
  likesPost, deletePost, getUserData, numLikes, updateRecipePost,
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



    <ul id="recipeConfirmEditMenu" class="recipeMenu">
      <li id="confirmEditButton" class="edit-button">
        <p> Salvar alterações
          <!---<span class="material-icons"> edit </span> ---> </p>
      </li>
      <li id="cancelEditButton" class="delete-button"> <p> Cancelar 
        <!---<span class="material-icons"> deletep </span> ---> </p> 
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
            <p id="time" >${post.data()['tempo de preparo']} minutos</p>
          </div>
          
          <div class="recipeInfo-box">
            <p id="difficulty">${post.data().dificuldade}</p>
          </div>
          
          <div class="recipeInfo-box">
            <p id="cost">${post.data().preco}</p>
            <p>custo</p>
          </div>
          
          <div class="recipeInfo-box">
            <p id="category">${post.data().categoria}</p>
          </div>

        </div>

        <h3 class="title center-title recipe-title">Ingredientes</h3>
        <div id="ingredients-${post.id}" class="">
          ${post.data().ingredientes}
        </div>
        
        <h3 class="title center-title recipe-title">Modo de preparo</h3>
        <div id="preparationMode-${post.id}">
          ${post.data()['modo de preparo']} 
        </div>

      </div>




      <div id="recipeEditBody" class="recipeBody"> 
      <div class="recipe-info">

        <div class="recipeInfo-box">
          <span class="material-icons"> schedule </span>
          <input id="editTime" type="number" class="input-edit-recipe" value=${post.data()['tempo de preparo']} placeholder="em minutos...">
        </div>
        
        <div class="recipeInfo-box">
        <select id="editDifficulty">
              <option class="current-option-edit-recipe" value=${post.data().dificuldade}>${post.data().dificuldade}</option>
              <option class="option-edit-recipe" value="Fácil"> Fácil </option>
              <option class="option-edit-recipe" value="Média"> Média </option>
              <option class="option-edit-recipe" value="Alta"> Alta </option>
        </select>
         
        </div>
        
        <div class="recipeInfo-box">
        <select id="editCost">
          <option class="current-option-edit-recipe" value=${post.data().preco}>${post.data().preco}</option>
          <option class="option-edit-recipe" value="$"> $ </option>
          <option class="option-edit-recipe" value="$$"> $$ </option>
          <option class="option-edit-recipe" value="$$$"> $$$ </option>
          <option class="option-edit-recipe" value="$$$$"> $$$$ </option>
        </select>  
          <p>custo</p>
        </div>
        
        <div class="recipeInfo-box">
        <select id="editCategory">
          <option class="current-option-edit-recipe" value=${post.data().categoria}>${post.data().categoria}</option>
          <option class="option-edit-recipe" value="Carnes"> Carnes </option>
          <option class="option-edit-recipe" value="Bebidas"> Bebidas </option>
          <option class="option-edit-recipe" value="Massas"> Massas </option>
          <option class="option-edit-recipe" value="Doces"> Doces </option>
          <option class="option-edit-recipe" value="Outros"> Outros </option>
        </select>  
        </div>

      </div>

      <h3 class="title center-title recipe-title">Ingredientes</h3>
      <div class="">
        <textarea id="editIngredients-${post.id}" class="textarea-edit-recipe">${post.data().ingredientes.replaceAll('<br />', '\n')}</textarea>
      </div>
      
      <h3 class="title center-title recipe-title">Modo de preparo</h3>
      <div>
        <textarea id="editPreparationMode-${post.id}" class="textarea-edit-recipe">${post.data()['modo de preparo'].replaceAll('<br />', '\n')}</textarea> 
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
  const recipeBody = toggleDiv.querySelector('.recipeBody');
  const recipeEditBody = postContainer.querySelector('#recipeEditBody');
  const postPhoto = postContainer.querySelector('.post-photo');
  const recipeMenu = postContainer.querySelector('.recipeMenu');
  const recipeConfirmEditMenu = postContainer.querySelector('#recipeConfirmEditMenu');

  const editRecipeTime = postContainer.querySelector('#editTime');
  const editRecipeDifficulty = postContainer.querySelector('#editDifficulty');
  const editRecipeCost = postContainer.querySelector('#editCost');
  const editRecipeCategory = postContainer.querySelector('#editCategory');
  const editRecipeIngredients = postContainer.querySelector(`#editIngredients-${post.id}`);
  const editRecipePreparationMode = postContainer.querySelector(`#editPreparationMode-${post.id}`);
  const confirmEditButton = postContainer.querySelector('#confirmEditButton');
  const cancelEditButton = postContainer.querySelector('#cancelEditButton');

  const recipeTime = postContainer.querySelector('#time');
  const recipeDifficulty = postContainer.querySelector('#difficulty');
  const recipeCost = postContainer.querySelector('#cost');
  const recipeCategory = postContainer.querySelector('#category');
  const recipeIngredients = postContainer.querySelector(`#ingredients-${post.id}`);
  const recipePreparationMode = postContainer.querySelector(`#preparationMode-${post.id}`);

  postPhoto.addEventListener('click', () => {
    if (!recipeEditBody.classList.contains('showBlock')) {
      recipeBody.classList.toggle('showBlock');
    }
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
    recipeMenu.classList.toggle('showMenu');
  });

  const editButton = postContainer.querySelector('.edit-button');
  editButton.addEventListener('click', () => {
    if (recipeBody.classList.contains('showBlock')) {
      recipeBody.classList.remove('showBlock');
    }
    recipeEditBody.classList.toggle('showBlock');
    recipeConfirmEditMenu.classList.toggle('showMenu');
  });

  confirmEditButton.addEventListener('click', () => {
    updateRecipePost(`${post.id}`,
      editRecipeIngredients.value.replaceAll(/\n/g, '<br />'),
      editRecipePreparationMode.value.replaceAll(/\n/g, '<br />'),
      editRecipeTime.value,
      editRecipeDifficulty.value,
      editRecipeCategory.value,
      editRecipeCost.value)
      .then(() => {
        console.log('hora de reescrever os valores no card');
        recipeTime.value = `${post.data()['tempo de preparo']}`;
        recipeDifficulty.value = `${post.data().dificuldade}`;
        recipeCost.value = `${post.data().preco}`;
        recipeCategory.value = `${post.data().categoria}`;
        recipeIngredients.value = `${post.data().ingredientes}`;
        recipePreparationMode.value = `${post.data()['modo de preparo']}`;
      })
      .then(() => {
        console.log('hora do toggle');
        recipeConfirmEditMenu.classList.remove('showMenu');
        recipeMenu.classList.remove('showMenu');
        recipeEditBody.classList.remove('showBlock');
      })
      .catch((error) => {
        postContainer.append(errorModal());
        throw Error(error);
      });
  });

  cancelEditButton.addEventListener('click', () => {
    recipeConfirmEditMenu.classList.remove('showMenu');
    recipeMenu.classList.remove('showMenu');
    recipeEditBody.classList.remove('showBlock');
    editRecipeIngredients.value = `${post.data().ingredientes}`.replaceAll('<br />', '\n');
    editRecipePreparationMode.value = `${post.data()['modo de preparo']}`.replaceAll('<br />', '\n');
    editRecipeTime.value = `${post.data()['tempo de preparo']}`;
    editRecipeDifficulty.value = `${post.data().dificuldade}`;
    editRecipeCategory.value = `${post.data().categoria}`;
    editRecipeCost.value = `${post.data().preco}`;
  });

  const userUid = getUserData().uid;
  if (userUid === post.data().user_id) {
    menuButton.style.display = 'block';
  }

  return postContainer;
}
