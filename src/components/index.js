import {
  userData, liked, unLiked, editPost,
} from '../services/index.js';

export const showNewPost = (data) => {
  const user = userData().uid;
  // console.log(data.id);
  let likesPost = data.like;
  const post = document.createElement('div');
  const postTemplate = `
      <article class="post-feed">
        <header class="header-post">
          <h3 class="post-username">${data.name}</h3>
          <h5 class="post-date">${data.date}</h5>
        </header>
        <textarea class="post-message" disabled>${data.message}</textarea>
        <section>
          <p data-number>${likesPost.length}</p>
          <button data-like="${data.id}" class="btn-like">Like</button>
          <button data-edit="${data.id}" class="btn-edit"> Editar </button>
          <button data-save="${data.id}" class="btn-save" style="display:none"> Salvar </button>
          <button class="btn-bin"> Excluir </button>
        </section>
      </article>
    `;
  post.innerHTML += postTemplate;

  const likeButton = post.querySelector('.btn-like');
  const editButton = post.querySelector('.btn-edit');
  const saveButton = post.querySelector('.btn-save');
  const postMessage = post.querySelector('.post-message');

  likeButton.addEventListener('click', (event) => {
    const { target } = event;
    const likeP = target.previousElementSibling;
    let likeNumber = Number(likeP.innerHTML);
    // const btnLike = target.dataset.like;
    // liked(user, data.id);
    // unLiked(user, data.id);
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
