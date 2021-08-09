// import { deletePost } from '../../components/feed.js';
import { addPosts, loadPosts, deletePost } from '../../services/database.js';

export const Feed = () => {
  const rootElement = document.createElement('div');
  const container = `
    <div class="esmaeceHeader logotipo-text">
      <h2>FORT FEED</h2>
    </div> 

    <section class="post">
      <form action="" id="published-form">
      <input type="text" id="text-post" placeholder="Mana, o que você quer compatilhar?">
      <button class="btn" id="send-post">Enviar</button>
      </form>
    </section>

    <section class="get-post" id="postTemplate">
    </section>
  `;

  rootElement.innerHTML = container;

  const submitButton = rootElement.querySelector('#published-form');
  submitButton.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = rootElement.querySelector('#text-post').value;
    const post = {
      text: text,
      user_id: firebase.auth().currentUser.uid,
      likes: 0,
      comments: [],
    };
    addPosts(post);
  });
    
  const deleteButton = document.querySelector('.delete-button')
  console.dir(deleteButton)
  
  loadPosts();

  return rootElement;
};
