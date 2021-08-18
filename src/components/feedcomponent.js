import { updatePosts } from '../services/database.js';

export const printPost = (post) => {
  const areaOfPost = `

    <section data-container data-item>

      <div class="box">
        <div class="header-post">
          <p class="username">username</p>
          <menu class="dropdown" style="float:right;">
            <button id="btn-drop" onclick="dropdownFunction()" class="dropbtn"><span class="iconify" data-icon="ph:dots-three-duotone"></span></button>
            <div id="myDropdown" class="dropdown-content">
              <a class="edit-button" id="edit" value='${post.data().id}' href="#"><span class="iconify btn-more" data-icon="bytesize:edit"></span>  Editar</a>
              <a href="#"><span class="iconify btn-more" data-inline="false"
              data-icon="bytesize:trash"></span>  Deletar</a>
              <a href="#"><span class="iconify btn-more" data-icon="carbon:save"></span></span>  Salvar</a>
            </div>
          </menu>
        </div>
        
        <div class="content">
          <button>
            <span class="iconify no-pic" data-inline="false" data-icon="bi:person-circle" style="color: #706F6B;"></span>
          </button>
          
          <div>
            <textarea maxlength="200" name="post-text" class="post-content text-post" id="${post.data().id}">${post.data().text}</textarea>
          </div>
        </div>

        <section class="actions">
          <button class="btn-like" data-like>${post.likes} ❤️</button>
        </section>

    </section>

  `;

  const postTemplate = document.querySelector('#postTemplate');
  postTemplate.innerHTML += areaOfPost;

  updatePosts('4pVdpwtzW4OFz5Lk4xUe', 'banana');

  const editButton = postTemplate.querySelector('.edit-button');
  editButton.addEventListener('click', () => {
    const valueText = areaOfPost.querySelector('.post-content text-post').value;
    console.log(valueText);
  });

  postTemplate.addEventListener('click', (e) => {
    console.log(e);
    // const { target } = e;

  });

  // console.log(likeButton);
  // likeButton.addEventListener('click', (e) => {
  //  // user_id.currentUser --> insere no array de likes;
  //  // precisa de condicional para like e dislike (se no
  //  // clique do botaõ, existe o uid do current, coloca e vice versa)--> ternário?
  // precisa de toggle, precisa de postId
  //  // metodo union e remove do firebase
  //  // remover firebase.firestore.FieldValue.arrayRemove 
  //  // firebase.firestore.FieldValue.arrayUnion 
  // });

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
