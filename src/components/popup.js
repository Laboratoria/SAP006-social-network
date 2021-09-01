import { deletePost } from '../services/database.js';

export const deletePopUp = (postId, post) => {
  const popUpContainer = document.createElement('div');
  const postTemplate = document.querySelector('#postTemplate');

  popUpContainer.innerHTML = `
    <div class='popup-wrapper' data-popup>
      <div class='popup'>
        <div class='popup-content'>
          <h3>Tem certeza que deseja apagar esse post?</h3>
            <button id='yes' data-confirm class='yes answer'>DELETAR</button>
            <button id='no' data-cancel class='no answer'>CANCELAR</button>
        </div>
      </div>
    </div>
  `;
  postTemplate.appendChild(popUpContainer);

  const popUpWrapper = postTemplate.querySelector('.popup-wrapper');
  popUpWrapper.style.display = 'block';

  const confirmButton = document.querySelector('[data-confirm]');
  confirmButton.addEventListener('click', () => {
    deletePost(postId)
      .then(post.remove());
    popUpWrapper.style.display = 'none';
  });

  const cancelButton = document.querySelector('[data-cancel]');
  cancelButton.addEventListener('click', () => {
    popUpWrapper.style.display = 'none';
  });
};
