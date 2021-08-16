// import { signOut } from "../../services/index.js";
import { createPost, getPost } from '../../services/index.js';
import { Post } from '../../components/posts/posts.js';
import { headerMenu } from '../../components/header/index.js';

export const Feed = () => {
  headerMenu();
  const root = document.createElement('div');
  root.classList.add('feed-container');
  root.innerHTML = `  
    <main class='mainPost postContainer'>
    <header id='postHeader' class='post-header'>Usuário</header> 
      <form class='formContainer'>
        <input class='postInput postContent' placeholder='Sua Mensagem'>      
        <section class='postBtnContainer'>
          <button type='button' class='publishBtn'>Publicar</button>
        </section>  
      </form>     
    <section class='feedTimeline'></section>
    </main>  
  `;
  headerMenu();

  const textInput = root.querySelector('.postInput');
  const btnPublish = root.querySelector('.publishBtn');

  const postObject = (text) => {
    const postObj = {
      texto: text,
    };
    return postObj;
  };

  const getPostText = (text) => {
    const post = postObject(text);
    createPost(post);
  };

  const printPost = (post) => {
    const timeline = document.querySelector('.feedTimeline');
    timeline.innerHTML += Post(post.data().texto);
  };

  btnPublish.addEventListener('click', () => {
    getPostText(textInput.value);
    textInput.value = '';
  });

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
