import { getLikes, likePost, unlikePost } from '../services/database.js';

export const sendLike = (likeId, userId, likeCount, likeIcon) => {
  const likesNumber = Number(likeCount.innerText);
  console.log(likeCount.nextSibling);
  getLikes(likeId)
    .then((posts) => {
      const postData = posts.data();
      if (!postData.likes.includes(userId)) {
        likePost(userId, likeId)
          .then(() => {
            likeCount.innerText = likesNumber + 1;
            likeIcon.classList.replace('far', 'fas');
          })
          .catch('error');
      } else {
        unlikePost(userId, likeId)
          .then(() => {
            likeCount.innerText = likesNumber - 1;
            likeIcon.classList.replace('fas', 'far');
          })
          .catch('error');
      }
    });
};
