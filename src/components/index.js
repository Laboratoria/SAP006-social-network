import { userData, liked, unLiked } from '../services/index.js';

export const showNewPost = (data) => {
  const user = userData().uid;
  // console.log(data.id);
  let likesPost = data.like;
  const post = document.createElement('div');
  const postTemplate = `
      <div class="post-feed">
        <div class="header-post">
          <h3>${data.name}</h3>
          <h5>${data.date}</h5>
        </div>
        <p>${data.message}</p>
        <p data-number>${likesPost.length}</p>
        <button data-like="${data.id}" class="btn-like">Like</button>
        <button class="btn-edit"> Editar </button>
        <button class="btn-bin"> Excluir </button>
      </div>
    `;
  post.innerHTML += postTemplate;

  const likeButton = post.querySelector('.btn-like');
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
    // let likes = getPost(postId).like;
    // getPost(postId)
    // if (!likesPost.includes(user)) {
    //   likesPost = data.like.filter(() => data.id !== user);
    // } else {
    //   likes.push(uid);
    // }
    // getPost(postId).like = likes;
  });
  return post;
};
