import { getUserIdOnLocalStorage } from '../services/index.js';

export const addPost = (post) => {
  const deleteButton = `
  <div class="delete-post">
    <button data-delete class="delete-btn" id="delete-btn" type="submit">
     <img src="../img/trash-delete.png" data-delete alt="trash icon" width="27px" />
    </button>
  </div>`;

  const isAuthor = getUserIdOnLocalStorage() === post.data().userId;
  const postDiv = document.createElement('div');
  postDiv.setAttribute('data-id', post.id);
  const postTemplate = `
    <article id="${post.data().createdAt}" class="post">
      <div class= "user-perfil" data-user="${post.data().userId}">
        <img src="./img/Perfil.png" alt="user-photo" class="user-photo">
        <h4 class="user-name">@${post.data().userName}</h4>
      </div>
      <div class="post-field">
        <p class="user-post">${post.data().text}</p>
        </div>
        ${isAuthor ? deleteButton : ''}
    </article>
    <div class="like-post" data-like>
    <button class="btn-like" data-like="${post.id}" id="btn-like" >
      <img src="./img/heart.png" alt="like-icon" data-like id="likeBtn" class="" width="15px">
      <span id="likes" data-like>${post.data().likes.length}</span>
    </button>
    </div>
  `;
  postDiv.innerHTML = postTemplate;
  return postDiv;
};
