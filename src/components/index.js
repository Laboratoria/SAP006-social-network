import {
  userData, liked, unLiked,
  deleteDoc, editPost,
} from '../services/index.js';

export const showNewPost = (data) => {
  const user = userData().uid;
  let likesPost = data.like;
  const post = document.createElement('div');
  const postTemplate = `
      <article class="post-feed">
        <header class="header-post">
          <h3 class="post-username" id="${data.name}">${data.name}</h3>
          <h5 class="post-date">${data.date}</h5>
        </header>
        <textarea class="post-message" disabled>${data.message}</textarea>
        <section class="post-buttons">
          <p data-number class="number-likes">${likesPost.length}</p>
          <button data-like="${data.id}" class="btn-like btn"> Like <i class="fas fa-heart"></i></button> 
          <button data-edit="${data.id}" class="btn-edit"> <i class="far fa-edit"></i> </button>
          <button data-save="${data.id}" class="btn-save" style="display:none"> <i class="fas fa-check"></i> </button>
          <button class="btn-bin"> <i class="fas fa-trash"></i> </button>
        </section>
        <div class="modal">
          <div class="modal-container">
            <div class="modal-window">
              <div class="modal-close">X</div>
                <h1>Excluir</h1>
                  <p>Tem certeza que gostaria de excluir o post?</p>
                <button class="modal-yes">Sim</button>
              <button class="modal-no">Não</button>
            </div>
          </div>
        </div>  
      </article>
    `;
  post.innerHTML += postTemplate;

  const likeButton = post.querySelector('.btn-like');
  const binButton = post.querySelector('.btn-bin');
  const editButton = post.querySelector('.btn-edit');
  const saveButton = post.querySelector('.btn-save');
  const postMessage = post.querySelector('.post-message');
  const modal = post.querySelector('.modal');
  const modalYesDelete = post.querySelector('.modal-yes');
  const modalNoDelete = post.querySelector('.modal-no');
  const modalClose = post.querySelector('.modal-close');

  const visibleBtn = () => {
    if (user !== data.user) {
      editButton.style.display = 'none';
      binButton.style.display = 'none';
    }
  };
  visibleBtn();

  likeButton.addEventListener('click', (event) => {
    const { target } = event;
    const likeP = target.previousElementSibling;
    let likeNumber = Number(likeP.innerHTML);
    if (!likesPost.includes(user, data.id)) {
      liked(user, data.id)
        .then(() => {
          likesPost.push(user);
          likeNumber += 1;
          likeP.innerHTML = likeNumber;
        });
    } else {
      unLiked(user, data.id)
        .then(() => {
          likesPost = likesPost.filter((item) => item !== user);
          likeNumber -= 1;
          likeP.innerHTML = likeNumber;
        });
    }
  });

  binButton.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  modalYesDelete.addEventListener('click', () => {
    if (user === data.user) {
      deleteDoc(data.id)
        .then(() => {
          post.remove();
        });
    }
  });
  modalNoDelete.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  editButton.addEventListener('click', () => {
    if (user === data.user) {
      postMessage.removeAttribute('disabled');
      saveButton.style.display = 'inline';
    }
  });

  saveButton.addEventListener('click', () => {
    const editedPostMsg = postMessage.value;
    editPost(editedPostMsg, data.id)
      .then(() => {
        postMessage.setAttribute('disabled', '');
        saveButton.style.display = 'none';
      });
  });

  return post;
};
