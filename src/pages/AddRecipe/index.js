import { getUserData, postRecipe, uploadFoodPhoto } from '../../services/index.js';
import header from '../../components/header/index.js';
import footer from '../../components/footer/index.js';
import errorModal from '../../components/error/index.js';

export default () => {
  const addRecipeContainer = document.createElement('div');
  addRecipeContainer.setAttribute('class', 'screenContainer');

  addRecipeContainer.append(header());

  const addRecipeSection = document.createElement('section');
  addRecipeSection.setAttribute('class', 'postRecipeSection div-width90');

  const addRecipeTemplate = `
    <h2 id="post-recipe-title" class="title">Postar Receita</h2>

    <form class="postRecipeForm">
      
      <input type="text" id="addRecipe-title" class="signUp-input required" placeholder="Nome da receita">
      
      <label for="fileImage" class="btn-uploadImage"> <i class="fa fa-cloud-upload">
        </i> Upload Foto da Receita
      </label>
      <input type="file" value="upload" id="fileImage" accept="image/*" />
      <div class="fileUploadName"></div>

      <div class="info-recipe-container-flex">
        <div class="width-90">
          <h3 class="title">Ingredientes</h3>
          <textarea id="ingredients-recipe" class="textarea-recipe required" spellcheck="false" placeholder="Exemplo:&#10;04 ovos&#10;01 colher (sopa) fermento" rows="10"></textarea>
        </div>
      </div>

      <div class="info-recipe-container-flex">
        <div class="width-90">
          <h3 class="title">Modo de Preparo</h3>
          <textarea id="howToDo-recipe" class="textarea-recipe required" spellcheck="false" placeholder="Exemplo:&#10;Misture os ovos e a farinha" rows="10"></textarea>
        </div>
      </div>
      
      <div class="info-recipe-container">
        <div class="filter-info-recipe">
          <label for="time">Tempo de Preparo</label>
          <div class="time-recipe-container">
            <input type="number" name="time" id="time-select" class="time-input required" step="5" min="5">
            <span>minutos</span>
          </div>
        </div>

        <div class="filter-info-recipe">
          <label for="difficult">Dificuldade</label>
          <select name="difficult" id="difficult-select" class="recipe-select required">
              <option value="Fácil"> Fácil </option>
              <option value="Média"> Média </option>
              <option value="Alta"> Alta </option>
            </select>
        </div>
        
        <div class="filter-info-recipe">
          <label for="food-type">Categoria</label>
          <select name="food-type" id="food-type-select" class="recipe-select required">
            <option value="Carnes"> Carnes </option>
            <option value="Bebidas"> Bebidas </option>
            <option value="Massas"> Massas </option>
            <option value="Doces"> Doces </option>
            <option value="Outros"> Outros </option>
          </select>
        </div>
      
        <div class="filter-info-recipe" id="filter-info-recipe-last">
          <label for="price">Faixa de Custo</label>
          <select name="price" id="price-select" class="recipe-select required">
            <option value="$"> $ </option>
            <option value="$$"> $$ </option>
            <option value="$$$"> $$$ </option>
            <option value="$$$$"> $$$$ </option>
          </select>
        </div>    
      </div>
      
      <div id="alert" class="notice"></div>
      <button type="button" id="post-recipe" class="btn-login">Postar</button>

    </form>

    <div class="popup" id="popup">
      Adicionar outra receita?
        
      <div class="div-btns-popup">
        <button type="button" id="btn-yes" class="btn-popup btn-yes">Sim</button>
        <button type="button" id="btn-no" class="btn-popup btn-no">Não</button>
      </div>
    </div>
    <div class="overlay"></div>
  `;

  addRecipeSection.innerHTML = addRecipeTemplate;
  addRecipeContainer.append(addRecipeSection);

  const form = addRecipeContainer.querySelector('.postRecipeForm');
  const alert = addRecipeContainer.querySelector('#alert');

  const overlay = addRecipeContainer.querySelector('.overlay');
  const toggle = addRecipeContainer.querySelectorAll('.overlay, #popup');

  function toggleClass() {
    toggle.forEach((elem) => elem.classList.toggle('active'));
  }

  const outputFileName = addRecipeContainer.querySelector('.fileUploadName');
  const btnAddPhoto = addRecipeContainer.querySelector('#fileImage');

  let file;
  btnAddPhoto.addEventListener('change', (e) => {
    // get file
    file = e.target.files[0];
    outputFileName.innerHTML = `<i class="far fa-file-image"></i> ${file.name}`;
  });

  function addRecipeFirestore(recipe) {
    postRecipe(recipe)
      .then(() => {
        toggleClass();
      })
      .catch((error) => {
        overlay.classList.add('active');
        addRecipeContainer.append(errorModal());
        throw Error(error);
      });
  }

  function addRecipeDom() {
    const data = new Date();
    const recipe = {
      'nome da receita': addRecipeContainer.querySelector('#addRecipe-title').value.toUpperCase(),
      ingredientes: addRecipeContainer.querySelector('#ingredients-recipe').value.replaceAll(/\n/g, '<br />'),
      'modo de preparo': addRecipeContainer.querySelector('#howToDo-recipe').value.replaceAll(/\n/g, '<br />'),
      'tempo de preparo': addRecipeContainer.querySelector('#time-select').value,
      dificuldade: addRecipeContainer.querySelector('#difficult-select').value,
      categoria: addRecipeContainer.querySelector('#food-type-select').value,
      preco: addRecipeContainer.querySelector('#price-select').value,
      autor: getUserData().displayName,
      user_id: getUserData().uid,
      likes: [],
      comments: [],
      fotoUrl: null,
      data: data.toLocaleString('en-us', { timeStyle: 'short', dateStyle: 'short' }),
      nivel: getUserData().level,
    };

    if (file !== undefined) {
      uploadFoodPhoto(file)
        .then((url) => {
          recipe.fotoUrl = url;
        })
        .then(() => {
          addRecipeFirestore(recipe);
        })
        .catch((error) => {
          overlay.classList.add('active');
          addRecipeContainer.append(errorModal());
          throw Error(error);
        });
    } else {
      addRecipeFirestore(recipe);
    }
  }

  const btnPostRecipe = addRecipeContainer.querySelector('#post-recipe');
  const inputs = addRecipeContainer.querySelectorAll('.required');
  btnPostRecipe.addEventListener('click', (e) => {
    e.preventDefault();

    let valid = true;
    inputs.forEach((input) => {
      if (!input.value) {
        valid = false;
      }
    });

    if (valid === false) {
      alert.innerHTML = '<span class="material-icons">error</span><p>Preencha todos os campos</p>';
    } else {
      addRecipeDom();
    }
  });

  const addNewRecipe = addRecipeContainer.querySelector('#btn-yes');
  addNewRecipe.addEventListener('click', () => {
    form.reset();
    outputFileName.innerHTML = '';
    toggleClass();
    window.scrollTo(0, 0);
  });

  const goToFeedPage = addRecipeContainer.querySelector('#btn-no');
  goToFeedPage.addEventListener('click', () => {
    window.location.hash = '#feed';
  });

  const body = document.querySelector('body');
  const footerTag = body.querySelector('footer');

  if (footerTag === null) {
    body.appendChild(footer());
  }

  return addRecipeContainer;
};
