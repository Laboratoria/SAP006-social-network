export default () => {
  const timeline = (document.getElementById("container").innerHTML = `

  <button id="signout-button" class="flex-itens">Sign Out</button>
  <div>
    <form action="" id="postForm">
      <input type="textarea" id="postText"/>
      <button type="submit"> Postar </button>
    </form>

    <ul id="posts"></ul>

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
        <li id="${post.id}"> Post: ${post.data().text} | ❤️ ${
      post.data().likes
    } | 💬 | </li>
        <div id=${post.id}>
          <button class="deletePost-btn">🗑️</button>
          <button class="likePost-btn">❤️</button>
          <button class="commentPost-btn">💬</button>
          <div></div>
        </div>
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
