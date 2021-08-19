import { popUpNotice } from '../popup/index.js'
import { /*updatePost,*/ deletePostFeed } from '../../services/index.js';

const deletePost = (idPost, post) => {
  const root = document.querySelector('.root');
  const popupContainer = document.createElement('div');
  popupContainer.innerHTML = ` 
      <div class='popup-wrapper'>
          <div class='popup'>
            <div class='popup-content'>
                <div id='yes' class='yes'>SIM</div>
                <div id='no' class='não'>NAO</div>
            </div>                
          </div>
        </div>
    `;
  root.appendChild(popupContainer);

  const popup = root.querySelector('.popup-wrapper');
  const popUpContent = root.querySelector('.popup-content');

  function exibeModal() {
    popup.style.display = 'block';
  }
  exibeModal();

  popUpContent.addEventListener('click', (event) => {
    const answerUser = event.target.id;
    if (answerUser === 'yes') {
      deletePostFeed(idPost);
      post.remove();
      popup.style.display = 'none';
    } else {
      popup.style.display = 'none';
    }
  });

  return root;
};

export { deletePost };
