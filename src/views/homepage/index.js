export const home = () => {
  const container = document.createElement('div');
  container.className = 'container';
  const template = `
    <h2>Página inicial</h2>
    <form id="postForm">
      <input type="textarea" id="postText">
      <button type="submit">Enviar</button>
    </form>
    <ul id="postsList"></ul>
 `;
  container.innerHTML = template;
  container.querySelector('#postForm')
  .addEventListener('submit', (event) => {
    event.preventDefault();
    const text = document.querySelector('#postText').value;
    const post = {
      text: text,
      user_id: 'nessa',
      likes: 0,
      comments: []
    };
    const postsCollection = firebase.firestore().collection("posts");
    postsCollection.add(post);
  });

  const addPosts = (post) => {
    const postTemplate = `
    <li id="${post.id}">
      ${post.data().text}
    </li>
    `
    container.querySelector('#postsList').innerHTML += postTemplate;
  }

  const loadPosts = () => {
    const postsCollection = firebase.firestore().collection("posts");
    container.querySelector('#postsList').innerHTML = "Carregando...";
    postsCollection.get().then(snap => {
      container.querySelector('#postsList').innerHTML = "";
      snap.forEach(post => {
        addPosts(post)
      })
    })
  }

  loadPosts()  
  return container;
};
