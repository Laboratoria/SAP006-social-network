// import { signOut } from "../../services/index.js";
import { createPost, getPost } from '../../services/index.js';
import { Post } from '../../components/posts/posts.js';

export const Feed = () => {
  const root = document.createElement('div');
  root.innerHTML = `
  <p>Ola! Seja bem vindo.</p>
  <button type='button' id='buttonSignOut' class='btn-login form-item'>Sair</button>
  <main class='postContainer'>
    <header id='postHeader' class='postHeader'>Usuário</header> 
      <form class='formContainer'>
        <input class='postInput' placeholder='Sua Mensagem'>      
        <section class='btnContainer'>
          <button type='button' class='publishBtn'>Publicar</button>
        </section>  
      </form>     
    <section class='feedTimeline'></section>
  </main>  
  `;

  const btnSignOut = root.querySelector('#buttonSignOut');
  const textInput = root.querySelector('.postInput');
  const btnPublish = root.querySelector('.publishBtn');

  btnSignOut.addEventListener('click', () => {
    window.history.pushState({}, '', '/');
    const popStateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popStateEvent);
  });

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
