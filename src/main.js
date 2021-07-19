// Este é o ponto de entrada da sua aplicação

// import { myFunction } from './lib/index.js';

// myFunction();

// Iniciando o firebase
document.addEventListener('DOMContentLoaded', function() {
  const loadEl = document.querySelector('#root');

  try {
    firebase.app();

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

  const postsCollection = firebase.firestore().collection('posts')

  postsCollection.add(post)
})

// Mostrando os posts na tela
function loadPosts()









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





