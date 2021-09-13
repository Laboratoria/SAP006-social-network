import { postarMensagem } from "../../services/index.js";
export default () => {
  const container = document.createElement("div");

  const template = `
    <header>
      <h1>Ellas</h1>
    </header>
    <form action="" id="post-form" class="form">
      <label for="name-film">Filme</label>
      <input type="text" id="name-film" />
      <label for="img-film">Anexe uma imagem do filme</label>
      <span
        class="iconify"
        data-icon="vaadin:file-picture"
        style="color: #bd4b4b"
        data-height="70"
      ></span>
      <script src="https://code.iconify.design/2/2.0.3/iconify.min.js"></script>
      <img src="" alt="" />
      <input type="file" id="input-img-film" accept="image/*" />
      <textarea
        name="post-input"
        id="post-text"
        cols="30"
        rows="10"
        placeholder="Escreva sobre o filme..."
      ></textarea>
      <div class="buttons">
        <button class="button-post" type="button" id="button-publicar">Publicar</button>
        <button class="button-post" type="button" id="button-descartar">Descartar</button>
      </div>
</form>
<section id="feed">
  <div id="lista-feed" class="lista-feed"></div>
</section>
    <footer id="rodape">
      <nav>
        <a href="">Feed</a>
        <a href="">Adicionar</a>
        <a href="">Pesquisar</a>
        <a href="">Logout</a>
      </nav>
    </footer>
    
    `;
  container.innerHTML = template;

  loadPosts();

  //CRIAR POST
  const btn = container.querySelector("#button-publicar");
  btn.addEventListener("click", () => {
    console.log("clicou aqui!");
    const text = container.querySelector("#post-text").value;
    const filmName = container.querySelector("#name-film").value;
    const filmImage = container.querySelector("#input-img-film").value;
    const postagem = {
      text: text,
      film_name: filmName,
      film_img: filmImage,
      user_id: "teste",
      likes: 0,
      comments: [],
    };

    postarMensagem(postagem)
      .then(() => {
        console.log("Document successfully written!");
        loadPosts();
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  });

  return container;

  // MOSTRAR POST NA TELA
  function addPost(post) {
    const postTemplate = `
      <div id="${post.id}">
        <div class="usuario-card">
          <h3>${post.data?.user_id}</h3>
        </div>
        <div class="id-filme-card">
          <h2>${post.data?.film_name}</h2>
          <section>${post.data?.film_img}</section>
        </div>
        <div class="texto-card">
        <p>${post.data?.text}</p>
        </div>
        <div class="interacao-card">
          <button id="like"><span class="iconify" data-icon="mdi-light:heart" style="color: #111;" data-height="20"></span>${
            post.data?.likes
          }</button>
          <button id="comentar"><span class="iconify" data-icon="mdi-light:comment" style="color: #111;" data-height="20"></span>${
            post.data?.comments
          }</button>
          <button id="deletar" onclick="${() =>
            deletePost(
              post.id
            )}"><span class="iconify" data-icon="mdi-light:delete" style="color: #111;" data-height="20"></span>Deletar</button>
        </div>
        
      </div>
`;
    container.querySelector("#lista-feed").innerHTML += postTemplate;
  }

  function loadPosts() {
    const postsCollection = firebase.firestore().collection("postagens");
    container.querySelector("#lista-feed").innerHTML = "Carregando...";
    postsCollection.get().then((querySnapshot) => {
      container.querySelector("#lista-feed").innerHTML = "";
      querySnapshot.forEach((doc) => {
        const post = { id: doc.id, data: doc.data() };
        addPost(post);
      });
    });
  }

  //DELETAR POST
  function deletePost(postId) {
    const postsCollection = firebase.firestore().collection("postagens");
    postsCollection
      .doc(postId)
      .delete()
      .then((doc) => {
        loadPosts();
      });
  }
};

