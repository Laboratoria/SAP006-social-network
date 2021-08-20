import {
  createPost,
  currentUser,
  loadPosts,
  logOut,
  deletePost,
  likesPost,

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
      <textarea id="postText" class="post-text" autocomplete="off" maxlength="1000" minlenght ="1" placeholder="O que está acontecendo?" required></textarea>
      <button type="submit" class="send-post ">Postar</button>
    </form>
    <p class="loading-posts"></p>
    <ul id="postsList" data-postsList></ul>
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
      const user = currentUser();
      const textPost = document.querySelector('#postText').value;
      createPost(textPost).then((result) => {
        const date = new Date();
        const createdPost = {
          id: result.id,
          data: () => ({
            userName: user.displayName,
            userId: user.uid,
            text: textPost,
            createdAt: date.toLocaleString(),
            likes: [],
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

  const postsList = container.querySelector('[data-postsList]');
  postsList.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target;
    const buttonLike = document.querySelector("#likeBtn")
    if (target.dataset.delete === '') {
      const getPost = target.parentNode.parentNode.parentNode.parentNode;
      const id = getPost.getAttribute('data-id');
      deletePost(id)
        .then(getPost.remove());
    }
    if (target.dataset.like == '') {
      const getPost = target.parentNode.parentNode.parentNode;
      const id = getPost.getAttribute('data-id');
      likesPost(id)
      const buttonLike = document.querySelector("#likeBtn")
      buttonLike.classList.add('liked');

    } if (buttonLike.className === "liked") {
      const buttonLike = document.querySelector("#likeBtn")
      console.log(buttonLike)
      buttonLike.removeAttribute('class');
    }

  });

  return container;
};
