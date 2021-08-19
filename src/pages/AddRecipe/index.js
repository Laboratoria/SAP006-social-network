import { postRecipe } from '../../services/index.js';
import header from '../../components/header/index.js';
import footer from '../../components/footer/index.js';

export default () => {
  const addRecipeContainer = document.createElement('div');
  addRecipeContainer.setAttribute('class', 'screenContainer');

  addRecipeContainer.append(header());

  const addRecipeSection = document.createElement('section');
  addRecipeSection.classList.add('div-width90');

  const addRecipeTemplate = `
    <h2 id="post-recipe-title" class="title">Postar Receita</h2>

    <form class="initialForm">
      
      <input type="text" id="recipe-title" class="signUp-input required" placeholder="Nome da receita">
      
      <div id="recipe-photo" class="recipe-photo"></div>

      <progress id="file" value="0" max="100"> 0% </progress>
      <input type="file" value="upload" id="fileButton" class="btn-login" />

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
          <label for="price">Faixa de Preço</label>
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
      Deseja adicionar outra receita?
        
      <div class="div-btns-popup">
        <button type="button" id="btn-yes" class="btn-popup btn-yes">Sim</button>
        <button type="button" id="btn-no" class="btn-popup btn-no">Não</button>
      </div>
    </div>
    <div class="overlay"></div>
  `;

  addRecipeSection.innerHTML = addRecipeTemplate;
  addRecipeContainer.append(addRecipeSection);

  const form = addRecipeContainer.querySelector('.initialForm');
  const alert = addRecipeContainer.querySelector('#alert');
  const btnPostRecipe = addRecipeContainer.querySelector('#post-recipe');
  const popup = addRecipeContainer.querySelector('#popup');
  const toggle = addRecipeContainer.querySelectorAll('.overlay, #popup');

  function toggleClass() {
    toggle.forEach((elem) => elem.classList.toggle('active'));
  }

  function addRecipeDom() {
    const recipe = {
      'nome da receita': addRecipeContainer.querySelector('#recipe-title').value.toUpperCase(),
      ingredientes: addRecipeContainer.querySelector('#ingredients-recipe').value.replace(/\n/g, '<br />'),
      'modo de preparo': addRecipeContainer.querySelector('#howToDo-recipe').value.replace(/\n/g, '<br />'),
      'tempo de preparo': addRecipeContainer.querySelector('#time-select').value,
      dificuldade: addRecipeContainer.querySelector('#difficult-select').value,
      categoria: addRecipeContainer.querySelector('#food-type-select').value,
      preco: addRecipeContainer.querySelector('#price-select').value,
      autor: localStorage.getItem('displayName'),
      user_id: localStorage.getItem('uid'),
      likes: [],
      comments: [],
    };

    const inputs = addRecipeContainer.querySelectorAll('.required');

    let valid = true;
    inputs.forEach((input) => {
      if (!input.value) {
        valid = false;
      }
    });

    if (valid === false) {
      alert.innerHTML = '<span class="material-icons">error</span><p>Preencha todos os campos</p>';
    } else {
      postRecipe(recipe)
        .then(() => {
          toggleClass();
          // popup.classList.add('active');
          // overlay.classList.add('active');
        })
        .catch((error) => {
          popup.innerHTML = `
          <p> Ooooops! Alguma coisa deu errado! </p>
          <p> Tente de novo mais tarde! </p> 
          <button type="button" class="btn-login" data-close-button>OK</button>
          `;
          toggleClass();
          const closePopup = addRecipeContainer.querySelector('[data-close-button]');
          closePopup.addEventListener('click', toggleClass);
          throw new Error(error);
        });
    }
  }

  btnPostRecipe.addEventListener('click', (e) => {
    e.preventDefault();
    addRecipeDom();
  });

  const addNewRecipe = addRecipeContainer.querySelector('#btn-yes');
  addNewRecipe.addEventListener('click', () => {
    form.reset();
    toggleClass();
    // popup.classList.remove('active');
    // overlay.classList.remove('active');
    window.scrollTo(0, 0);
  });

  const goToFeedPage = addRecipeContainer.querySelector('#btn-no');
  goToFeedPage.addEventListener('click', () => {
    window.location.hash = '#feed';
  });

  addRecipeContainer.append(footer());
  return addRecipeContainer;
};
