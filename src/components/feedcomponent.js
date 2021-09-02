import { updatePosts } from '../services/database.js';
import { sendLike } from './like.js';
import { deletePopUp } from './popup.js';

export const printPost = (snap) => {
  const postTemplate = document.querySelector('#postTemplate');

  snap.forEach((post) => {
    const isMyPost = firebase.auth().currentUser.uid === post.data().user_id;

    const areaOfPost = `
    <section class="container-areaPost" data-container="${post.id}" id="${post.id}>
      <div class="box">
        <div class="header-post">
          <p class="username">username</p>
          
          <menu class="dropdown" style="float:right; display:${isMyPost ? 'inline-end' : 'none'}">
            <button id="btn-drop"  class="dropbtn">
              <span class="iconify" data-icon="ph:dots-three-duotone"></span>
            </button>
            <div id="myDropdown" class="dropdown-content">
              <button data-edit="${post.id}" class="edit-button dropbtn">
                <span class="iconify btn-more" data-icon="bytesize:edit"></span>
                Editar
              </button>
              <button data-delete="${post.id}" class="delete-button dropbtn">
                <span class="iconify btn-more" data-inline="false" data-icon="bytesize:trash"></span> 
                Deletar
              </button>
              <button data-save="${post.id}" class="save-button dropbtn">
                <span class="iconify btn-more" data-icon="carbon:save"></span>
                Salvar
              </button>
            </div>
          </menu>
        </div>
        
        <div class="align-post-like">
          <div class="content">
              <textarea id="text-post"
                data-textpost="${post.id}
                class="post-content text-post"
                id="${post.id}"
                disabled>${post.data().text}
          </textarea>
         
          </div>
          <section class="actions" data-section display:${isMyPost ? 'inline-end' : 'none'}>
            <p data-numLike='${post.id}' class='numLikes'>${post.data().likes.length || 0}</p>
            <button class="btn-like"><i id="${post.id}" data-like='${post.id}' class='far fa-heart'></i></button>
          </section>
        </div>
      </div>
    </section>
  `;

    postTemplate.innerHTML += areaOfPost;
  });

  const postContainer = document.querySelector('[data-postcontainer]');

  postContainer.addEventListener('click', (e) => {
    const { target } = e;
    const userId = firebase.auth().currentUser.uid;

    const editButton = target.dataset.edit;
    const saveButton = target.dataset.save;
    const deleteButton = target.dataset.delete;
    const likeButton = target.dataset.like;

    const postText = target.parentNode.parentNode.parentNode.parentNode.querySelector('[data-textpost]');

    if (editButton) {
      postText.removeAttribute('disabled');
      postText.focus();
    }
    if (saveButton) {
      const postId = e.target.dataset.save;
      updatePosts(postId, postText.value)
        .then(() => postText.setAttribute('disabled', ''));
    }
    if (deleteButton) {
      const postId = e.target.dataset.delete;
      deletePopUp(postId, postContainer);
    }
    if (likeButton) {
      const likeId = e.target.dataset.like;
      const likeCount = postTemplate.querySelector(`[data-numLike="${likeId}"]`);
      const likeIcon = postTemplate.querySelector(`.btn-like i[data-like="${likeId}"]`);
      sendLike(likeId, userId, likeCount, likeIcon);
    }
  });
};
