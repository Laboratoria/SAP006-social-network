// import { signOut } from "../../services/index.js";
import { createPost, getPost, currentUser } from '../../services/index.js';
import { printPost } from '../../components/posts/posts.js';
import { headerMenu } from '../../components/header/index.js';

// function loadPost() {
//   getPost().then((snapshot) => {
//     snapshot.forEach((post) => {
//       printPost(post);
//     });
//   });
// }

export const Feed = () => {
  headerMenu();

  function loadPost() {
    getPost().then((snapshot) => {
      snapshot.forEach((post) => {
        printPost(post);
      });
    });
  }

  const user = currentUser();
  const idUser = user.uid;
  const name = user.displayName;
  const photo = user.photoURL;
  console.log(photo)
  const date = new Date();
  const root = document.createElement('div');
  root.classList.add('feed-container');
  root.innerHTML = `  
    <main class='postContainer'>
      <header id='postHeader' class='post-header'>
      <section class='userInfo'>
        <img src='../../img/profileImg.png' class='picturePost' height="40px" width="40px">
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
  const picturePost = root.querySelector('.picturePost');
  picturePost.src = photo;


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

    const timeline = document.querySelector('.feedTimeline');
    timeline.innerHTML = '';
    textInput.value = '';    

    loadPost();
  });

  loadPost();
  return root;
};
