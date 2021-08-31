import { getUserIdOnLocalStorage } from '../services/index.js';

export const addPost = (post) => {
  const deleteButton = `
    <div id="myModal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <p class="delete-text">Deseja excluir sua publicação?</p>
        <div class="delete-container">
        <button data-deletepost id="delete-post" class="delete-confirm" type="submit">Excluir</button>
        <button class="close-button" id="close-button">Cancelar</button>
        </div>
      </div>
    </div>
    <div class="delete-post">
      <button class="delete-btn" id="delete-btn" type="submit">
      <img src="../img/trash-delete.png" data-delete alt="trash icon" width="27px" />
      </button>
    </div>`;

  const isAuthor = getUserIdOnLocalStorage() === post.data().userId;
  const postDiv = document.createElement('div');
  postDiv.setAttribute('data-id', post.id);

  const postTemplate = `
      <article id="${post.data().createdAt}" class="post">
      <div class="user-perfil" data-user="${post.data().userId}">
        <img src="./img/Perfil.png" alt="user-photo" class="user-photo">
        <h4 class="user-name">@${post.data().userName} - </h4>
        <p class="date-post">${post.data().createdAt}</p>
      </div>
      <div class="post-field">
        <p class="user-post">${post.data().text}</p>
      </div>
      <div class="user-interations">
        ${isAuthor ? deleteButton : ''}
      <div class="like-post" data-like>
       <button class="btn-like" id="btn-like">
        <i class="far fa-heart ${(post.data().likes.includes(getUserIdOnLocalStorage())) ? "fas" : ''} " data-like id="likeBtn"></i>
        <span id="likes" class="likes" data-like="${post.id}">${post.data().likes.length}</span>
       </button>
      </div>
        
      </div>
    </article>
    
  `;
  postDiv.innerHTML = postTemplate;

  return postDiv;
};
