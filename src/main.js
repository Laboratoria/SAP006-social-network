// Este é o ponto de entrada da sua aplicação

// import { myFunction } from './lib/index.js';

// myFunction();

// Iniciando o firebase
document.addEventListener('DOMContentLoaded', function() {
  const loadEl = document.querySelector('#root');

  try {
    firebase.app();
    loadPosts()
    configureLogin()
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
         removeLogin();
      }
    });

  } catch (e) {
    console.error(e);
    loadEl.textContent = 'Error loading the Firebase SDK, check the console.';
  }
});

// Configurando as autenticações
function uiConfig() {
  return {
    signInFlow: 'popup',
    signInSuccessUrl: '#',  //login feito com sucesso: deve enviar pra dentro do site em SPA no lugar da #
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ]
  }
}


// Mostrando autenticações na tela 
function configureLogin() {
  const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', uiConfig());
}

// Boas vindas para o usuário logado
function removeLogin() {
  document.getElementById('firebaseui-auth-container').innerHTML = `
  Que bom ver você ${firebase.auth().currentUser.displayName} <br>
  `;
};

// Botão de logout
document.getElementById('btn-logout').addEventListener('click', (event) => {
  event.preventDefault();

  firebase.auth().signOut();
  location.reload();
})

// Criando coleção no firebase chamda 'posts'
const postsCollection = firebase.firestore().collection('posts')

// Enviando posts para o firestore
document.getElementById('postForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const text = document.getElementById('postText').value;
  
  const post = {
    text: text,
    user_id: 'Patrícia',
    likes: 0,
    comments:[]
  } 

  postsCollection
    .add(post)
    .then(res => {
      text.innerHTML += ""
      loadPosts()
    })
})

// Adicionando posts 
function addPost(post) {
  const postTemplate = `
      <li id="${post.id}"> Post: ${post.data().text} | ❤ ${post.data().likes}</li>
  `
  document.getElementById('posts').innerHTML += postTemplate
}

// Mostrando os posts na tela
function loadPosts() {

  document.getElementById('posts').innerHTML = "Carregando..."

  postsCollection
    .get()
    .then(snap => {
      document.getElementById('posts').innerHTML = ""
      snap.forEach(post => {
        addPost(post)
      })
    })
}

// Deletando posts
function deletePost(postId) {
  postsCollection
    .doc(postId)
    .delete()
    .then(doc => {
      loadPosts()
    })
}

document.getElementById('btn-deletePost').addEventListener('click', (event) => {
  event.preventDefault()
  deletePost("0naYLmyjJHydqRQJFuPG")
})









// const email = 'patricia.argetlam@gmail.com';
// const password = '123456';


//Login de novos usuários

// firebase
//   .auth()
//   .createUserWithEmailAndPassword(email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     console.log('deu bom', user)
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;

//     console.log('deu ruim', errorCode, errorMessage);
//     // ..
//   });


// //Login de usuários existentes

// firebase.auth().signInWithEmailAndPassword(email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;

//     console.log('logou!')
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;

//     console.log('não logou')
//   });





