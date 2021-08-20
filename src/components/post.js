import { currentUser, editPost } from "../services/index.js";

export const addPost = (post) => {
  const postDiv = document.createElement('div');
  postDiv.setAttribute('data-id', post.id);
  const postTemplate = `
    <div id="${post.data().createdAt}" data-div class="post">
      <div class="user-perfil">
        <img src="./img/Perfil.png" alt="user-photo" class="user-photo">
        <h4 class="user-name">@${post.data().userName}</h4>
      </div>
      <article class="post-field">
        <p class="user-post">${post.data().text}</p>
      </article>
      <div class="edit-post" style="display:none">
        <button id="confirm-edit" class="confirm-edit" style="display:none">Confirmar</button>
        <button data-edit class="edit-btn" id="edit-btn">
          <img src="./img/pencil-icon.png" data-edit alt="edit-icon" class="edit-icon">
        </button>
      </div>
      <div class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <p>Falha ao editar post</p>
        </div>
      </div>
    </div>
  `;
  postDiv.innerHTML = postTemplate;
  const userId = currentUser().uid

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
            }).catch(() => {
              const modal = document.querySelector('.modal')
              const close = document.querySelector('.close')
              modal.style.display = "block";
              close.onclick = () => {
                modal.style.display = "none";
              }
              //window.onclick = (e) => {
              //  if(e.target === modal){
              //    modal.style.display = "none";
              //  }
              //}
            })
        })
      }
    })

  return postDiv;
};
