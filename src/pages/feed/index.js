import {
  newPost, showPost,
  logOut, removeUserLocalStorage,
} from '../../services/index.js';

export default () => {
  const container = document.createElement('div');

  const template = `  
  <header>
    <nav class="menu">
    </nav> 
      <a href="/#feed">
      </a>
      <button id="sing-out" class="button">Sair</div>
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
      <div class= "card-feed"> 
      <h2 class="title">Feed</h2><br>
      <div id="add-new-post" class="new-post"></div>
      </div>
      
    </div> 
    `;

  container.innerHTML += template;

  const postButton = container.querySelector('#post-button');
  const postMessage = container.querySelector('#post-message');
  const errorMsg = container.querySelector('#error-message');

  postButton.addEventListener('click', () => {
    const postMsg = postMessage.value;
    if (postMsg === '') {
      errorMsg.innerHTML = 'O post está vazio, não foi possivel publicar. Tente novamente';
    } else {
      newPost(postMsg).then(() => {
        postMessage.value = '';
        errorMsg.innerHTML = '';
      });
    }
  });

  const addNewPost = container.querySelector('#add-new-post');
  const showNewPost = (data) => {
    const postTemplate = `
        <div class="cards-post">
          <div class="header-post">
            <h3>${data.data().name}</h3>
            <h5>${data.data().date}</h5>
          </div>
          <p>${data.data().message}</p>
          <button>Like ${data.data().like}</button>
        </div>
      `;
    addNewPost.innerHTML += postTemplate;
  };

  showPost().then((item) => {
    item.forEach((post) => {
      showNewPost(post);
    });
  });

  const singOut = container.querySelector('#sing-out');
  singOut.addEventListener('click', (event) => {
    event.preventDefault();
    logOut()
      .then(() => {
        window.location.hash = '#home';
      });
    removeUserLocalStorage()
      .then(() => {
        window.location.hash = '#home';
      });
  });
  return container;
};
