import { loadRecipe } from '../../services/index.js';
import header from '../../components/header/index.js';
import footer from '../../components/footer/index.js';
import { addPost } from '../../components/post/index.js';

export default () => {
  const feedContainer = document.createElement('div');
  feedContainer.setAttribute('class', 'screenContainer');

  feedContainer.append(header());

  const feedSection = document.createElement('section');

  // const idLikes = feedContainer.querySelectorAll('.recipeLikes');
  // for (const btnLike of idLikes) {
  //   btnLike.addEventListener('click', (e) => {
  //     likesPost(e.currentTarget.parentNode.id);
  //   })
  // };

  loadRecipe()
    .then((querySnapshot) => {
      querySnapshot.forEach((post) => {
        feedSection.append(addPost(post));
      });
    });

  feedContainer.append(feedSection);

  feedContainer.append(footer());
  return feedContainer;
};
