import {
  addPosts, loadPosts, searchPosts,
} from '../../services/database.js';
import { printPost } from '../../components/feedcomponent.js';
import { logout, uploadPicture, downloadPicture, updateProfile } from '../../services/authentication.js';

export const Feed = () => {
  const rootElement = document.createElement('div');
  const container = `
    <header class="searchBell">
      <input type="search" id="input-search" class="searchBar btn-search-icon" name="searchPost" placeholder="Pesquise no Fort">
      <button id="search" class="search">
        <span class="iconify" data-icon="akar-icons:search"></span>
      </button>
    </header>
    <hr class="line">
    <section class="post">
      <div class="post-before">
        <p class="header-post-before">POST</p>
      </div>

      <form action="" id="published-form" class="published-form">
        <input type="text" id="text-post" name="new-post" class="form-input-newpost" placeholder="Mana, o que você quer compatilhar?">
        <p class="warn-input-add" hidden>Por favor, digite algo para compartilhar.</p>
        <button class="btn-send" id="send-post">Enviar</button>
      </form>
    </section>

    <h4 class="recent">POSTAGENS RECENTES</h4>
   
    <div class="search-result"></div>
    
    <section class="get-post background-color-main" data-postcontainer id="postTemplate"> 
      <!--Aqui vem todo o template do areaOfPost-->
    </section>

    <nav class="navbar mobile-list">
      <ul>
        <li id="homeBtn">
          <span class="iconify" data-inline="false" data-icon="akar-icons:home" style="color: #FFD2BF;">
          </span>
        </li>
        <li id="newPostButton">
          <span class="iconify" id="new-post-btn" data-inline="false" data-icon="clarity:plus-circle-line"></a>
          </span>
        </li>
        <li id="profilebtn">
          <span class="iconify" id="profile-btn" data-inline="false" data-icon="akar-icons:person" style="color: #FFD2BF;">
          </span>
        </li>
      </ul>
    </nav>

    <section class="profile-section" id="profile-section">
      <div class="profile-img-container">
        <img src="../../img/logo.png" class="profile-img">

        <div class='input-wrapper'>
          <label for='input-file'>
            Seleciona aquela foto mara!
          </label>
          <input type="file" name="arquivo" id="input-file" class="profile-pic">
        </div>
      </div>

      <input type="text" class="profile-username" id="profile-username" placeholder="Nome de usuária...">

      <div class="profile-buttons">
        <button class="btn-logout">
          <span class="iconify logout-icon-bcgcolor" data-icon="ic:round-logout" style="color: #f78563; background-color: white;"></span>
        </button>


        <button class="profile-save">Salvar</buton>
      </div>
    </section>
    `;

  rootElement.innerHTML = container;

  const postTemplate = rootElement.querySelector('#postTemplate');
  const postSection = rootElement.querySelector('.post');

  const currentUser = firebase.auth().currentUser;
  const useruid = firebase.auth().currentUser.uid;
  const displayName = firebase.auth().currentUser.displayName;
  const photo = firebase.auth().currentUser.photoURL;

  const containerSearch = rootElement.querySelector('.search-result');
  const searchButton = rootElement.querySelector('#search');

  searchButton.addEventListener('click', () => {
    const textSearched = rootElement.querySelector('#input-search').value;
    const termsArray = textSearched.toLowerCase().split(' ');
    const postagensRecentes = rootElement.querySelector('.recent');
    postagensRecentes.style.display = 'none';

    containerSearch.innerHTML = `
      <span class="result-text">Resultados para ${textSearched}: </span>
      `;

    postTemplate.innerHTML = '';
    searchPosts(termsArray)
      .then((snap) => {
        snap.forEach((doc) => {
          const obj = {
            id: doc.id,
            text: doc.data().text,
            user_id: doc.data().user_id,
            displayName: doc.data().userName,
            likes: doc.data().likes,
            date: doc.data().date,
            comments: doc.data().comments,
            terms: doc.data().text.toLowerCase().split(' '),
            // photoPost: doc.data().photoURL,
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
    const date = new Date();
    const post = {
      text,
      user_id: useruid,
      datePost: date,
      likes: [],
      comments: [],
      terms: text.toLowerCase().split(' '),
      displayName,
      photoUser: photo,
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

    postSection.style.display = 'none';

    const textClear = rootElement.querySelector('#text-post');
    textClear.value = '';
  });

  const homeBtn = rootElement.querySelector('#homeBtn');
  homeBtn.addEventListener('click', () => {
    postTemplate.style.display = 'flex';
    postSection.style.display = 'none';
  });

  const newPostButton = rootElement.querySelector('#newPostButton');

  newPostButton.addEventListener('click', () => {
    postTemplate.style.display = 'none';
    postSection.style.display = 'block';
    postTemplate.style.display = 'block';
  });

  const profileBtn = rootElement.querySelector('#profilebtn');
  const profileSection = rootElement.querySelector('#profile-section');
  const inputImg = rootElement.querySelector('.profile-img');
  const input = rootElement.querySelector('label[for="input-file"]').nextElementSibling

  function showPhoto() {
    if (photo) {
      inputImg.src = photo;
    }
  }
  showPhoto();

  input.addEventListener('change', (e) => {
    const { target } = e;
    console.log(target);
    const file = target.files[0];
    uploadPicture(useruid, file);
    downloadPicture(useruid, currentUser);
    showPhoto();
  });

  profileBtn.addEventListener('click', () => {
    postTemplate.style.display = 'none';
    profileSection.style.display = 'block';
  });

  const usernameInput = rootElement.querySelector('#profile-username');
  const saveUsernameBtn = rootElement.querySelector('.profile-save');
  saveUsernameBtn.addEventListener('click', () => {
    console.log(usernameInput.value);
    updateProfile(usernameInput.value);
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
          displayName: doc.data().displayName,
          photoUser: doc.data().photoUser,
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
          displayName: doc.data().displayName,
          photoPost: doc.data().photoURL,
        };

        const print = printPost(post);
        postTemplate.appendChild(print);
      });
    });

  window.onscroll = stickyFilter();

  return rootElement;
};
