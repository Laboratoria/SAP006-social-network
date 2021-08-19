/* eslint-disable spaced-comment */
import { popUpNotice } from '../popup/index.js'
import { /*updatePost,*/ deletePostFeed, likePost, getLikes, dislikePost} from '../../services/index.js';

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

function addLike(num) {
  const numberLikes = num;
  const newNum = Number(numberLikes.innerText) + 1;
  numberLikes.innerHTML = newNum;
}

function removeLike(num) {
  const numberLikes = num;
  const newNum = Number(numberLikes.innerText) - 1;
  numberLikes.innerHTML = newNum;
}

const sendLike = (idUser, idPostClicked, numLikes) => {
  getLikes(idPostClicked).then((post) => {
    if (!post.data().likes.includes(idUser)) {
      likePost(idUser, idPostClicked).then(() => {
        addLike(numLikes);
      }).catch('error');
    } else {
      dislikePost(idUser, idPostClicked).then(() => {
        removeLike(numLikes);
      }).catch('error');
    }
  }).catch('error');
};
export { deletePost, sendLike };
