export default () => {

  const timeline = document.getElementById("login-container").innerHTML = `

  <button id="signout-button" class="flex-itens">Sign Out</button>
  <div>
    <form action="" id="postForm">
      <input type="textarea" id="postText"/>
      <button type="submit"> Postar </button>
    </form>

    <ul id="posts"></ul>

  </div>`;

   
  //Sair da conta do usuário
  document.getElementById('signout-button').addEventListener('click', (e) => {
      e.preventDefault();
      firebase.auth().signOut();
      location.reload();
    });
      

  // Criando coleção no firebase chamada 'posts'
  const postsCollection = firebase.firestore().collection('posts')

  // Enviando posts para o firestore
  document.getElementById('postForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const text = document.getElementById('postText').value;
    
    const post = {
      text: text,
      userId: "Patrícia",
      likes: 0,
      comments:[]
    } 

    postsCollection
      .add(post)
      .then(() => {
        document.getElementById('postText').value = ""
        loadPosts()
      })

  })

  // Adicionando posts 
  function createTemplatePost(post) {
    const postTemplate = `
        <li id="${post.id}"> Post: ${post.data().text} | ❤️ ${post.data().likes} | 💬 | </li>
        <button id="deletePost-btn">🗑️</button>
        <button id="likePost-btn">❤️</button>
        <button id="commentPost-btn">💬</button>
    `
    document.getElementById('posts').innerHTML += postTemplate

  // Deletando posts  
    document.getElementById('deletePost-btn').addEventListener('click', (e) => {
      e.preventDefault();

      function deletePost(id) {
        postsCollection
          .doc(id)
          .delete()
          .then(() => {
            loadPosts()
          })
      }
      
      deletePost(post.id);     
    });

  // Curtindo posts
    document.getElementById('likePost-btn').addEventListener('click', (e) => {
      e.preventDefault()

      function addLikes() {

        const userId = firebase.auth().currentUser.uid
        const postId = post.id

        postsCollection
        .doc(postId)
        .get()
        .then((snapshot) => {
          const dados = snapshot.data();

          if (dados.likes && !dados.likes.includes(userId)) {
            postsCollection
              .doc(postId)
              .update({
                likes: firebase.firestore.FieldValue
                  .arrayUnion(firebase.auth().currentUser.uid),
              });
          } else {
            postsCollection
              .doc(postId)
              .update({
                likes: firebase.firestore.FieldValue
                  .arrayRemove(firebase.auth().currentUser.uid),
              });
          }
          
        })
      }
      addLikes(post.id)

    });
  }

  // Mostrando os posts na tela
  function loadPosts() {

    document.getElementById('posts').innerHTML = "Carregando posts..."

    postsCollection
      .get()
      .then(snap => {
        document.getElementById('posts').innerHTML = ""
        snap.forEach(post => {
          createTemplatePost(post)
        })
      })
  }
  
  loadPosts()

  return timeline;

}