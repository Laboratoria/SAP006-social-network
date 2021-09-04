import { updatePosts, likePost, unlikePost } from '../services/database.js';
import { deletePopUp } from './popup.js';

export const printPost = (post) => {
  const likeArray = post.likes;

  const postTemplate = document.createElement('section');
  postTemplate.setAttribute('class', 'container-areaPost');
  postTemplate.setAttribute('data-container', post.id);
  postTemplate.setAttribute('id', post.id);

  const isMyPost = firebase.auth().currentUser.uid === post.user_id;

  const areaOfPost = `
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
              disabled>${post.text}
            </textarea>
        </div>
        <section class="actions" data-section display:${isMyPost ? 'inline-end' : 'none'}>
          <p data-numLike='${post.id}' class='numLikes'>${post.likes.length || 0}</p>
          <button class="btn-like"><i id="${post.id}" data-like='${post.id}' class='far fa-heart'></i></button>
        </section>
      </div>
    </div>
  `;

  postTemplate.innerHTML = areaOfPost;

  const userId = firebase.auth().currentUser.uid;
  const likeBtn = postTemplate.querySelector('.btn-like');

  likeBtn.addEventListener('click', () => {
    const likeCount = postTemplate.querySelector(`[data-numLike="${post.id}"]`);
    const likeIcon = postTemplate.querySelector(`.btn-like i[data-like="${post.id}"]`);
    const likesNumber = Number(likeCount.innerText);

    if (!likeArray.includes(userId)) {
      likePost(userId, post.id)
        .then(() => {
          likeArray.push(userId);
          likeCount.innerText = likesNumber + 1;
          likeIcon.classList.replace('far', 'fas');
        })
        .catch('error');
    } else {
      unlikePost(userId, post.id)
        .then(() => {
          const likeIndex = likeArray.indexOf(userId);
          likeArray.splice(likeIndex, 1);
          likeCount.innerText = likesNumber - 1;
          likeIcon.classList.replace('fas', 'far');
        })
        .catch('error');
    }
  });

  postTemplate.addEventListener('click', (e) => {
    const editButton = postTemplate.querySelector('.edit-button dropbtn');
    const saveButton = postTemplate.querySelector('.save-button dropbtn');
    const deleteButton = postTemplate.querySelector('.delete-button dropbtn');

    const postText = postTemplate.querySelector('[data-textpost]');

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
      const postArea = document.querySelector(`[data-container="${postId}"]`);
      deletePopUp(postId, postArea);
    }
  });

  return postTemplate;
};
