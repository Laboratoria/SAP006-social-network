
export const home = () => {
  const container = document.createElement('div');
  container.className = 'container';
  const template = `
    <h2>Página inicial</h2>
    <form id="postForm" class="post-form">
      <input type="textarea" id="postText" class="post-text" placeholder="O que você está pensando?">
      <button type="submit" class="send-post">Enviar</button>
    </form>
    <div id="postsList" class="posts-list"></div>
 `;
  container.innerHTML = template;
  container.querySelector('#postForm')
    .addEventListener('submit', (event) => {
      event.preventDefault();
      const userLogged = firebase.auth().currentUser
      if (userLogged) {
        createPost(userLogged)
        console.log("logado")
      } else {
        console.log("somente usuários logados podem publicar posts")
      }
      function createPost(user){
        const text = document.querySelector('#postText').value;
        const post = {
          text,
          userId: user.uid,
          userName: user.displayName,
          userEmail: user.email,
          likes: 0,
          comments: [],
        };
        console.log(post)
        const postsCollection = firebase.firestore().collection('posts');
        postsCollection.add(post);
      }
    })

const addPosts = (post) => {
  const postTemplate = `
    <section id="${post.id}" class="post">
      <img src="https://img2.gratispng.com/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg" alt="user" class="user-photo">
      ${post.data().text}
    </section>
    `;
  container.querySelector('#postsList').innerHTML += postTemplate;
};

const loadPosts = () => {
  const postsCollection = firebase.firestore().collection('posts');
  container.querySelector('#postsList').innerHTML = 'Carregando...';
  postsCollection.get().then((snap) => {
    container.querySelector('#postsList').innerHTML = '';
    snap.forEach((post) => {
      addPosts(post);
    });
  });
};

loadPosts();
return container;
};
//export { createPost };