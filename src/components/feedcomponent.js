import { updatePosts, likePost, unlikePost } from '../services/database.js';
import { deleteConfirm } from './popup.js';

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
            <div id="text-post"
              data-textpost="${post.id}"
              class="post-content text-post"
              id="${post.id}">${post.text}
            </div>
        </div>
        <section class="actions" data-section style="display:${isMyPost ? 'none' : 'inline-end'}">
          <p data-numLike='${post.id}' class='numLikes'>${post.likes.length}</p>
          <button class="btn-like"><i id="${post.id}" data-like='${post.id}' class='far fa-heart'></i></button>
        </section>
      </div>
    </div>
  `;

  postTemplate.innerHTML = areaOfPost;

  const userId = firebase.auth().currentUser.uid;
  const likeBtn = postTemplate.querySelector('.btn-like');
  const editButton = postTemplate.querySelector(`[data-edit="${post.id}"]`);
  const saveButton = postTemplate.querySelector(`[data-save="${post.id}"]`);
  const deleteButton = postTemplate.querySelector(`[data-delete="${post.id}"]`);
  const postText = postTemplate.querySelector(`[data-textpost="${post.id}"]`);
  console.log(postText.innerText);

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

  editButton.addEventListener('click', () => {
    postText.setAttribute('contentEditable', '');
    postText.focus();
  });

  saveButton.addEventListener('click', () => {
    updatePosts(post.id, postText.innerText)
      .then(() => postText.removeAttribute('contentEditable', ''));
  });

  deleteButton.addEventListener('click', () => {
    const postArea = document.querySelector(`[data-container="${post.id}"]`);
    deleteConfirm(post.id, postArea);
  });

  return postTemplate;
};
