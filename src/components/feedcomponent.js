import { deletePost, updatePosts } from '../services/database.js';

export const printPost = (post) => {
  const areaOfPost = `
  <section class="all-posts">

    <section data-container>
      <div class="box">
        <p class="username">username</p>
        <menu class="dropdown" style="float:right;">
          <button id="btn-drop" onclick="myFunction()" class="dropbtn"><span class="iconify" data-icon="ph:dots-three-duotone"></span></button>
          <div id="myDropdown" class="dropdown-content">
            <a class="btn-more edit-button" id="edit" value='${post.data().id}' href="#"><span class="iconify" data-icon="bytesize:edit"></span>  Editar</a>
            <a class="btn-more" href="#"><span class="iconify" data-icon="carbon:save"></span>Salvar</a>
            <a class="btn-more" href="#"><span class="iconify" data-inline="false"
            data-icon="bytesize:trash"></span>  Deletar</a>
          </div>
        </menu>
        <div class="content">
          <button>
            <span class="iconify no-pic" data-inline="false" data-icon="bi:person-circle"
              style="color: #706F6B;"></span>
          </button>
          
        <div class="textBox"></div>
          <textarea name="post-text" class="post-content text-post" id="${post.data().id}">${post.data().text}</textarea>
          <section class="actions">
            <button>❤️ ${post.likes}</button>
          </section>
        </div>

        <!---
        <section class='edit-text'>
          <div class='edit-btn-area'>
            <button id="edit" class="edit-button" value='${post.data().id}'>Editar post</button>
          </div>
        </section>
        -->

      </div>
    </section>
  </section>
  `;

  const postTemplate = document.querySelector('#postTemplate');
  postTemplate.innerHTML += areaOfPost;

  updatePosts('P5cF2qP39My2DWChCzvF', 'foi editado aeeee!!!!');

  deletePost()

  const editButton = postTemplate.querySelector('#edit');
  editButton.addEventListener('click', () => {
    const valueText = areaOfPost.querySelector('.post-content text-post').value;
    console.log(valueText);
  });

}