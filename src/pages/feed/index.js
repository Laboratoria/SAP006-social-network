import { postarMensagem } from "../../services/index.js";
export default () => {
  const container = document.createElement("div");

  const template = `
  <textarea
  name="post-input"
  id="post-text"
  cols="30"
  rows="10"
  placeholder="Escreva sobre seu pet..."
></textarea>
<div class="buttons">
  <button class="button-post" type="button" id="button-publicar">Publicar</button>
</div>
</form>
<section id="feed">
<div id="lista-feed" class="lista-feed"></div>
</section>
    `;
  container.innerHTML = template;

  loadPosts();

  //CRIAR POST
  const btn = container.querySelector("#button-publicar");
  btn.addEventListener("click", () => {
    console.log("clicou aqui!");
    const text = container.querySelector("#post-text").value;
    const postagem = {
      text: text,
      user_id: "teste",
      likes: 0,
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