import { deletePost, updatePosts } from '../services/database.js';

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
              <textarea id="text-post"
                class="post-content text-post"
                id="${post.id}" disabled>${post.data().text}
              </textarea>
          </div>
          <section class="actions">
          <p data-numLike="${post.id}">${post.data().likes.length || 0}</p>
            <button class="btn-like"><span data-like="${post.id}" class="iconify heart" data-icon="icon-park-outline:like" style="color: red;"></span></button>
          </section>
        </div>
        
      </div>
    </section>
  `;

  const postTemplate = document.querySelector('#postTemplate');
  postTemplate.innerHTML += areaOfPost;

  const btnEdit = postTemplate.querySelector('[data-edit]');
  const btnDelete = postTemplate.querySelector('[data-delete]');
  const btnSave = postTemplate.querySelector('[data-save]');
  const postText = postTemplate.querySelector('#text-post');

  btnEdit.addEventListener('click', (e) => {
    e.preventDefault();
    postText.removeAttribute('disabled');
    postText.focus();
  });

  btnSave.addEventListener('click', (e) => {
    e.preventDefault();
    const postId = e.target.dataset.save;
    console.log(postId);
    updatePosts(postId, postText.value);
    postText.setAttribute('disabled', '');
  });

  // UM EVENTLISTENER PRA CADA BOTÃO //

  // eslint-disable-next-line no-shadow
  const deletePopUp = () => {
    const popUpContainer = document.createElement('div');

    popUpContainer.innerHTML = ` 
      <div class='popup-wrapper' data-popup>
          <div class='popup'>
            <div class='popup-content'>
              <h3>Tem certeza que deseja apagar esse post?</h3>
                <button id='yes' data-delete class='yes answer'>DELETAR</button>
                <button id='no' data-cancel class='no answer'>CANCELAR</button>
            </div>                
          </div>
        </div>
    `;
    postTemplate.appendChild(popUpContainer);

    const popUpWrapper = postTemplate.querySelector('.popup-wrapper');
    popUpWrapper.style.display = 'block';

    const confirmButton = document.querySelector('[data-delete]');
    confirmButton.addEventListener('click', (e) => {
      const idDelete = e.target.dataset.delete;
      console.log(idDelete);
      deletePost(idDelete);
    });

    const cancelButton = document.querySelector('[data-cancel]');
    cancelButton.addEventListener('click', () => {
      popUpWrapper.style.display = 'none';
    });

    return postTemplate;
  };

  btnDelete.addEventListener('click', () => {
    deletePopUp();
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
