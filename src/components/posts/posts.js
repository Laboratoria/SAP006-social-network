/* eslint-disable no-loop-func */
/* eslint-disable no-console */
/* eslint-disable spaced-comment */
/* eslint-disable no-restricted-syntax */
import { /* updatePost, */currentUser } from '../../services/index.js';
import { deletePost, sendLike } from './postfunctions.js';

const Post = (nameUserPost, text, idUserPost, idUser, idPost, photoPost, dateP, likesPost) => {
  const template = `
  <main class='postContainer' data-post id=${idUserPost}>
    <header class='post-header' id=${idPost}>      
      <section class='userInfo'>
        <img id='${photoPost}' src='../../img/profileImg.png' height="40px" width="40px">
        <p class='username'>${nameUserPost}</p> 
      </section>
      <p id='postDate' class='postDate'>${dateP}</p> 
    </header> 
    <form class='formContainer'>
      <p id='p' class='postInput' placeholder='Sua Mensagem'>${text}</p>      
        <section id='section' class='postBtnContainer'> 
            <i data-like='like' id='like-${idPost}' class='far fa-heart'></i>
            <a data-num='num' id='numLike-${idPost}' class='numLikes'>${likesPost.length}</a>
          <button type='button' id='edit-${idPost}' class='editBtn'>Edit</button> 
          <button type='button' data-delete='delete' id='delete-${idPost}' class='deleteBtn'>Delete</button>
        </section>  
      </form>    
  </main>
  `;
  return template;
};

function printPost(post) {
  const user = currentUser();
  const idUser = user.uid;

  const idPost = post.id;
  const text = post.data().text;
  const idUserPost = post.data().idUser;
  const nameUserPost = post.data().name;
  const photoPost = post.data().photo;
  // const datePost = post.data().date;
  const dateP = post.data().dateP;
  const likesPost = post.data().likes;

  // const updateId = {
  //   idPost: post.id,
  // };
  // updatePost(updateId, post.id);
  // console.log (updateId);

  firebase.firestore().collection('post').doc(post.id).update({
    idPost: post.id,
  });

  const timeline2 = document.querySelector('.feedTimeline');
  timeline2.innerHTML += '';
  // eslint-disable-next-line max-len
  timeline2.innerHTML += Post(nameUserPost, text, idUserPost, idUser, idPost, photoPost, dateP, likesPost);

  const postSelected = document.querySelectorAll('[data-post]');
  const btnLike = document.querySelector(`#like-${idPost}`);
  const btnEdit = document.querySelector(`#edit-${idPost}`);
  const btnDelete = document.querySelector(`#delete-${idPost}`);

  if (idUser === idUserPost) {
    btnLike.style.display = 'none';
    btnEdit.style.display = 'block';
    btnDelete.style.display = 'block';
  }

  for (const partOfPost of postSelected) {
    partOfPost.addEventListener('click', (event) => {
      const e = event.target;
      const mainPost = (document.querySelector(`#${event.target.id}`)).parentNode.parentNode.parentNode;

      const idCreatorPost = (document.querySelector(`#${event.target.id}`)).parentNode.parentNode.parentNode.getAttribute('id');
      const idPostClicked = (document.querySelector(`#${event.target.id}`)).parentNode.parentNode.parentNode.children[0].getAttribute('id');
      //const deleteBtn = (event.target.id).includes('delete');
      const likeIcon = document.querySelector(`#${event.target.id}`);
      const numLikes = document.querySelector(`#${event.target.id}`).nextElementSibling;

      if (e.dataset.delete && idCreatorPost === idUser) {
        deletePost(idPostClicked, mainPost);
      }

      if (e.dataset.like) {
        sendLike(idUser, idPostClicked, numLikes, likeIcon);
      }
    });
  }
  return timeline2;
}

export { printPost };
