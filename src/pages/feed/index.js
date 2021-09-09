export default () => {
  const container = document.createElement("div");

  const template = `
    <header>
      <h1>Ellas</h1>
    </header>
    <p><form action="" id="post-form" class="form">
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
        <button class="button-post" id="button-publicar">Publicar</button>
        <button class="button-post" id="button-descartar">Descartar</button>
      </div>
</form>
  </p>

    <footer id="rodape">
      <nav>
        <a href="">Feed</a>
        <a href="">Adicionar</a>
        <a href="">Pesquisar</a>
        <a href="">Perfil</a>
      </nav>
    </footer>
    
    `;
  container.innerHTML = template;
  //CRIAR POST
  const btn = container.querySelector("#button-publicar");
  btn.addEventListener("click", () => {
    const text = container.querySelector("#post-text").value;
    const filmName = container.querySelector("#name-film").value;
    const filmImage = container.querySelector("#input-img-film").value;
    const post = {
      text: text,
      img_film: filmImage,
      name_film: filmName,
      user_id: "Julio",
      likes: 0,
      comments: [],
    };
    const postCollection = firebase.firestore().collection("post");

    postsCollection.add(post).then((res) => {
      document.getElementById("post-text").value = "";
      loadPosts();
    });
  });

  return container;
};

//MOSTRAR POST NA TELA
function addPost(post) {
  const postTemplate = `
  <li id="${post.id}">
  ${post.data().user_id};
  ${post.data().filmImage};
  ${post.data().filmName};
  ${post.data().text};
  🤍${post.data().likes};
  ${post.data().comments}
  </li>
  `;
  document.getElementById("posts").innerHTML += postTemplate;
}

function loadPosts() {
  const postCollection = firebase.firestore().collection("post");
  document.getElementById("posts").innerHTML = "Carregando...";
  postsCollection.get().then((snap) => {
    document.getElementById("posts").innerHTML = "";
    snap.forEach((post) => {
      addPost(post);
    });
  });
}

// //DELETAR POST
// function deletePost(postId){
//   postsCollection.doc(postId).delete().then(doc => {
//     loadPosts()
//   });
// }
