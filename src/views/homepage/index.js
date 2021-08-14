import {
  createPost,
  currentUser,
  loadPosts,
  logOut,
} from '../../services/index.js';
import { addPost } from '../../components/post.js';

export const home = () => {
  const container = document.createElement('div');
  container.className = 'container-timeline';
  const template = `
    <div class="header-homepage">
      <div class= "user-perfil-header">
        <img src="./img/Perfil.png" alt="user-photo" class="user-photo-header" width="60px">
      </div>
      <h2 class="inicial-page">Página inicial</h2>
      <button class="logout" id="logout">
        <img class='logout-img' src='img/logout-icon.png'>
      </button>
    </div>
    <form id="postForm" class="post-form">
      <textarea id="postText" class="post-text" rows="1" cols="2" autocomplete="off" maxlength="500" minlenght ="1" placeholder="O que está acontecendo?" required></textarea>
      <button type="submit" class="send-post ">Postar</button>
    </form>
    <p class="loading-posts"></p>
    <ul id="postsList"></ul>
    <div class= "footer-img">
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
      document.querySelector('#postText').value = '';
    });

  container.querySelector('.loading-posts').innerHTML = 'Carregando...';
  container.querySelector('#logout').addEventListener('click', (e) => {
    e.preventDefault();
    logOut();
  });

  return container;
};
