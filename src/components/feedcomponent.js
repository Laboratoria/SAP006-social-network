import { deletePost, updatePosts } from "../services/database.js";

export const printPost = (post) => {
  const isMyPost = firebase.auth().currentUser.uid === post.data().user_id;

  const areaOfPost = `
    <section data-container="${post.id}" id="${post.id}>
      <div class="box">
        <div class="header-post">
          <p class="username">username</p>
          <menu
            class="dropdown" 
            style="float:right; display:${isMyPost ? 'inline-end' : 'none'}">

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
            <textarea id="text-post"
              class="post-content text-post"
              id="${post.id}" disabled>${post.data().text}
            </textarea>
          </div>
        </div>

        <section class="actions">
          <button class="btn-like" data-like>5 ❤️</button>
        </section>

      </div>
    </section>
  `;

  const postTemplate = document.querySelector("#postTemplate");
  postTemplate.innerHTML += areaOfPost;

  postTemplate.addEventListener('click', (e) => {
    const target = e.target;
    console.log(target.dataset.like);
    if (target.dataset.like === "") {
      console.log("cliquei no botão de like");
    }
  });

  const btnEdit = postTemplate.querySelector('[data-edit]')
  const btnDelete = postTemplate.querySelector('[data-delete]')
  const btnSave = postTemplate.querySelector('[data-save]')
  const postText = postTemplate.querySelector("#text-post")

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
      // deletePost(postId);
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
};

// NÃO TÁ PEGANDO O POST-ID //

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

// btnDelete.addEventListener('click', () => {
//   deletePopUp();
// });
// };
