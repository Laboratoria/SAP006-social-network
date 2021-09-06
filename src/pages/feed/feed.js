import {
  addPosts, loadPosts, searchPosts,
} from '../../services/database.js';
import { printPost } from '../../components/feedcomponent.js';
import { logout } from '../../services/authentication.js';

export const Feed = () => {
  const rootElement = document.createElement('div');
  const container = `
    <header class="searchBell">
      <input type="search" id="input-search" class="searchBar btn-search-icon" name="searchPost" placeholder="Pesquise no Fort">
      <button id="search">
        <span class="iconify" data-icon="akar-icons:search" style="color: #706f6b;"></span>
      </button>
      <button class="btn-logout">
        <span class="iconify logout-icon-bcgcolor" data-icon="ic:round-logout" style="color: #f78563;"></span>
      </button>
    </header>
    <hr class="line">
    <section class="post">
      <form action="" id="published-form">
        <input type="text" id="text-post" name="new-post" class="form-input-newpost" placeholder="Mana, o que você quer compatilhar?">
        <p class="warn-input-add" hidden>Por favor, digite algo para compartilhar.</p>
        <button class="btn" id="send-post">Enviar</button>
      </form>
    </section>
    <h4>POSTAGENS RECENTES</h4>
   
    <div class="search-result"></div>
    
    <section class="get-post background-color-main" data-postcontainer id="postTemplate"> 
      <!--Aqui vem todo o template do areaOfPost-->
    </section>

    <nav class="navbar mobile-list">
      <ul>
        <li>
          <span class="iconify" data-inline="false" data-icon="akar-icons:home" style="color: #FFD2BF;">
          </span>
        </li>
        <li>
          <a href="#text-post"><span class="iconify" id="new-post-btn" data-inline="false" data-icon="clarity:plus-circle-line"></a>
          </span>
        </li>
        <li>
          <span class="iconify" data-inline="false" data-icon="akar-icons:person" style="color: #FFD2BF;">
          </span>
        </li>
      </ul>
    </nav>
    `;

  rootElement.innerHTML = container;

  const postTemplate = rootElement.querySelector('#postTemplate');

  const searchButton = rootElement.querySelector('#search');
  const containerSearch = rootElement.querySelector('.search-result');

  searchButton.addEventListener('click', () => {
    const textSearched = rootElement.querySelector('#input-search').value;
    const termsArray = textSearched.toLowerCase().split(' ');

    containerSearch.innerHTML = `
      <span class="result-text">Resultados para ${textSearched}: </span>
      `;

    searchPosts(termsArray)
      .then((snap) => {
        snap.forEach((doc) => {
          const obj = {
            id: doc.id,
            text: doc.data().text,
            user_id: doc.data().user_id,
            likes: doc.data().likes,
            date: doc.data().date,
            comments: doc.data().comments,
            terms: doc.data().text.toLowerCase().split(' '),
          };

          const print = printPost(obj);
          postTemplate.prepend(print);
        });
      });
  });

  const logoutButton = rootElement.querySelector('.btn-logout');
  logoutButton.addEventListener('click', () => {
    logout();
  });

  const submitButton = rootElement.querySelector('#published-form');
  submitButton.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = rootElement.querySelector('#text-post').value;
    console.log(text);
    const useruid = firebase.auth().currentUser.uid;
    const date = new Date();
    const post = {
      text,
      user_id: useruid,
      datePost: date,
      likes: [],
      comments: [],
      terms: text.toLowerCase().split(' '),
    };

    const textValidationAddPost = rootElement.querySelector('.warn-input-add');

    if (text === '') {
      textValidationAddPost.hidden = false;
    } else {
      textValidationAddPost.hidden = true;
      addPosts(post)
        .then((doc) => {
          const objPost = {
            id: doc.id,
            ...post,
          };
          const element = printPost(objPost);
          postTemplate.prepend(element);
        });
    }
  });

  loadPosts()
    .then((snap) => {
      snap.forEach((doc) => {
        const post = {
          id: doc.id,
          text: doc.data().text,
          user_id: doc.data().user_id,
          likes: doc.data().likes,
          date: doc.data().date,
          comments: doc.data().comments,
        };

        const print = printPost(post);
        postTemplate.appendChild(print);
      });
    });

  const navbarBottom = document.getElementsByClassName('navbar');
  const sticky = navbarBottom.offsetBottom;
  function stickyFilter() {
    if (window.pageYOffset >= sticky) {
      navbarBottom.classList.add('sticky');
    }
  }
  window.onscroll = stickyFilter();

  return rootElement;
};
