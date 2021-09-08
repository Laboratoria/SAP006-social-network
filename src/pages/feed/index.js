import { newPost, showPost, logOut } from '../../services/index.js';

export default () => {
  const container = document.createElement('div');

  const template = `  
  <header>
    <nav class="menu">
    </nav> 
      <a href="/#feed">
        <img src="" alt="" class="logo">
      </a>
      <button id="sing-out" class="button">Sair</div>
  </header>
  
    <div class= "container">
      <div class= "card-post">
        <p id="error-message"></p>
        <form>
          <h5>Post</h5>
            <textarea type="text" name="post-feed" id="post-message" class="post-text" cols="30" rows="5" maxlength="500" placeholder="Escreva sua experiência aqui"></textarea>
            <button type="button" id="post-button" class="button">Publicar</button>
        </form>
      </div> 
      <div class= "card-feed"> 
      <h2 class="title">Feed</h2><br>
      <div id="add-new-post" class="new-post"></div>
      </div>
      
    </div> 

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
  const postButton = container.querySelector('#post-button');
  // const postInputMsg = container.querySelector('#post-input');
  // const feedContainer = container.querySelector('#feed-container');

  // const clearPost = () => {
  //   postInputMsg.value = '';
  // };

  postButton.addEventListener('click', () => {
    const postMsg = postMessage.value;
    const errorMsg = document.querySelector('#error-message');
    if (postMsg === '') {
      errorMsg.innerHTML = 'O post está vazio, não foi possivel publicar. Tente novamente';
    } else {
      newPost(postMsg).then(() => {
        postMessage.value = '';
        errorMsg.innerHTML = '';
      });
    }
    // });
    //  addNewPost.innerHTML = postMsg;
    // const fbData = data().posts();
    //   const postCollection = () => {
    //     let allPosts = [];
    //     for (let post of fbData){
    //       allPosts.push(post);
    //     }
    //     return allPosts;
    //   };
    //   const addNewPost = container.querySelector('#add-new-post');
    //   const showNewPost = (data) => {
    //     data.map((fbCollection) => {
    //       addNewPost.innerHTML += `
    //       <div class="cards-post">
    //         <h3>${fbCollection.displayName}</h3>
    //         <h4>${fbCollection.data}</h4>
    //       </div>
    //         <p>${fbCollection.message}</p>
    //         <button>Like ${fbCollection.like}</button>
    //     `;
    //     });
    //   };
    // showNewPost(showPost);
  });

  const addNewPost = container.querySelector('#add-new-post');
  const showNewPost = (data) => {
    const postTemplate = `
        <div class="cards-post">
          <div class="header-post">
            <h3>${data.displayName}</h3>
            <h4>${data.data}</h4>
          </div>
          <p>${data.message}</p>
          <button>Like ${data.like}</button>
        </div>
      `;
    addNewPost.innerHTML += postTemplate;
  };
  showNewPost(showPost());

  const singOut = container.querySelector('#sing-out');
  singOut.addEventListener('click', (event) => {
    event.preventDefault();
    logOut()
      .then(() => {
        window.location.hash = '#home';
      });
    // .catch((error) => {
    //   // An error happened.
    //   console.log('Erro', error);
    // });
  });
  return container;
};
