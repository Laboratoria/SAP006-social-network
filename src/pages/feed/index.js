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
          <h5>Post</h5>
            <form>
              <textarea type="text" name="post-feed" id="post-message" class="post-text" cols="30" rows="5" maxlength="500" placeholder="Escreva sua experiência aqui"></textarea>
              <button type="button" id="post-button" class="button">Postar</button>
            </form>
        </div> 
      </div> 
    `;

  container.innerHTML = template;

  const postButton = container.querySelector('#post-button');

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
