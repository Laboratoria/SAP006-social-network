import {
  addPosts, getLikes, likePost, loadPosts, unlikePost,
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
              class="iconify"
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
        <input type="text" id="text-post" class="space-post" placeholder="Mana, o que você quer compatilhar?">
        <button class="btn" id="send-post">Enviar</button>
      </form>
    </section>
   
    <section class="get-post" id="postTemplate" data-section> 
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

  // likes:
  const datasection = rootElement.querySelector('[data-section]');
  datasection.addEventListener('click', (e) => {
    const { target } = e;
    console.log(target);
    const postId = target.dataset.like;
    // console.log(likeId);
    const userId = firebase.auth().currentUser.uid;
    const likeIcon = rootElement.querySelector('[data-like]');
    function sendLike() {
      const numLikeArray = rootElement.querySelector('[data-numLike]');
      let likesNumber = Number(numLikeArray.innerText);
      console.log(likesNumber);
      // const likesElement = likesNumber;
      getLikes(postId).then((post) => {
        console.log(post.data());
        if (!post.data().likes.includes(userId)) {
          likePost(userId, postId)
            .then(() => {
              likesNumber += likesNumber + 1;
              likeIcon.classList.replace('far', 'fas');
            })
            .catch('error');
        } else {
          unlikePost(userId, postId)
            .then(() => {
              likesNumber += likesNumber - 1;
              likeIcon.classList.replace('fas', 'far');
            })
            .catch('error');
        }
      });
    }
    if (target) { sendLike(); }
  });

  // datasection.addEventListener('click', (e) => {
  //   const { target } = e;
  //   const likeId = target.dataset.like;
  //   if (likeId) {
  //     let numberLikesData = rootElement.querySelector(`[data-numLike='${likeId}']`);
  //     const userId = firebase.auth().currentUser.uid;
  //     const numberOfLikes = Number(numberLikesData.textContent);
  //     console.log(numberOfLikes);
  //     const heart = datasection.querySelector(`[data-like='${likeId}']`);

  //     if (likeId.includes(userId)) {
  //       numberLikesData.innerHTML = numberOfLikes + 1;
  //       heart.src = '/src/img/heart-filled.png';
  //       likePost(likeId);
  //     } else {
  //       numberLikesData.innerHTML = numberOfLikes - 1;
  //       heart.src = 'src/img/heart.png';
  //       likePost(likeId);
  //     }
  //   }
  // });

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
      date: date.toLocaleString(),
      // date: firebase.firestore.FieldValue.serverTimestamp(),
      likes: [],
      comments: [],
    };

    if (text === '') {
      console.log('Deu bom');
    } else {
      addPosts(post);
    }
  });

  const navbarBottom = document.getElementsByClassName('navbar');
  const sticky = navbarBottom.offsetBottom;
  function stickyFilter() {
    if (window.pageYOffset >= sticky) {
      navbarBottom.classList.add('sticky');
    }
  }
  window.onscroll = stickyFilter();

  // slider post
  // const newPostBtn = document.querySelector('#new-post-btn');
  // newPostBtn.addEventListener('click', () => {
  //   container.classList.add("sign-up-mode");
  // });

  loadPosts()
    .then((snap) => {
      snap
        .forEach((post) => {
          printPost(post);
        });
    });
  return rootElement;
};
