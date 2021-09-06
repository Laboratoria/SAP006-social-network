import {
  likesPost, deletePost, getUserData, numLikes, updateRecipePost, getRecipesCollectionDoc,
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
          <span class="material-icons"> edit </span> 
        </p>
      </li>
      <li class="delete-button"> 
        <p> Excluir 
          <span class="material-icons"> deletep </span>
        </p> 
      </li>
    </ul>



    <ul id="recipeConfirmEditMenu" class="recipeMenu">
      <li id="confirmEditButton" class="edit-button">
        <p> Salvar alterações
        <i class="fas fa-save"></i> </p>
      </li>
      <li id="cancelEditButton" class="delete-button">
        <p> Cancelar &nbsp
          <i class="fas fa-undo-alt"></i>
        </p> 
      </li>
    </ul>



    <div class="toggle-section">
      <h3 class="title recipe-title"> ${post.data()['nome da receita']} </h3>
    
      <div id="photo-${post.id}"> </div>
      
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
            <select class="select-edit-recipe" id="editDifficulty">
              <option class="current-option-edit-recipe" value=${post.data().dificuldade}>${post.data().dificuldade}</option>
              <option class="option-edit-recipe" value="Fácil"> Fácil </option>
              <option class="option-edit-recipe" value="Média"> Média </option>
              <option class="option-edit-recipe" value="Alta"> Alta </option>
            </select>
          </div>
          
          <div class="recipeInfo-box">
            <select class="select-edit-recipe id="editCost">
              <option class="current-option-edit-recipe" value=${post.data().preco}>${post.data().preco}</option>
              <option class="option-edit-recipe" value="$"> $ </option>
              <option class="option-edit-recipe" value="$$"> $$ </option>
              <option class="option-edit-recipe" value="$$$"> $$$ </option>
              <option class="option-edit-recipe" value="$$$$"> $$$$ </option>
            </select>  
            <p>custo</p>
          </div>
          
          <div class="recipeInfo-box">
            <select class="select-edit-recipe id="editCategory">
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
          <div>
            <textarea id="editIngredients-${post.id}" class="textarea-edit-recipe">${post.data().ingredientes.replaceAll('<br />', '\n')}</textarea>
          </div>
        
        <h3 class="title center-title recipe-title">Modo de preparo</h3>
        <div>
          <textarea id="editPreparationMode-${post.id}" class="textarea-edit-recipe">${post.data()['modo de preparo'].replaceAll('<br />', '\n')}</textarea> 
        </div>

      </div>
    </div>

    <div class="div-width100 recipe-title recipe-footer">
      <div class="like-date">
        <div class="like">
          <button class="recipeLikes" data-like= ${post.id}>
            <i id="likes-${post.id}" class="far fa-heart"></i>
          </button>
          <p class="numLikes"> ${post.data().likes.length || 0}</p>
          <span class="material-icons commentIcon">insert_comment</span> ${post.data().comments.length}
        </div>
        <p class="post-date"> ${post.data().data} </p>
      </div>

      <div class="title-level">
        <p class="userAuthor"> Por ${post.data().autor} </p>
        <p class="userLevel">${post.data().nivel}</p>
      </div>
    </div>  

    <div class="popup" data-toggle="popup">
      <h2> Deletar Receita </h2>
      <p> Você tem certeza ? </p>
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

  const recipePhoto = postContainer.querySelector(`#photo-${post.id}`);
  if (post.data().fotoUrl === null) {
    recipePhoto.innerHTML = '<img class="post-photo" src="image/nissin.jpg"></img>';
  } else {
    recipePhoto.innerHTML = `<img class="post-photo" src=${post.data().fotoUrl}></img>`;
  }

  const toggleDiv = postContainer.querySelector('.toggle-section');
  toggleDiv.addEventListener('click', () => {
    toggleDiv.querySelector('.recipeBody').classList.toggle('showBlock');
  });

  const recipeBody = toggleDiv.querySelector('.recipeBody');
  const recipeEditBody = postContainer.querySelector('#recipeEditBody');
  const postPhoto = postContainer.querySelector('.post-photo');
  const recipeMenu = postContainer.querySelector('.recipeMenu');
  const recipeConfirmEditMenu = postContainer.querySelector('#recipeConfirmEditMenu');
  const userUid = getUserData().uid;

  const likes = postContainer.querySelector(`#likes-${post.id}`);
  const button = postContainer.querySelector('.recipeLikes');
  const numberLikes = postContainer.querySelector('.numLikes');

  const confirmDelete = postContainer.querySelector('.btn-yes');
  const cancelDelete = postContainer.querySelector('.btn-no');
  const deleteButton = postContainer.querySelector('.delete-button');
  const menuButton = postContainer.querySelector('.menu-recipeButton');
  const editButton = postContainer.querySelector('.edit-button');

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

  const postLikes = post.data().likes;
  if (postLikes.includes(getUserData().uid)) {
    likes.classList.add('fas');
  } else {
    likes.classList.add('far');
  }

  postPhoto.addEventListener('click', () => {
    if (!recipeEditBody.classList.contains('showBlock')) {
      recipeBody.classList.toggle('showBlock');
    }
  });

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

  function toggleClass() {
    const toggleClassElements = postContainer.querySelectorAll('.overlay, .popup');
    toggleClassElements.forEach((elem) => elem.classList.toggle('active'));
  }

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

  cancelDelete.addEventListener('click', () => {
    toggleClass();
    recipeMenu.classList.remove('showMenu');
  });

  deleteButton.addEventListener('click', toggleClass);

  menuButton.addEventListener('click', () => {
    recipeMenu.classList.toggle('showMenu');
  });

  editButton.addEventListener('click', () => {
    if (recipeBody.classList.contains('showBlock')) {
      recipeBody.classList.remove('showBlock');
    }
    recipeEditBody.classList.toggle('showBlock');
    recipeConfirmEditMenu.classList.toggle('showMenu');
  });

  function confirmEditButtonDom() {
    updateRecipePost(`${post.id}`,
      editRecipeIngredients.value.replaceAll(/\n/g, '<br />'),
      editRecipePreparationMode.value.replaceAll(/\n/g, '<br />'),
      editRecipeTime.value,
      editRecipeDifficulty.value,
      editRecipeCategory.value,
      editRecipeCost.value)
      .then(() => {
        recipeTime.innerHTML = editRecipeTime.value;
        recipeDifficulty.innerHTML = editRecipeDifficulty.value;
        recipeCost.innerHTML = editRecipeCost.value;
        recipeCategory.innerHTML = editRecipeCategory.value;
        recipeIngredients.innerHTML = editRecipeIngredients.value;
        recipePreparationMode.innerHTML = editRecipePreparationMode.value;
      })
      .then(() => {
        recipeConfirmEditMenu.classList.remove('showMenu');
        recipeMenu.classList.remove('showMenu');
        recipeEditBody.classList.remove('showBlock');
      })
      .catch((error) => {
        postContainer.append(errorModal());
        throw Error(error);
      });
  }
  confirmEditButton.addEventListener('click', confirmEditButtonDom);

  function cancelEditButtonDom() {
    recipeConfirmEditMenu.classList.remove('showMenu');
    recipeMenu.classList.remove('showMenu');
    recipeEditBody.classList.remove('showBlock');
    getRecipesCollectionDoc(`${post.id}`)
      .then((response) => {
        editRecipeIngredients.value = response.data().ingredientes.replaceAll('<br />', '\n');
        editRecipePreparationMode.value = response.data()['modo de preparo'].replaceAll('<br />', '\n');
        editRecipeTime.value = response.data()['tempo de preparo'];
        editRecipeDifficulty.value = response.data().dificuldade;
        editRecipeCategory.value = response.data().categoria;
        editRecipeCost.value = response.data().preco;
      });
  }

  cancelEditButton.addEventListener('click', cancelEditButtonDom);

  if (userUid === post.data().user_id) {
    menuButton.style.visibility = 'visible';
  }

  return postContainer;
}
