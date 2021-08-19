import { deletePost, updatePosts } from '../services/database.js';

export const printPost = (post) => {
  const areaOfPost = `
  <section class="all-posts">

    <section data-container>
      <div class="box">
        <div class="header-post">
          <p class="username">username</p>
          <menu class="dropdown"style="float:right;">
            <button id="btn-drop"  class="dropbtn"><span class="iconify" data-icon="ph:dots-three-duotone"></span></button>
            <div id="myDropdown"class="dropdown-content">
              <a class="edit-button" id="edit" value='${post.data().id}' href="#"><span class="iconify btn-more" data-icon="bytesize:edit"></span>  Editar</button>
              <button><span class="iconify btn-more" data-inline="false"
              data-icon="bytesize:trash" id="delete"></span>  Deletar</a>
              <button id="save"><span class="iconify btn-more" data-icon="carbon:save"></span>  Salvar</button>
            </div>
          </menu>
        </div>
        
        <div class="content">
          <button>
            <span class="iconify no-pic" data-inline="false" data-icon="bi:person-circle" style="color: #706F6B;"></span>
          </button>
          
          <div>
            <textarea id="text-post" class="post-content text-post" id="${post.data().id}" disabled>${post.data().text}</textarea>
          </div>
          
        </div>
        <section class="actions">
          <button>13 ❤️</button>
        </section>

      </div>
    </section>
  </section>
  `;

  const postTemplate = document.querySelector('#postTemplate');
  postTemplate.innerHTML += areaOfPost;


  const btnEdit = postTemplate.querySelector("#edit")
  const btnDelete = postTemplate.querySelector("#delete")
  const btnSave = postTemplate.querySelector("#save")
  const postText = postTemplate.querySelector("#text-post")


  btnEdit.addEventListener('click', (e) => {
    e.preventDefault()
    postText.removeAttribute('disabled');;
    postText.focus();
  });

  btnSave.addEventListener('click', (e) => {
    e.preventDefault()
    updatePosts(postId, postText.value);
    postText.setAttribute('disabled', '');
  });
  
  btnDelete.addEventListener('click', (e) => {
    e.preventDefault()
    deletePost(postId)
  })

};
