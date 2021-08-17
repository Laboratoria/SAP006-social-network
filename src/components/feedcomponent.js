import { updatePosts } from '../services/database.js';

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

  updatePosts('mkMwk3swH4UqsTApHpWy', 'post editado');

  const editButton = postTemplate.querySelector('.edit-button');
  editButton.addEventListener('click', () => {
    const valueText = areaOfPost.querySelector('.post-content text-post').value;
    console.log(valueText);
  });

  // const eachPost = `
  //   <textarea name="post-text" class="post-content text-post"
  // id="${post.data().id}">${post.data().text}</textarea>
  //   <section class="actions">
  //     <button>❤️ ${post.likes}</button>
  //   </section>
  // `;

  // const textBox = document.querySelector('.textBox');
  // const showEachPost = textBox.appendChild(eachPost);
  // showEachPost.forEach((posts) => { // com o resultado itera no post
  //   console.log(post);
  //   printPost(posts); // chama printPost com o que foi retornado, no caso é posts
  // });

  // postTemplate.innerHTML += textBox;

  //     <div class="btn-inside">
//   <button class="btn-actions"><span class="iconify" data-inline="false"
//   data-icon='ri:image-add-fill'></span>
// </button>
// <button class="btn-actions"><span class="iconify" data-inline="false"
//   data-icon="mdi:send-circle"></span>
// </button>
// </div>

  
 // const dropdown = document.querySelector('#btn-drop');
  // dropdown.addEventListener('click', () => {
  //     function myFunction() {
  //   document.getElementById("myDropdown").classList.toggle("show");
  //   }
  // })
  // // Close the dropdown if the user clicks outside of it
  // window.onclick = function(event) {
  //   if (!event.target.matches('.dropbtn')) {
  //     const dropdowns = document.getElementsByClassName("dropdown-content");
  //     const i
  //     for (i = 0; i < dropdowns.length; i++) {
  //       const openDropdown = dropdowns[i];
  //       if (openDropdown.classList.contains('show')) {
  //         openDropdown.classList.remove('show');
  //       }
  //     }
  //   }
  // }
  
  /*

  const elementPost = addPost(post);
  rootElement.querySelector('#get-post').appendChild(elementPost)
   */

  // const editPost = () => {
  //   const valueInput = document.querySelector('.area-edit').value;
  //   const posts = document.querySelector('all-posts');
  //   updatePost(valueInput, posts)
  //     .then(() => {
  //       const containerEditText = document.querySelector('.edit-text');
  //       containerEditText.style.display = 'block';
  //       const areaForEdit = document.querySelector('.area-edit');
  //       const divTextPublished = document.querySelector('.text-published');
  //       const textReady = document.querySelector('.text-published').innerHTML;

  //       divTextPublished.style.display = 'none';

  //       areaForEdit.value = textReady;
  //     })
  //     .catch((error) => {
  //       console.log('Não foi', error);
  //     });
  // };

  // ;

  // const saveUpdatedPost = () => {
  //   const valueInput = document.querySelector('.area-edit').value;
  //   const divTextPublished = document.querySelector('.text-published');
  //   document.querySelector('.text-published');
  //   const containerEdit = document.querySelector('.edit-text');

  //   containerEdit.style.display = 'none';
  //   divTextPublished.style.display = 'block';

  //   divTextPublished.innerHTML = valueInput;
  // };

  // document.querySelector('.save-button').addEventListener('click', () => {
  //   saveUpdatedPost();
  // });
};
