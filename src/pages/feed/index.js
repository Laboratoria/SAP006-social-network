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
      <div class= "card-post">
        <form>
          <h5>Post</h5>
            <textarea type="text" name="post-feed" id="post-message" class="post-text" cols="30" rows="5" maxlength="500" placeholder="Escreva sua experiência aqui"></textarea>
            <button type="button" id="post-button" class="button">Publicar</button>
        </form>
      </div> 
      <div class= "card-feed"> 
      <h2 class="title">Feed</h2><br>
      </div>
    </div> 

    `;

  container.innerHTML += template;
  // const firebaseAuth = firebase.auth().currentUser;
  const postButton = container.querySelector('#post-button');
  const postMessage = container.querySelector('#post-message');

  postButton.addEventListener('click', () => {
    // console.log(firebaseAuth);
    const postMsg = postMessage.value;
    // const addNewPost = container.querySelector('#add-new-post');
    newPost(postMsg);
    // .then((docRef) => {
    //   console.log('Document written with ID: ', docRef.id);
    //   postMessage.value = '';
    // })
    // .catch((error) => {
    //   console.error('Error adding document: ', error);
    // let errorMessage = error.message;
    // const errorMsg = document.querySelector('#error-message');
    // if (postMessage === '') {
    //   errorMessage = 'O post está vazio, não foi possivel publicar. Tente novamente';
    //   errorMsg.innerHTML = errorMessage;
    // }
    // return error;
    // });
    //  addNewPost.innerHTML = postMsg;
  });

  return container;
};
