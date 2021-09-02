import { loadRecipe } from '../../services/index.js';
import header from '../../components/header/index.js';
import footer from '../../components/footer/index.js';
import { addPost } from '../../components/post/index.js';

export default () => {
  const feedContainer = document.createElement('div');
  feedContainer.setAttribute('class', 'screenContainer');

  feedContainer.append(header());

  const feedSection = document.createElement('section');
  feedSection.setAttribute('class', 'feedSection');

  feedSection.innerHTML = `
    <h2 id="recipes-title" class="title">Receitas</h2>
    <div class="loading">
    <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
    </div>
  `;

  loadRecipe()
    .then((querySnapshot) => {
      feedSection.querySelector('.loading').innerHTML = '';
      querySnapshot.forEach((post) => {
        feedSection.append(addPost(post));
      });
    })
    .then(() => {
      feedContainer.append(footer());
    });

  feedContainer.append(feedSection);

  return feedContainer;
};
