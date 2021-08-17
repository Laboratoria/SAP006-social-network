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
<<<<<<< HEAD

=======
>>>>>>> 4a1800b5311ec17c26be1692681fe353684c53da
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
        <textarea class='postInput' type='text' placeholder='Sua Mensagem'></textarea>      
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
      date: date.toLocaleString('pt-BR'),
      dateP: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      likes: 0,
      comments: [],
    };
    console.log(postObj);
    createPost(postObj);
    const timeline1 = document.querySelector('.feedTimeline');
    timeline1.innerHTML = '';
    textInput.value = '';
    loadPost();
  });

  function printPost(post) {
    const idPost = post.id;
    const text = post.data().text;
    const idUserPost = post.data().idUser;
    const nameUserPost = post.data().name;
    const photoPost = post.data().photo;
    const datePost = post.data().date;
    const dateP = post.data().dateP;
    console.log(dateP);


    firebase.firestore().collection('post').doc(post.id).update({
      idPost: post.id,
    });

    const timeline2 = document.querySelector('.feedTimeline');
    timeline2.innerHTML += '';
    timeline2.innerHTML += Post(nameUserPost, text, idUserPost, idPost, photoPost, dateP);
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
