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
  console.log(user);

  const root = document.createElement('div');
  root.innerHTML = `  
    <main class='postContainer'>
      <header id='postHeader' class='feed-postHeader'>
      ${name}
        <figure>
          <img src='./img' alt='Foto Perfil' class='foto-postHeader'/>
        </figure>
      </header> 
      <form class='formContainer'>
        <textarea class='postInput' type='text' placeholder='Sua Mensagem'></textarea>      
        <section class='btnContainer'>
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
      likes: 0,
      comments: [],
    };
    createPost(postObj);
    loadPost();
  });

  function printPost(post) {
    const text = post.data().text;
    const idPost = post.id;
    const timeline = document.querySelector('.feedTimeline');
    timeline.innerHTML += '';
    timeline.innerHTML += Post(name, text, idUser, idPost, date);
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
