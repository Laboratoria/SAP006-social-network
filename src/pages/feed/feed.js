import {
  addPosts, loadPosts,
} from '../../services/database.js';
import { printPost } from '../../components/feedcomponent.js';
import { logout } from '../../services/authentication.js';

export const Feed = () => {
  const rootElement = document.createElement('div');
  const container = `
    <header class="searchBell">
      <input type="search" class="searchBar" name="searchPost" placeholder="Pesquise no Fort">
      <button>
        <span id="bell"
              class="iconify background-color-main"
              data-inline="false"
              data-icon="clarity:notification-outline-badged"
              style="color: #F78563;">
        </span>
      </button>
    </header>
    <button class="btn-logout">Logout</button>
    <hr class="line">
    <h4>POSTAGENS RECENTES</h4>
    <section class="post">
      <form action="" id="published-form">
        <input type="text" id="text-post" class="form-input-newpost" placeholder="Mana, o que você quer compatilhar?">
        <p class="warn-input-add" hidden>Por favor, digite algo para compartilhar.</p>
        <button class="btn" id="send-post">Enviar</button>
      </form>
    </section>
   
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
          <span class="iconify" id="new-post-btn" data-inline="false" data-icon="clarity:plus-circle-line">
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

  const logoutButton = rootElement.querySelector('.btn-logout');
  logoutButton.addEventListener('click', () => {
    logout();
  });

  const submitButton = rootElement.querySelector('#published-form');
  submitButton.addEventListener('submit', (event) => {
    const postContainer = postTemplate.querySelector('[data-container]');
    event.preventDefault();
    const text = rootElement.querySelector('#text-post').value;
    const useruid = firebase.auth().currentUser.uid;
    const date = new Date();
    const post = {
      text,
      user_id: useruid,
      date: date.toLocaleString(),
      likes: [],
      comments: [],
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
          const seila = printPost(objPost);
          postTemplate.prepend(seila);
        });
    }
  });

  loadPosts()
    .then((snap) => {
      snap.forEach((post) => {
        const naosei = {
          id: post.id,
          text: post.data().text,
          user_id: post.data().user_id,
          likes: post.data().likes,
          date: post.data().date,
          comments: post.data().comments,
        };

        const print = printPost(naosei);
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

// prepend para colocar post no inicio
