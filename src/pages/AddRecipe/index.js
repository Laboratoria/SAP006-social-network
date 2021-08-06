import { postRecipe } from '../../services/index.js';

export default () => {
  const addRecipeContainer = document.createElement('div');
  addRecipeContainer.setAttribute('class', 'container');

  const addRecipe = `
  <h2 id="post-recipe-title" class="title">Postar Receita</h2>

  <form class="initialForm">
    
    <input type="text" id="recipe-title" class="signUp-input required" placeholder="Nome da receita">
    
    <div id="recipe-photo" class="recipe-photo"></div>
    <button type="button" id="add-photo"  class="btn-login">Adicionar foto</button>

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

      <div class="filter-info-recipe" id=">
         <label for="difficult">Dificuldade</label>
         <select name="difficult" id="difficult-select" class="recipe-select required">
            <option value="facil"> Fácil </option>
            <option value="media"> Média </option>
            <option value="alta"> Alta </option>
          </select>
      </div>
      
      <div class="filter-info-recipe">
        <label for="food-type">Categoria</label>
        <select name="food-type" id="food-type-select" class="recipe-select required">
          <option value="carnes"> Carnes </option>
          <option value="bebidas"> Bebidas </option>
          <option value="massas"> Massas </option>
          <option value="doces"> Doces </option>
        </select>
      </div>
    
      <div class="filter-info-recipe" id="filter-info-recipe-last">
        <label for="price">Faixa de Preço</label>
        <select name="price" id="price-select" class="recipe-select required">
          <option value="baixo"> $ </option>
          <option value="medio-baixo"> $$ </option>
          <option value="medio-alto"> $$$ </option>
          <option value="alto"> $$$$ </option>
        </select>   
      </div>
     
    </div>

    <div id="alert" class="notice"></div>
    <button type="button" id="post-recipe" class="btn-login">Postar</button>

    <div class="popup" id="popup">
      Deseja adicionar outra receita?
      
      <div class="div-btns-popup">
        <button type="button" id="btn-yes" class="btn-popup">Sim</button>
        <button type="button" id="btn-no" class="btn-popup">Não</button>
      </div>
    </div>
  </form>
  <div id="overlay" class=""></div>
  `;

  addRecipeContainer.innerHTML = addRecipe;

  const btnAddPhoto = addRecipeContainer.querySelector('#add-photo');
  btnAddPhoto.addEventListener('click', () => {
    window.location.hash = '/';
  });

  const alert = addRecipeContainer.querySelector('#alert');
  const btnPostRecipe = addRecipeContainer.querySelector('#post-recipe');
  const popup = addRecipeContainer.querySelector('#popup');
  const overlay = addRecipeContainer.querySelector('#overlay');

  btnPostRecipe.addEventListener('click', (e) => {
    e.preventDefault();

    const recipe = {
      'Nome da receita': addRecipeContainer.querySelector('#recipe-title').value.toUpperCase(),
      Ingredientes: addRecipeContainer.querySelector('#ingredients-recipe').value,
      'Modo de preparo': addRecipeContainer.querySelector('#howToDo-recipe').value,
      'Tempo de preparo': addRecipeContainer.querySelector('#time-select').value,
      Dificuldade: addRecipeContainer.querySelector('#difficult-select').value,
      Categoria: addRecipeContainer.querySelector('#food-type-select').value,
      'Faixa de preço': addRecipeContainer.querySelector('#price-select').value,
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
          popup.classList.add('active');
          overlay.classList.add('active');
        })
        .catch((error) => {
          throw new Error(error);
        });
    }

    const addNewRecipe = addRecipeContainer.querySelector('#btn-yes');
    addNewRecipe.addEventListener('click', () => {
      window.location.reload(true);
    });

    const goToFeedPage = addRecipeContainer.querySelector('#btn-no');
    goToFeedPage.addEventListener('click', () => {
      window.location.hash = '#feed';
    });
  });
  return addRecipeContainer;
};
