import { signOut } from "../../services/index.js";

export default () => {
  const user = firebase.auth().currentUser;

  if (!user) {
    signOut();
  }
  const timeline = document.createElement("div");
  timeline.innerHTML = `
  <link rel="stylesheet" href="./pages/Timeline/style.css" />

  <div class="banner-menu">
    <div class="banner">
      <img src="assets/logo.png" alt="Logo">
      <div class="title-container">
          <h1 class="title">SeriesDay</h1>
          <h3 class="subtitle">review de séries</h3>
      </div>
    </div>

    <input id="navbar" type='checkbox' class="input">
    <label for="navbar">
      <div class='menu'>
          <span class='hamburger'></span>
      </div>
    </label>

    <ul class="inside-menu">
      <div class="profile-container">
        <li class="upload-photo">
          <img id="preview" src="${user.photoURL || "../../assets/default-user-img.png"}" class="user-photo-menu">
          <input type="checkbox" id="nope" />
          <div class="photo-buttons">
            <label class="labelfile"for="photo">Selecionar Imagem</label>
            <input type="file" id="photo" class="input-img" accept=".jpg, .jpeg, .png">
            <button id="uploadImage" class="enviar-button destkop-upload-image">Enviar</button>
            <label for="nope"></label>
          </div>
          <label class="arrow" for="nope"></label>
        </li>
        <li>
          <p class="username-menu"> <b>${user.displayName || "Usuário"} </b> </p>
        </li>
        <li>
          <p class="email-menu"> ${user.email || "usuario@email.com"} </p>
        </li>
      </div>

      <button id="signout-button" class="signout-button buttons">
        <img src="./assets/exit.png" alt="Ícone de Saída">
      </button>
    </ul>
  </div>
  
  <form action="" id="postForm" class="post-form">
    <textarea type="textarea" id="postText" class="post-textarea" rows="5" cols="50" placeholder="Digite aqui sua review..."></textarea>
    <button type="submit" class="buttons post-button"> Publicar </button>
  </form>

  <ul id="posts" class="li-post-container"></ul>
    
  <div class="desktop-profile-container">
    <li class="upload-photo">
      <img id="preview" src="${user.photoURL || "../../assets/default-user-img.png"}" class="user-photo-menu desktop-preview">
      <input type="checkbox" id="desktop-nope" />
      <div class="desktop-photo-buttons">
        <label class="labelfile"for="photo">Selecionar Imagem</label>
        <input type="file" id="photo" class="input-img desktop-photo" accept=".jpg, .jpeg, .png">
        <button id="uploadImage" class="enviar-button desktop-upload-image">Enviar</button>
        <label for="desktop-nope"></label>
      </div>
      <label class="arrow" for="desktop-nope"></label>
    </li>
    <li>
      <p class="username-menu"> <b>${user.displayName || "Usuário"} </b> </p>
    </li>
    <li>
      <p class="email-menu"> ${user.email || "usuario@email.com"} </p>
    </li>
  </div>

  <button id="desktop-signout-button" class="signout-button desktop-signout-button buttons">
    <img src="./assets/exit.png" alt="Ícone de Saída">
  </button>

  `;

  // Sair da conta do usuário (MOBILE)
  timeline.querySelector("#signout-button").addEventListener("click", (e) => {
    e.preventDefault();
    signOut();
  });

  // Sair da conta do usuário (DESKTOP)
  timeline.querySelector(".desktop-signout-button").addEventListener("click", (e) => {
      e.preventDefault();
      signOut();
    });

  // Criando coleção no firebase chamada 'posts'
  const postsCollection = firebase.firestore().collection("posts");

  // Enviando posts para o firestore
  timeline.querySelector("#postForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const text = timeline.querySelector("#postText").value;

    if(text) {
      const getDate = () => {
        const date = new Date();
        return date.toLocaleString("pt-BR");
      };
      const post = {
        text: text,
        likes: 0,
        date: getDate(),
        id: user.uid,
        email: user.email,
      };
      postsCollection.add(post).then(() => {
        timeline.querySelector("#postText").value = "";
        loadPosts();
      });
    }
    else {
      alert('Por favor, digite uma review antes de publicar.');
    }
  });

  // Adicionando posts
  function createTemplatePost(post, postUser) {
    const postTemplate = `
      <li data-templatepost class="posts-box">
        <div id="${post.id}"class="post-container">
          <div class="user-container">
            <img src="${postUser.data().photo || "../../assets/default-user-img.png"}" class="user-photo">
            <div class="username-date-container">
              <p class="username"> ${postUser.data().name || "Usuário"} </p>
              <time class="date">${post.data().date}</time>
            </div>
          </div>
        
          <div id=${post.id}>
            <textarea disabled class="post" rows="4" cols="50">${post.data().text}</textarea>
            <div id=${post.id} class="edit-container display-none">
              <textarea class="post edited-post display-none" rows="4" cols="50">${post.data().text}</textarea>

              <p class="empty-text"></p>
            
              <div id=${post.id} class="edit-buttons-container">
                <button data-close class='close-edit-button buttons display-none' type='button'> Cancelar </button>
                <button data-save class='save-edit-button buttons display-none' type='button'>Salvar</button>
              </div>
            </div>
          </div>

          <div id=${post.id} class="buttons-container">
            <button class="likePost-btn timeline-buttons"> 
              <img src="./assets/heart.png" alt="Ícone de Coração">
              ${post.data().likes}
            </button>  

            <div id=${post.id}>
              <button class="editPost-btn timeline-buttons">
                <img data-edit src="./assets/pencil.png" alt="Ícone de Lápis">
              </button>
              <button class="deletePost-btn timeline-buttons">
                <img src="./assets/trash.png" alt="Ícone de Lixeira">
              </button>
            </div>
          </div>
        </div> 
      </li>
    `;

    const postBox = timeline.querySelector("#posts");
    postBox.innerHTML += postTemplate;

    // Deletar posts
    const deleteButtons = postBox.querySelectorAll(".deletePost-btn");
    for (const button of deleteButtons) {
      button.addEventListener("click", (event) => {
        const deleteConfirmation = confirm("Tem certeza quer deseja deletar esse post?");
        if (deleteConfirmation) {
          deletePost(event.currentTarget.parentNode.id);
        } else {
          return false;
        }
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

    // Curtir e descurtir posts
    const likeButtons = postBox.querySelectorAll(".likePost-btn");

    for (const button of likeButtons) {
      button.addEventListener("click", (event) => {
        likePost(event.currentTarget.parentNode.id);
      });
    }

    function likePost(id) {
      const promiseLikes = postsCollection
        .doc(id)
        .get()
        .then((post) => {
          const countLikes = post.data().likes;
          if (countLikes >= 1) {
            postsCollection
              .doc(id)
              .update({
                likes: post.data().likes - 1,
              })
              .then(() => {
                loadPosts();
              });
          } else {
            postsCollection
              .doc(id)
              .update({
                likes: post.data().likes + 1,
              })
              .then(() => {
                loadPosts();
              });
          }
        });
      return promiseLikes.then();
    }

    const postLi = timeline.querySelectorAll('[data-templatePost]');
    // Abrir área de editar post
    function openEditPost(element) {
      element.querySelector(".edited-post").classList.remove("display-none");
      element.querySelector(".save-edit-button").classList.remove("display-none");
      element.querySelector(".close-edit-button").classList.remove("display-none");
      element.querySelector(".edit-container").classList.remove("display-none");
    }
    
    for (const openEdit of postLi) {
      openEdit.addEventListener('click', (e) => {
        const target = e.target;
        if (target.dataset.edit === '') {
          openEditPost(openEdit);
        }
      });
    }

    // Fechar área de editar post
    function closeEditPost(element) {
      element.querySelector(".edited-post").classList.add("display-none");
      element.querySelector(".save-edit-button").classList.add("display-none");
      element.querySelector(".close-edit-button").classList.add("display-none");
      element.querySelector(".edit-container").classList.add("display-none");
      element.querySelector(".empty-text").innerHTML = "";
    }

    for (const closeEdit of postLi) {
      closeEdit.addEventListener('click', (e) => {
        const target = e.target;
        if (target.dataset.close === '') {
          closeEditPost(closeEdit);
        }
      });
    }

    // Editar post
    function editPost(newPost, id) {
      postsCollection
        .doc(id)
        .update({
          text: newPost,
        })
        .then(() => {
          loadPosts();
        });
    }

    for (const buttonSave of postLi) {
      buttonSave.addEventListener('click', (e) => {
        const editedPost = buttonSave.querySelector('.edited-post').value;
        const target = e.target;
        if (target.dataset.save === '') {
          e.preventDefault();
          if (editedPost) {
            editPost(editedPost, e.target.parentNode.id);
          } else {
            const emptyText = buttonSave.querySelector(".empty-text");
            emptyText.style.color = 'red';
            emptyText.innerHTML = 'Edite sua review antes de salvar.';
          }
        }
      });
    }

    // Visibilidade dos botões de editar e deletar
    // const visibilityOfButtons = (timeline, user) => {
    //   if (user !== firebase.auth().currentUser.email) {
    //     timeline.querySelector('.deletePost-btn').classList.add('visibility-hidden');
    //     timeline.querySelector('.editPost-btn').classList.add('visibility-hidden');
    //   }
    // };

    // visibilityOfButtons(timeline, user);
  }

  // Adicionando foto do perfil (MOBILE)
  const uploadImage = timeline.querySelector("#uploadImage");
  uploadImage.addEventListener("click", () => {
    console.log("botão de upa img");
    const ref = firebase.storage().ref();
    const file = timeline.querySelector("#photo").files[0];
    const name = `${new Date()}-${file.name}`;
    const metadata = {
      contentType: file.type,
    };
    const task = ref.child(name).put(file, metadata);
    task
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => {
        console.log(url);
        console.log("imagem upada");
        const image = timeline.querySelector("#preview");
        image.src = url;
        const userUp = firebase.auth().currentUser;
        userUp.updateProfile({
          photoURL: url,
        });
        location.reload();
      });
  });

  // Adicionando foto do perfil (DESKTOP)
  const uploadImageDestkop = timeline.querySelector(".desktop-upload-image");
  uploadImageDestkop.addEventListener("click", () => {
    console.log("botão de upa img");
    const ref = firebase.storage().ref();
    const file = timeline.querySelector(".desktop-photo").files[0];
    const name = `${new Date()}-${file.name}`;
    const metadata = {
      contentType: file.type,
    };
    const task = ref.child(name).put(file, metadata);
    task
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => {
        console.log(url);
        console.log("imagem upada");
        const image = timeline.querySelector(".desktop-preview");
        image.src = url;
        const userUp = firebase.auth().currentUser;
        userUp.updateProfile({
          photoURL: url,
        });
        location.reload();
      });
  });

  // Mostrando os posts na tela
  function loadPosts() {
    timeline.querySelector('#posts').innerHTML = '<span class="loading-post">Carregando posts...</span>';

    postsCollection.orderBy('date', 'desc').get().then((snap) => {
      timeline.querySelector('#posts').innerHTML = '';
      snap.forEach((post) => {
        const users = firebase.firestore().collection('users').doc(post.data().email);
        users.get().then((postUser) => {
          createTemplatePost(post, postUser);
        });
      });
    });
  }

  loadPosts();

  return timeline;
};
