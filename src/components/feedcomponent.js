import {
  deletePost, updatePosts, likePost, unlikePost, getLikes,
} from '../services/database.js';

export const printPost = (post) => {
  const isMyPost = firebase.auth().currentUser.uid === post.data().user_id;

  const areaOfPost = `
    <section class="container-areaPost" data-container="${post.id}" id="${post.id}>
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
              <textarea id="text-post" class="post-content text-post" id="${post.id}" disabled>${post.data().text}</textarea>
         
          </div>
          <section class="actions" data-section>
            <p data-numLike='numLike-${post.id}' class='numLikes'>${post.data().likes.length || 0}</p>
            <button class="btn-like"><i id="${post.id}" data-like='${post.id}' class='far fa-heart'></i></button>
          </section>
        </div>

        <section class="actions">
          <button class="btn-like" data-like>5 ❤️</button>
        </section>
        
      </div>
    </section>
  `;

  const postTemplate = document.querySelector('#postTemplate');
  postTemplate.innerHTML += areaOfPost;

  /*
  postTemplate.addEventListener('click', (e) => {
    const target = e.target;
    console.log(target.dataset.like);
    if (target.dataset.like === '') {
      console.log('cliquei no botão de like');
    }
  });
*/
  
  const btnEdit = postTemplate.querySelector('[data-edit]');
  const btnDelete = postTemplate.querySelector('[data-delete]');
  const btnSave = postTemplate.querySelector('[data-save]');
  const postText = postTemplate.querySelector('#text-post');

  const datasection = postTemplate.querySelector('[data-section]');

  const postContainer = postTemplate.querySelector('[data-container]');

  postContainer.addEventListener('click', (e) => {
    const { target } = e;
    const editButton = target.dataset.edit;
    const saveButton = target.dataset.save;
    const deleteButton = target.dataset.delete;
    const postText = document.querySelector('[data-textpost]');

  btnSave.addEventListener('click', (e) => {
    e.preventDefault();
    const postId = e.target.dataset.save;
    updatePosts(postId, postText.value);
    postText.setAttribute('disabled', '');

    if (editButton) {
      postText.removeAttribute('disabled');
      postText.focus();
    }
    if (saveButton) {
      const postId = e.target.dataset.save;
      updatePosts(postId, postText.value);
      postText.setAttribute('disabled', '');
    }
    if (deleteButton) {
      const postId = e.target.dataset.delete;
      deletePopUp(postId, postContainer);
    }
  });

  // UM EVENTLISTENER PRA CADA BOTÃO //
  const deletePopUp = (postId, post) => {
    const popUpContainer = document.createElement('div');

    popUpContainer.innerHTML = `
      <div class='popup-wrapper' data-popup>
          <div class='popup'>
            <div class='popup-content'>
              <h3>Tem certeza que deseja apagar esse post?</h3>
                <button id='yes' data-confirm class='yes answer'>DELETAR</button>
                <button id='no' data-cancel class='no answer'>CANCELAR</button>
            </div>
          </div>
        </div>
    `;
    postTemplate.appendChild(popUpContainer);

    const popUpWrapper = postTemplate.querySelector('.popup-wrapper');
    popUpWrapper.style.display = 'block';

    const confirmButton = document.querySelector('[data-confirm]');
    confirmButton.addEventListener('click', () => {
      deletePost(postId)
        .then(post.remove());
      popUpWrapper.style.display = 'none';

    });

    const cancelButton = document.querySelector('[data-cancel]');
    cancelButton.addEventListener('click', () => {
      popUpWrapper.style.display = 'none';
    });
  };

  datasection.addEventListener('click', (e) => {
    console.log('clicou');
    const { target } = e;
    const postId = target.dataset.like;
    console.log(postId);
    const userId = firebase.auth().currentUser.uid;
    const likeIcon = postTemplate.querySelector('[data-like]');
    function sendLike() {
      const numLikeArray = postTemplate.querySelector('[data-numLike]');
      const likesNumber = Number(numLikeArray.innerText);
      getLikes(postId).then((posts) => {
        if (!posts.data().likes.includes(userId)) {
          likePost(userId, postId)
            .then(() => {
              numLikeArray.innerText = likesNumber + 1;
              likeIcon.classList.replace('far', 'fas');
            })
            .catch('error');
        } else {
          unlikePost(userId, postId)
            .then(() => {
              numLikeArray.innerText = likesNumber - 1;
              likeIcon.classList.replace('fas', 'far');
            })
            .catch('error');
        }
      });
    }
    if (target) { sendLike(); }
  });
};

// const deletePopUp = () => {
//   const root = document.querySelector('#root');
//   const popUpContainer = document.createElement('div');

//   popUpContainer.innerHTML = `
//     <div class='popup-wrapper' data-popup>
//         <div class='popup'>
//           <div class='popup-content'>
//             <h3>Tem certeza que deseja apagar esse post?</h3>
//               <button id='yes' data-answer="yes" class='yes answer'>DELETAR</button>
//               <button id='no' data-answer="no" class='no answer'>CANCELAR</button>
//           </div>
//         </div>
//       </div>
//   `;
//   root.appendChild(popUpContainer);

//   const popUpWrapper = root.querySelector('.popup-wrapper');
//   popUpWrapper.style.display = 'block';

//   const deleteButton = document.querySelector('[data-answer]');

//   deleteButton.addEventListener('click', (e) => {
//     const userAnswer = e.target.dataset.answer;
//     console.log(userAnswer);

//     if (userAnswer === 'yes') {
//       deletePost();
//       // document.querySelector('[data-container]').remove();
//       popUpWrapper.style.display = 'none';
//     } else {
//       popUpWrapper.style.display = 'none';
//     }
//   });
//   return root;
// };

};
