import { getLikes, likePost, unlikePost } from '../services/database.js';

export const sendLike = (likeIcon, userId, likeButton) => {
  const numLikeArray = document.querySelector('[data-numLike]');
  const likesNumber = Number(numLikeArray.innerText);

  getLikes(likeIcon)
    .then((posts) => {
      const postData = posts.data();
      if (!postData.likes.includes(userId)) {
        likePost(userId, likeIcon)
          .then(() => {
            numLikeArray.innerText = likesNumber + 1;
            likeButton.classList.replace('far', 'fas');
          })
          .catch('error');
      } else {
        unlikePost(userId, likeIcon)
          .then(() => {
            numLikeArray.innerText = likesNumber - 1;
            likeButton.classList.replace('fas', 'far');
          })
          .catch('error');
      }
    });
};
