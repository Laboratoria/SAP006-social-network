// import { signOut } from "../../services/index.js";
import { createPost, getPost, currentUser } from '../../services/index.js';
import { Post } from '../../components/posts/posts.js';
import { headerMenu } from '../../components/header/index.js';

export const Feed = () => {
  headerMenu();

  const user = currentUser();
  const idUser = user.uid;
  const name = user.displayName;
  const photo = user.photoURL;
  const date = new Date();
  const root = document.createElement('div');
  root.classList.add('feed-container');
  root.innerHTML = `  
    <main class='postContainer'>
      <header id='postHeader' class='post-header'>
      <section class='userInfo'>
        <img src='../../img/profileImg.png' height="40px" width="40px">
        <p class='username'>${name}</p> 
      </section>      
      </header> 
      <form class='formContainer'>
        <textarea class='postContent' type='text' placeholder='Sua Mensagem'></textarea>      
        <section class='postBtnContainer'>
          <button type='button' class='publishBtn'>Publicar</button>
        </section>  
      </form>     
    <section class='feedTimeline'></section>
    </main>  
  `;

  const textInput = root.querySelector('.postInput');
  const btnPublish = root.querySelector('.publishBtn');

  btnPublish.addEventListener('click', () => {
    const postObj = {
      idUser,
      idPost: '',
      name,
      photo,
      text: textInput.value,
      date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      likes: 0,
      comments: [],
    };
    createPost(postObj);
    loadPost();
  });

  function printPost(post) {
    const text = post.data().text;
    const idPost = post.id;
    const postDate = post.data().date;
    const timeline = document.querySelector('.feedTimeline');
    timeline.innerHTML += '';
    timeline.innerHTML += Post(name, text, idUser, idPost, postDate);
  }

  function loadPost() {
    getPost().then((snapshot) => {
      snapshot.forEach((post) => {
        printPost(post);
      });
    });
  }

  loadPost();
  return root;
};
