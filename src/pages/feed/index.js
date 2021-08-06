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

    <section id="get-post">
    </section>
  `;

  rootElement.innerHTML = container;

  rootElement.querySelector('#published-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const text = rootElement.querySelector('#text-post').value;

    const post = {
      text: text,
      user_id: firebase.auth().currentUser.uid,
      likes: 0,
      comments: [],
    };
    const collectionOfPosts = firebase.firestore().collection('posts');

    collectionOfPosts.add(post).then(() =>{
      rootElement.querySelector('#text-post') = "";
      rootElement.querySelector('#get-post'). innerHTML = "";
    });
  });

  return rootElement;
};
