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

    collectionOfPosts.add(post);
  });

  function addPost(post) {
    const postStructure = `
    <section>
      <p id='${post.id}'>${post.data().text} ❤️ ${post.data().likes}</p>
    </section>
    `;

    document.getElementById('postTemplate').innerHTML += postStructure;
  }

  function loadPosts() {
    const collectionOfPosts = firebase.firestore().collection('posts');
    collectionOfPosts.get().then(snap => {
      snap.forEach(post => {
        addPost(post);
      });
    });
  }
  loadPosts();
  return rootElement;
};
  // Objetos com propriedades utilizadas nos posts:
  // const user = firebase.auth().currentUser;
  // if (user !== null) {
  //   const email = user.email;
  //   const uid = user.uid;
  // }

// Criar a collection:

// .then(() => {
//   rootElement.querySelector('#text-post').value = '';
//   rootElement.querySelector('#post-ready').innerHTML = '';
// });
