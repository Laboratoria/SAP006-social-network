import { deletePost, updatePosts } from '../services/database.js';

export const printPost = (post) => {
  const isMyPost = firebase.auth().currentUser.uid === post.data().user_id
  const areaOfPost = `

    <section data-container>

      <div class="box">
        <div class="header-post">
          <p class="username">username</p>
          <menu
            class="dropdown" 
            style="float:right; display:${isMyPost ? 'inline-end':'none'}">

            <button id="btn-drop"  class="dropbtn">
              <span class="iconify" data-icon="ph:dots-three-duotone"></span>
            </button>

            <div id="myDropdown" class="dropdown-content">
              <button data-edit="${post.id}" class="edit-button">
                <span class="iconify btn-more" data-icon="bytesize:edit"></span>
                Editar
              </button>
              <button data-delete="${post.id}" class="delete-button">
                <span class="iconify btn-more" data-inline="false" data-icon="bytesize:trash"></span> 
                Deletar
              </button>
              <button data-save="${post.id}" class="save-button">
                <span class="iconify btn-more" data-icon="carbon:save"></span>
                Salvar
              </button>
            </div>
          </menu>
        </div>
        
        <div class="content">
          <button>
            <span class="iconify no-pic" data-inline="false" data-icon="bi:person-circle" style="color: #706F6B;"></span>
          </button>
          
          <div>
            <textarea id="text-post" class="post-content text-post" id="${post.id}" disabled>${post.data().text}</textarea>
          </div>
        </div>
        <section class="actions">
          <button class="btn-like" data-like>5 ❤️</button>
        </section>
      </div>

      <div class="popup-wrapper">
        <div class="popup">
          <div class="popup-close" style="display:none">X</div>
            <div class="popup-content">
            </div>
        </div>
      </div>

    </section>
  `;

  const postTemplate = document.querySelector('#postTemplate');
  postTemplate.innerHTML += areaOfPost;

 
  const btnEdit = postTemplate.querySelector('[data-edit]')
  const btnDelete = postTemplate.querySelector('[data-delete]')
  const btnSave = postTemplate.querySelector('[data-save]')
  const postText = postTemplate.querySelector("#text-post")


  btnEdit.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(postText);
    postText.removeAttribute('disabled');
    postText.focus();
  });

  btnSave.addEventListener('click', (e) => {
    e.preventDefault();
    const { postId } = e.target.dataset;
    updatePosts(postId, postText.value);
    postText.setAttribute('disabled', '');
  });

  btnDelete.addEventListener('click', (e) => {
    // e.preventDefault();
    const { delete: deleteId } = e.target.dataset;
    // deletePost(postId)
    // .then(() => {
      deletePopUp();
    // });
  });
};


const deletePopUp = () => {
  const popup = postTemplate.querySelector('.popup-wrapper');
  popup.style.display = 'block';

  const closePopUp = postTemplate.querySelector('.popup-close');
  closePopUp.style.display = 'block';

  const contentPopUp = postTemplate.querySelector('.popup-content');
  contentPopUp.innerHTML = `
    <h2>Tem certeza que deseja deletar esse post?</h2> 
    <button class="delete-class">Deletar</button>
  `

  closePopUp.addEventListener("click", () => {
    popup.style.display = 'none';
  });

  const popUpDeleteButton = postTemplate.querySelector('.delete-class');

  popUpDeleteButton.addEventListener('click', () => {
    deletePost()
    .then(() => {
      postTemplate.innerHTML = '';
    });

  });
};
