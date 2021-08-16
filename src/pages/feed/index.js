import profile from '../../components/profile/profile.js';
import { changePage } from '../../routes/changePage.js';
import firebase from '../../services/firebase.js';

const createPage = () => {
  const rootElement = document.createElement('div');
  const user = firebase.getUser();
 
  // if (!user) {
  //   logout();
  // }

  const contentnewElement = `        
          <header>
              <nav class="feed-navbar">
                  <img class="feed-logo" src="./img/Amitié2.png" alt="">
                  <div class="hamburger" id="hamburger">
                      <div class="hamburger-line"></div>
                      <div class="hamburger-line"></div>
                      <div class="hamburger-line"></div>
                  </div>

                  <ul class="navbar-links" id="navbar-links">
                      <li class="li-items" id="navigate-profile"><a href="#" id="goProfile">Perfil</a></li>
                      <li class="li-items" id="navigate-feed"><a href="#">Feed</a></li>
                      <li class="li-items feed-logout"></li>
                  </ul>
              </nav>
          </header>
          <main class="feed-container">
            <section class="greet-user">
            <img src="https://i.pravatar.cc/100?img=16" alt="User Photo" class="user-feed-photo">
              <p>Bem vinda, ${user.displayName}</p>
            </section>
        
            <form id="postForm" class="posts-form">
                <input type="text" name="postText" id="postText" class="post-text" autocomplete="off" placeholder="No que você está pensando?" required>
                <button id="publishBtn" class="post-btn">Publicar</button>
            </form>

            <section class="loading-posts"></section>
            <ul id="postsList" class="posts-list"></ul>
          </main>
          
    `;

  rootElement.innerHTML = contentnewElement;

  const hamburger = rootElement.querySelector('#hamburger');
  const navLinks = rootElement.querySelector('.navbar-links');
  const links = rootElement.querySelectorAll('.navbar-links li');
  const section = rootElement.querySelector('.feed-logout');
  const navigateProfile = rootElement.querySelector('#goProfile');

  
  // const postsCollection = firebase.firestore().collection("posts");
  // console.log(postsCollection);
  
  rootElement.querySelector('#postForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const textPost = rootElement.querySelector('#postText').value;
    firebase.createPost(textPost);
  });



  // NAV LINKS
  navigateProfile.addEventListener('click', () => {
    changePage('/create-profile');
  });

  // LOGOUT COMPONENT
  section.appendChild(profile());

  //MENU HAMBURGUER
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    links.forEach((link) => {
      link.classList.toggle('fade');
    });
  });
  
  firebase.loadPosts();
  return rootElement;
};

export default createPage;

