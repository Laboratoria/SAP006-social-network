import { newPost, getPostCollection } from '../../services/index.js';

export default () => {
  const container = document.createElement('div');

  const template = `  
  <header>
    <nav class="menu">
    </nav> 
      <a href="/#feed">
        <img src="" alt="" class="logo">
      </a>
    </header>

      <div class= "container">

        <div class= "card-post">
          <form>
            <h2>Post</h2>
              <textarea type="text" name="post-feed" id="post-input" class="post-text" cols="30" rows="5" maxlength="500" placeholder="Escreva sua experiência aqui"></textarea>
              <button type="button" id="post-button" class="button">Publicar</button>
            </form>
        </div> 

        <div class= "card-feed"> <br>
          <h2 class="title">Feed</h2>
          <ul id="feed-container" class="feed-container" data-section></ul>
          
        </div>
    `;

  container.innerHTML += template;

  // const firebaseAuth = firebase.auth().currentUser;
  const postButton = container.querySelector('#post-button');
  const postInputMsg = container.querySelector('#post-input');
  const feedContainer = container.querySelector('#feed-container');

  const clearPost = () => {
    postInputMsg.value = '';
  };

  postButton.addEventListener('click', () => {
    // console.log(firebaseAuth);
    const newPostMsg = postInputMsg.value;
    // const addNewPost = container.querySelector('#add-new-post');
    newPost(newPostMsg);
    //   .then((docRef) => {
    //  console.log('Document written with ID: ', docRef.id);
    //    postMessage.value = '';
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
    //  addNewPost.innerHTML = newPostMsg;
    clearPost();
  });
  return container;
};
