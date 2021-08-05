// import { signOut } from "../../services/index.js";

export const Feed = () => {
  const root = document.createElement('div');
  root.innerHTML = `
  <p>Ola! Seja bem vindo.</p>
  <button type='button' id='buttonSignOut' class='btn-login form-item'>Sair</button>
  <main class='feedContainer'>
    <header id='postHeader' class='postHeader'>Usuário</header> 
      <form class='formContainer'>
        <input class='postText' placeholder='Sua Mensagem'>      
        <section class='btnContainer'>
          <button type='button' class='publishBtn'>Publicar</button>
        </section>  
      </form>     
    <section class='feedTimeline'></section>
  </main>  
  `;

  const btnSignOut = root.querySelector('#buttonSignOut');
  const textInput = root.querySelector('.postText')
  const btnPublish = root.querySelector('.publishBtn');

  btnSignOut.addEventListener('click', () => {
    window.history.pushState({}, '', '/');
    const popStateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popStateEvent);
  })

  btnPublish.addEventListener('click', () => {
    getPostText(textInput.value);
    textInput.value='';
  })

  const getPostText = (text) => {
    const post = postObject(text);    
    createPost(post);
  }  

  const postObject = (text) => {
    const postObj = {
      'texto': text
    }
    return postObj;
  }

  return root;
}
