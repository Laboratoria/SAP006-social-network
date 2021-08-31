import { editPost, getUserIdOnLocalStorage } from "../services/index.js";

export const addPost = (post) => {
  const deleteButton = `
  <div class="delete-post">
    <button data-delete class="delete-btn" id="delete-btn" type="submit">
     <img src="../img/trash-delete.png" data-delete alt="trash icon" width="27px" />
    </button>
  </div>`;

  const editButton = `
  <div class="edit-post">
    <button id="confirm-edit" class="confirm-edit" style="display:none">Confirmar</button>
    <button data-edit class="edit-btn" id="edit-btn">
      <img src="./img/pencil-icon.png" data-edit alt="edit-icon" class="edit-icon">
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
      <div class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <p>Falha ao editar post</p>
        </div>
      </div>
        ${isAuthor ? deleteButton : ''}
        ${isAuthor ? editButton : ''}   
    </article>
  `;
  postDiv.innerHTML = postTemplate;

  document.querySelector("[data-postsList]")
    .addEventListener("click", (e) => {
      const target = e.target;
      if (target.dataset.edit === "") {
        const confirmEdit = document.querySelector('#confirm-edit');
        confirmEdit.style.display = 'inline';
        const editArea = document.querySelector('.user-post');
        const postField = document.querySelector('.post-field');
        postField.setAttribute('id', 'edit-area');
        editArea.setAttribute('contentEditable', 'true');

        confirmEdit.addEventListener('click', () => {
          editArea.removeAttribute('contentEditable');
          postField.removeAttribute('id');
          const newText = editArea.textContent;
          const getPost = target.parentNode.parentNode.parentNode.parentNode;
          const postId = getPost.getAttribute('data-id');
          editPost(newText, postId)
            .then(() => {
              confirmEdit.style.display = 'none'
            }).then(() => {
              const modal = document.querySelector('.modal')
              const close = document.querySelector('.close')
              modal.style.display = "block";
              close.onclick = () => {
                modal.style.display = "none";
              }
            })
        })
      }
    })

  return postDiv;
};
