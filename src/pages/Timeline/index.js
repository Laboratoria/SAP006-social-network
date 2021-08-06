import { signOut } from '../../services/index.js';

export default () => {
  const user = firebase.auth().currentUser;
  if(!user){
    signOut();
  }
  const timeline = document.createElement('div');
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
          <img id="preview" src="${user.photoURL || '../../assets/default-user-img.png'}" class="user-photo-menu">
          <input type="checkbox" id="nope" />
          <div class="photo-buttons">
            <label class="labelfile"for="photo">Selecionar Imagem</label>
            <input type="file" id="photo" class="inputImg" accept=".jpg, .jpeg, .png">
            <button id="uploadImage" class="enviar-button">Enviar</button>
            <label for="nope"></label>
          </div>
          <label class="arrow" for="nope"></label>
        </li>
        <li>
          <p class="username-menu"> <b>${user.displayName || 'Usuário'} </b> </p>
        </li>
        <li>
          <p class="email-menu"> ${user.email || 'Usuário'} </p>
        </li>
      </div>

      <button id="signout-button" class="signout-button buttons">
        <img src="./assets/exit.png" alt="Ícone de Saída">
      </button>
    </ul>
  </div>
    <form action="" id="postForm">
      <textarea type="textarea" id="postText" class="post-textarea" rows="5" cols="50" placeholder="Digite aqui sua review..."></textarea>
      <button type="submit" class="buttons post-button"> Publicar </button>
    </form>

    <ul id="posts"></ul>

  `;

  // Sair da conta do usuário
  timeline.querySelector('#signout-button').addEventListener('click', (e) => {
    e.preventDefault();
    signOut();
  });

  // Criando coleção no firebase chamada 'posts'
  const postsCollection = firebase.firestore().collection('posts');

  // Enviando posts para o firestore
  timeline.querySelector('#postForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const text = timeline.querySelector('#postText').value;

    const getDate = () => {
      const date = new Date();
      return date.toLocaleString('pt-BR');
    };

    const post = {
      user: firebase.auth().currentUser.email,
      text: text,
      likes: 0,
      date: getDate(),
    };

    postsCollection.add(post).then(() => {
      timeline.querySelector('#postText').value = '';
      loadPosts();
    });
  });

  // Adicionando posts
  function createTemplatePost(post) {
    const postTemplate = `
      <li class="posts-box">
        <div id="${post.id}"class="post-container">
          <div class="user-container">
            <img src="${user.photoURL || '../../assets/default-user-img.png'}" class="user-photo">
            <div class="username-date-container">
              <p class="username"> ${user.displayName || 'Usuário'} </p>
              <time class="date">${post.data().date}</time>
            </div>
          </div>
        
          <div id=${post.id}>
            <textarea disabled class="post"> ${post.data().text} </textarea>
            <div id=${post.id} class="edit-container display-none">
              <textarea class="post edited-post display-none" placeholder="Escreva seu novo post..."></textarea>

              <p class="empty-text"></p>
            
              <div id=${post.id} class="edit-buttons-container">
                <button class='close-edit-button buttons display-none' type='button'> Cancelar </button>
                <button class='save-edit-button buttons display-none' type='button'>Salvar</button>
              </div>
            </div>
          </div>

          <div id=${post.id} class="like-comment">
            <button class="likePost-btn timeline-buttons">❤️ ${post.data().likes}</button>  
          </div>
        </div>
          
        <div id=${post.id} class="buttons-container">
          <button class="editPost-btn timeline-buttons">✏️</button>
          <button class="deletePost-btn timeline-buttons">🗑️</button>
        </div>
      </li>
    `;

    const postBox = timeline.querySelector('#posts');
    postBox.innerHTML += postTemplate;

    // Deletar posts
    const deleteButtons = timeline.querySelectorAll('.deletePost-btn');
    for (const button of deleteButtons) {
      button.addEventListener('click', (event) => {
        const deleteConfirmation = confirm('Tem certeza quer deseja deletar esse post?');
        if (deleteConfirmation) {
          deletePost(event.target.parentNode.id);
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
    const likeButtons = timeline.querySelectorAll('.likePost-btn');

    for (const button of likeButtons) {
      button.addEventListener('click', (event) => {
        likePost(event.target.parentNode.id)
      });
    }

    function likePost(id) {
      const promiseLikes = postsCollection.doc(id).get().then((post => {
        const countLikes = post.data().likes;
        if(countLikes >= 1) {
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
      }))
      return promiseLikes.then()
    }

    // Abrir área de editar post
    const editButtons = timeline.querySelectorAll('.editPost-btn');

    for (const button of editButtons) {
      button.addEventListener('click', () => {
        openEditPost(postBox);
      });
    }

    function openEditPost(element) {
      element.querySelector('.edited-post').classList.remove('display-none');
      element.querySelector('.save-edit-button').classList.remove('display-none');
      element.querySelector('.close-edit-button').classList.remove('display-none');
      element.querySelector('.edit-container').classList.remove('display-none');
    }

    // Fechar área de editar post
    const closeEditButtons = timeline.querySelectorAll('.close-edit-button');

    for (const button of closeEditButtons) {
      button.addEventListener('click', () => {
        closeEditPost(postBox);
      });
    }

    function closeEditPost(element) {
      element.querySelector('.edited-post').classList.add('display-none');
      element.querySelector('.save-edit-button').classList.add('display-none');
      element.querySelector('.close-edit-button').classList.add('display-none');
      element.querySelector('.edit-container').classList.add('display-none');
      element.querySelector('.empty-text').innerHTML = '';
    }

    // Editar post
    const saveEditPost = timeline.querySelectorAll('.save-edit-button');
    const emptyText = timeline.querySelector('.empty-text');

    for (const button of saveEditPost) {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const editedPost = timeline.querySelector('.edited-post').value;
        if(editedPost) {
          editPost(editedPost, event.target.parentNode.id)
        }
        else {
          emptyText.style.color = 'red';
          emptyText.innerHTML = 'Escreva uma nova review antes de salvar.'
        } 
      })
    }

    function editPost (newPost, id) {
      postsCollection
        .doc(id)
        .update({
          text: newPost
        })
        .then(() => {
          loadPosts();
        }); 
    };

    // Visibilidade dos botões de editar e deletar
    // const visibilityOfButtons = (document, user) => {
    //   if (user !== firebase.auth().currentUser.email) {
    //     document.querySelector('.deletePost-btn').classList.add('visibility-hidden');
    //     document.querySelector('.editPost-btn').classList.add('visibility-hidden');
    //   }
    // };

    // visibilityOfButtons(document, user);
  }

  // Adicionando foto do perfil
  const uploadImage = timeline.querySelector('#uploadImage');
  uploadImage.addEventListener('click', () => {
    console.log('botão de upa img');
    const ref = firebase.storage().ref();
    const file = timeline.querySelector('#photo').files[0];
    const name = `${new Date()}-${file.name}`;
    const metadata = {
      contentType: file.type,
    };
    const task = ref.child(name).put(file, metadata);
    task
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => {
        console.log(url);
        console.log('imagem upada');
        const image = timeline.querySelector('#preview');
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

    postsCollection.get().then((snap) => {
      timeline.querySelector('#posts').innerHTML = '';
      snap.forEach((post) => {
        createTemplatePost(post);
      });
    });
  }

  loadPosts();

  return timeline;
};
