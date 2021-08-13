import {
  createPost,
  currentUser,
  loadPosts,
  logOut,
} from '../../services/index.js';
import { addPost } from '../../components/post.js';

export const home = () => {
  const container = document.createElement('div');
  container.className = 'container';
  const template = `
    <div class="header-homepage">
      <div class= "user-perfil">
        <img src="./img/Perfil.png" alt="user-photo" class="user-photo">
      </div>
      <h2 class="inicial-page">Página inicial</h2>
      <button class="logout" id="logout">
        <img class='logout-img' src='img/logout-icon.png'>
      </button>
    </div>
    <form id="postForm" class="post-form">
      <label for="postText" class="text-user"></label>
      <input type="textarea" id="postText" class="post-text" placeholder="O que está acontecendo?">
      <button type="submit" class="send-post ">Postar</button>
    </form>
    <p class="loading-posts"></p>
    <ul id="postsList"></ul>
 `;

  container.innerHTML = template;

  loadPosts().then((snap) => {
    container.querySelector('.loading-posts').innerHTML = '';
    snap.forEach((post) => {
      const postElement = addPost(post);
      container.querySelector('#postsList').appendChild(postElement);
    });
  });

  container.querySelector('#postForm')
    .addEventListener('submit', (event) => {
      event.preventDefault();
      const textPost = document.querySelector('#postText').value;
      createPost(textPost).then((result) => {
        const date = new Date();
        const createdPost = {
          id: result.id,
          data: () => ({
            userName: currentUser().displayName,
            text: textPost,
            createdAt: date.toLocaleString(),
          }),
        };

        const newPostElement = addPost(createdPost);
        container.querySelector('#postsList').prepend(newPostElement);
      });
    });

  container.querySelector('.loading-posts').innerHTML = 'Carregando...';
  container.querySelector('#logout').addEventListener('click', (e) => {
    e.preventDefault();
    logOut();
  });

  return container;
};
