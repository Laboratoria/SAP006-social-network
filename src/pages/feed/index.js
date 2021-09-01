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
              <textarea type="text" name="post-feed" id="post-message" class="post-text" cols="30" rows="5" maxlength="500" placeholder="Escreva sua experiência aqui"></textarea>
              <button type="button" id="post-button" class="button">Publicar</button>
            </form>
        </div> 

        <div class= "card-feed"> <br>
          <h2 class="title">Feed</h2>
          <ul id="postList" class="post-list" data-section></ul>

        </div>
      </div> 
    `;

  container.innerHTML = template;

  const postButton = container.querySelector('#post-button');
  const showPosts = container.querySelector('#postList');

  postButton.addEventListener('click', () => {
    const postMsg = container.querySelector('#post-message').value;

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
      });
  });

  return container;
};
