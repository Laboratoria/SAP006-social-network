import {
  newPost, showPost, logOut, removeUserLocalStorage, userData,
  // getPost,
} from '../../services/index.js';
import { showNewPost } from '../../components/index.js';

export default () => {
  const user = userData().uid;
  // console.log(user);
  if (!user) {
    window.location.hash = '#home';
  }
  const container = document.createElement('div');
  const template = `
  <header>
    <nav class="menu">
    </nav> 
      <a href="/#feed">
      </a>
      <button id="sign-out" class="button">Sair</div>
  </header>
  
    <div class= "container">
      <div class= "card-post">
        <p id="error-message"></p>
        <form>
          <h2>Post</h2>
            <textarea type="text" name="post-feed" id="post-message" class="post-text" cols="30" rows="5" maxlength="500" placeholder="Escreva sua experiência aqui"></textarea>
            <button type="button" id="post-button" class="button">Publicar</button>
        </form>
      </div> 
      <div class= "feed-container"> 
      <h2 class="title">Feed</h2><br>
      <div id="add-new-post" class="new-post"></div>
      </div>
      
    </div> 
    `;

  container.innerHTML += template;

  const postButton = container.querySelector('#post-button');
  const postMessage = container.querySelector('#post-message');
  const errorMsg = container.querySelector('#error-message');
  const signOut = container.querySelector('#sign-out');
  const addNewPost = container.querySelector('#add-new-post');

  showPost().then((allColletion) => {
    allColletion.forEach((doc) => {
      const post = {
        id: doc.id,
        user: doc.data().user,
        name: doc.data().name,
        email: doc.data().email,
        date: doc.data().date,
        message: doc.data().message,
        like: doc.data().like,
      };
      const postDiv = showNewPost(post);
      addNewPost.appendChild(postDiv);
    });
  });

  postButton.addEventListener('click', () => {
    const postMsg = postMessage.value;
    if (postMsg === '') {
      errorMsg.innerHTML = 'O post está vazio, não foi possivel publicar. Tente novamente';
    } else {
      newPost(postMsg)
        .then((newDoc) => {
          const newPostDiv = showNewPost(newDoc);
          addNewPost.prepend(newPostDiv);
          postMessage.value = '';
          errorMsg.innerHTML = '';
        });
    }
  });

  signOut.addEventListener('click', (event) => {
    event.preventDefault();
    logOut()
      .then(() => {
        removeUserLocalStorage();
        window.location.hash = '#home';
      });
  });

  return container;
};
