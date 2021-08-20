import { deletePost, updatePosts } from '../services/database.js';

export const printPost = (post) => {
  const isMyPost = firebase.auth().currentUser.uid === post.data().user_id
  const areaOfPost = `

    <section data-container data-item>

      <div class="box">
        <div class="header-post">
          <p class="username">username</p>
          <menu class="dropdown"style="float:right;display:${isMyPost ? 'inline-end':'none'}">
            <button id="btn-drop"  class="dropbtn"><span class="iconify" data-icon="ph:dots-three-duotone"></span></button>
            <div id="myDropdown"class="dropdown-content">
              <button class="edit-button" id="edit" value='${post.id}' href="#"><span class="iconify btn-more" data-icon="bytesize:edit"></span>Editar</button>
              <a href="#"><span class="iconify btn-more" data-inline="false"
              data-icon="bytesize:trash" id="delete"></span>  Deletar</a>
              <button id="save" data-post-id = "${post.id}"><span class="iconify btn-more" data-icon="carbon:save"></span></span>Salvar</button>
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
    </section>
  
  `;

  const postTemplate = document.querySelector('#postTemplate');
  postTemplate.innerHTML += areaOfPost;

  updatePosts('4pVdpwtzW4OFz5Lk4xUe', 'banana');


  postTemplate.addEventListener('click', (e) => {
    const target = e.target;
    console.log(target.dataset.like);
    if (target.dataset.like === '') {
      console.log('cliquei no botão de like');
    }
  });

  const btnEdit = postTemplate.querySelector("#edit")
  const btnDelete = postTemplate.querySelector("#delete")
  const btnSave = postTemplate.querySelector("#save")
  const postText = postTemplate.querySelector("#text-post")


  btnEdit.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(postText)
    postText.removeAttribute('disabled', '');
    postText.focus();
  });

  btnSave.addEventListener('click', (e) => {
    e.preventDefault()
    const { postId } = e.target.dataset
    updatePosts(postId, postText.value);
    postText.setAttribute('disabled', '');
  });

  btnDelete.addEventListener('click', (e) => {
    e.preventDefault()
    deletePost(postId)
  })


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

  //   const btnEdit = postTemplate.querySelector('#edit');
    const btnDelete = postTemplate.querySelector('#delete');
  //   const btnSave = postTemplate.querySelector('#save');
  //   const postText = postTemplate.querySelector('#text-post');

  //   btnEdit.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     postText.removeAttribute('disabled');
  //     postText.focus();
  //   });

  //   btnForSave = btnSave.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     postText.setAttribute('disabled', '');
  //     updatePosts(postId, postText.value);
  //   });

  btnDelete.addEventListener('click', (e) => {
    e.preventDefault();
    deletePost(postId);
  });
};
