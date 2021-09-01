import { newPost } from '../../services/index.js';

export default () => {
  const container = document.createElement('div');

  const template = `  
    <header>
      <nav class="menu">
      </nav> 
      <a href="/#feed">
        <img src="img/google-logo.png" alt="" class="logo">
      </a>
    </header>
      <div class= "container">
        <div class= "card">
          <h2 class="title">Feed</h2>
          <p id="error-message" class="error-message"></p>
          <form>
            <h5>Post</h5>
              <textarea type="text" name="post-feed" id="post-message" class="post-text" cols="30" rows="5" maxlength="500" placeholder="Escreva sua experiência aqui"></textarea>
              <button type="button" id="post-button" class="button">Publicar</button>
            </form>
            <p id="add-new-post"></p>
        </div> 
      </div> 
    `;

  container.innerHTML = template;

  const postButton = container.querySelector('#post-button');
  const postMessage = container.querySelector('#post-message');
  postButton.addEventListener('click', () => {
    const postMsg = postMessage.value;
    const addNewPost = container.querySelector('#add-new-post');
    console.log(postMsg);
    const postInf = {
      name: 'jessica',
      message: postMsg,
    };

    newPost(postInf)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
        // let errorMessage = error.message;
        // const errorMsg = document.querySelector('#error-message');
        // if (postMsg === '') {
        //   errorMessage = 'O post está vazio, não foi possivel publicar. Tente novamente';
        //   errorMsg.innerHTML = errorMessage;
        // } else {
        //   errorMessage = 'Mensagem inválida. Tente novamente';
        //   errorMsg.innerHTML = errorMessage;
        // }
        // return error;
      });
    postMessage.innerHTML = '';
    addNewPost.innerHTML = postMsg;
  });

  return container;
};
