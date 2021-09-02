import { getLikes, likePost, unlikePost } from '../services/database.js';

export const sendLike = (postId, userId, likeButton) => {
  const numLikeArray = document.querySelector('[data-numLike]');
  const likesNumber = Number(numLikeArray.innerText);

  getLikes(postId)
    .then((posts) => {
      const postData = posts.data();
      if (!postData.likes.includes(userId)) {
        likePost(userId, postId)
          .then(() => {
            numLikeArray.innerText = likesNumber + 1;
            likeButton.classList.replace('far', 'fas');
          })
          .catch('error');
      } else {
        unlikePost(userId, postId)
          .then(() => {
            numLikeArray.innerText = likesNumber - 1;
            likeButton.classList.replace('fas', 'far');
          })
          .catch('error');
      }
    });
};
