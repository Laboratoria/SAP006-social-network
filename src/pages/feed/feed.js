import { addPosts, loadPosts } from '../../services/database.js';
import { printPost } from '../../components/feedcomponent.js';
import { logout } from '../../services/authentication.js';

export const Feed = () => {
  const rootElement = document.createElement("div");
  const container = `
    <header class="searchBell">
      <input type="search" class="searchBar" name="searchPost" placeholder="Pesquise no Fort">
      <button><span id="bell" class="iconify" data-inline="false" data-icon="clarity:notification-outline-badged" style="color: #F78563;"></span></button>
    </header>
    <button class="btn-logout">Logout</button>
    <hr class="line"></hr>
    <h4>POSTAGENS RECENTES</h4>
    <section class="post">
      <form action="" id="published-form">
      <input type="text" id="text-post" placeholder="Mana, o que você quer compatilhar?">
      <button class="btn" id="send-post">Enviar</button>
      </form>
    </section>
   
    <section class="get-post" id="postTemplate" data-section> 
    <!--Aqui vem todo o template do areaOfPost-->
    </section>

    <nav class="navbar mobile-list">
      <ul>
        <li><span class="iconify" data-inline="false" data-icon="akar-icons:home" style="color: #FFD2BF;"></span></li>
        <li><span class="iconify" id="new-post-btn" data-inline="false" data-icon="clarity:plus-circle-line"></span></li>
        <li><span class="iconify" data-inline="false" data-icon="akar-icons:person" style="color: #FFD2BF;"></span></li>
      </ul>
    </nav>
    `;

  rootElement.innerHTML = container;

  const logoutButton = rootElement.querySelector('.btn-logout');
  logoutButton.addEventListener('click', () => {
    logout();
  });

  const submitButton = rootElement.querySelector('#published-form');
  submitButton.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = rootElement.querySelector("#text-post").value;
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

    addPosts(post);
  });

  const navbarBottom = document.getElementsByClassName("navbar");
  const sticky = navbarBottom.offsetBottom;
  function stickyFilter() {
    if (window.pageYOffset >= sticky) {
      navbarBottom.classList.add("sticky");
    }
  }

  window.onscroll = stickyFilter();

  // slider post
  // const newPostBtn = document.querySelector('#new-post-btn');
  // newPostBtn.addEventListener('click', () => {
  //   container.classList.add("sign-up-mode");
  // });

  // deletePost('4pVdpwtzW4OFz5Lk4xUe');

  loadPosts()
    .then((snap) => {
    // pega o resultado da promisse
      snap
        .forEach((post) => {
        // com o resultado itera no post
        // console.log(post);
          printPost(post); // chama printPOst com o que foi retornado, no caso é posts
        });
    });
  return rootElement;
};
