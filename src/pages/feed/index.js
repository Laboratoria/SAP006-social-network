import { loadRecipe } from '../../services/index.js';
import header from '../../components/header/index.js';
import { addPost } from '../../components/post/index.js';
import footer from '../../components/footer/index.js';
import errorModal from '../../components/error/index.js';

export default () => {
  const feedContainer = document.createElement('div');
  feedContainer.setAttribute('class', 'screenContainer');

  feedContainer.append(header());

  const feedSection = document.createElement('section');
  feedSection.setAttribute('class', 'feedSection');

  feedSection.innerHTML = `
    <div>
      <h2 id="recipes-title" class="title">Receitas</h2>
      <div class="loading">
      <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
    </div>
    <div class="overlay"></div>
  `;

  const overlay = feedContainer.querySelector('.overlay');

  loadRecipe()
    .then((querySnapshot) => {
      feedSection.querySelector('.loading').innerHTML = '';
      querySnapshot.forEach((post) => {
        feedSection.append(addPost(post));
      });
    })
    .catch((error) => {
      overlay.classList.add('active');
      feedContainer.append(errorModal());
      throw Error(error);
    });

  const body = document.querySelector('body');
  const footerTag = body.querySelector('footer');

  if (footerTag === null) {
    body.appendChild(footer());
  }

  feedContainer.append(feedSection);
  return feedContainer;
};
