import { loadRecipe } from '../../services/index.js';
import { addPost } from '../../components/post/index.js';
import footer from '../../components/footer/index.js';

export default () => {
  const searchContainer = document.createElement('div');
  searchContainer.setAttribute('class', 'screenContainer searchContainer');

  const searchSection = document.createElement('section');

  const searchContent = `
  <header class="headerSearchPageContainer">
    <div id="headerSearchPage">

        <button type="button" class="goback-icon" >
          <span> <i class="fas fa-arrow-left"></i> </span>
        </button>
        
        <form class="searchBox">
          <input type="search" id="inputSearch" class="inputSearch" placeholder="Procurar receita ou ingrediente" />
          <button type="submit" class="submitSearch">
            <span class="searchbox-icon"> <i class="fas fa-search"></i> </span>
          </button>
        </form>
     
    </div>   
  </header>

  <h2 id="recipes-title" class="title"> Resultado da Busca </h2>

  <section class="searchResults"></section>
  `;

  searchSection.innerHTML = searchContent;
  searchContainer.append(searchSection);

  const searchResults = searchContainer.querySelector('.searchResults');
  const inputSearch = searchContainer.querySelector('.inputSearch');
  const submitSearch = searchContainer.querySelector('.submitSearch');

  const recipeNotFound = document.createElement('div');
  const notFound = `
      <div id="notice" class="notice">
        <p> Nenhuma receita encontrada </p>
      </div>
    `;
  recipeNotFound.innerHTML = notFound;

  const buttonGoBack = searchContainer.querySelector('.goback-icon');
  buttonGoBack.addEventListener('click', (event) => {
    event.preventDefault();
    window.history.back();
  });

  function search() {
    const searchedWords = inputSearch.value.toUpperCase().split(' ');
    searchResults.innerHTML = '';

    loadRecipe()
      .then((querySnapshot) => {
        querySnapshot.forEach((post) => {
          if (searchedWords.every((v) => post.data().ingredientes.toUpperCase().includes(v) || post.data()['nome da receita'].includes(v))) {
            searchResults.appendChild(addPost(post));
          }
        });
      })
      .then(() => {
        if (searchResults.childElementCount === 0) {
          searchResults.appendChild(recipeNotFound);
        }
      });
  }

  submitSearch.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputSearch.value === '') {
      searchResults.innerHTML = '';
      searchResults.appendChild(recipeNotFound);
    } else {
      search();
    }
  });

  const body = document.querySelector('body');
  const footerTag = body.querySelector('footer');

  if (footerTag === null) {
    body.appendChild(footer());
  }

  return searchContainer;
};
