import { newPost } from '../../services/index.js';

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
          <ul id="feed-collection" class="feed-collection" data-section></ul>

        </div>
    `;

  container.innerHTML += template;

  // const firebaseAuth = firebase.auth().currentUser;
  const postButton = container.querySelector('#post-button');
  const postInputMsg = container.querySelector('#post-input');
  const showPostsFeed = container.querySelector('#feed-collection');

  postButton.addEventListener('click', () => {
    // console.log(firebaseAuth);
    const postMsg = postInputMsg.value;
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

  const viewPost = (data) => {
    const templateFeed = `
    <div id="${data.id}">
    <section>
      <div id="userName">${data.data().name}</div>
      <div id="userEmail">${data.data().email}</div>
      <div id="datePost">${data.data().data}</div>
    </section>
    <div id="getPosts">${data.data().post}</div>
    <button id="like">LIKE</button>
    <span id="numberLike">${data.data().like.length}</span>
    `;

    showPostsFeed.innerHTML += templateFeed;
  };
  // eslint-disable-next-line no-undef
  // postCollection(viewPost);
  return container;
};

// função para mostrar os dados dos posts
