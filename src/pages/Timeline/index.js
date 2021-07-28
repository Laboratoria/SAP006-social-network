export default () => {
  const timeline = (document.getElementById("container").innerHTML = `
  <link rel="stylesheet" href="./pages/Timeline/style.css" />
  
  <div>

    <div class="banner">
      <img src="assets/logo.png" alt="Logo">
      <div class="title-container">
          <h1 class="title">SeriesDay</h1>
          <h3 class="subtitle">review de séries</h3>
      </div>
    </div>

    <form action="" id="postForm">
      <textarea type="textarea" id="postText" class="post-text" rows="5" cols="50" placeholder="Digite aqui sua review..."></textarea>
      <button type="submit" class="buttons post-button"> Publicar </button>
    </form>

    <ul id="posts"></ul>

    <button id="signout-button" class="signout-button buttons">Sair</button>

  </div>`);

  //Sair da conta do usuário
  document.getElementById("signout-button").addEventListener("click", (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    location.reload();
  });

  // Criando coleção no firebase chamada 'posts'
  const postsCollection = firebase.firestore().collection("posts");

  // Enviando posts para o firestore
  document.getElementById("postForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const text = document.getElementById("postText").value;

    const post = {
      text: text,
      userId: "Patrícia",
      likes: 0,
      comments: [],
    };

    postsCollection.add(post).then(() => {
      document.getElementById("postText").value = "";
      loadPosts();
    });
  });

  // Adicionando posts
  function createTemplatePost(post) {
    const postTemplate = `
      <li class="posts-box">
        <div id="${post.id}"class="post-container">
          <p> Post: ${post.data().text} </p>
      
          <div class="like-comment">
            <p> ❤️ ${post.data().likes} </p>
            <p> 💬 </p> 
          </div>
        </div>
          
        <div id=${post.id} class="buttons-container">
          <button class="deletePost-btn timeline-buttons">🗑️</button>
          <button class="likePost-btn timeline-buttons">❤️</button>
          <button class="commentPost-btn timeline-buttons">💬</button>
          <div></div>
        </div>
      </li>
    `;
    document.getElementById("posts").innerHTML += postTemplate;

    // Deletando posts
    const deleteButtons = document.querySelectorAll(".deletePost-btn");
    for (const button of deleteButtons) {
      button.addEventListener("click", function (event) {
        console.log(event.target.parentNode.id);
        deletePost(event.target.parentNode.id);
      });
    }

    function deletePost(id) {
      postsCollection
        .doc(id)
        .delete()
        .then(() => {
          loadPosts();
        });
    }

    // Curtindo posts
    const likeButtons = document.querySelectorAll(".likePost-btn");

    for (const button of likeButtons) {
      button.addEventListener("click", function (event) {
        console.log(event.target.parentNode.id);
        addLikes(event.target.parentNode.id);
      });
    }

    function addLikes(id) {
      postsCollection
        .doc(id)
        .update({
          likes: firebase.firestore.FieldValue.increment(1),
        })
        .then(() => {
          loadPosts();
        });
    }
  }

  // Mostrando os posts na tela
  function loadPosts() {
    document.getElementById("posts").innerHTML = "Carregando posts...";

    postsCollection.get().then((snap) => {
      document.getElementById("posts").innerHTML = "";
      snap.forEach((post) => {
        createTemplatePost(post);
      });
    });
  }

  loadPosts();

  return timeline;
};
