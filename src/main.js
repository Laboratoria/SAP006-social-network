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

const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('Confpassword');
const newUser = document.getElementById('nonUser');
const signInButton = document.getElementById('signin-button');

const signUpButton = document.getElementById('signup-button');
const signOutButton = document.getElementById('signout-button');

// login usuarios existentes
signInButton.addEventListener('click', (e) => {
  e.preventDefault();
  // eslint-disable-next-line max-len
firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    alert(`Login feito pelo Email: ${email.value}`)
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(`Não há registro de usuário correspondente a este Email`)
  });
});
// criar novo Login de usuários
signUpButton.addEventListener('click', (e) => {
  e.preventDefault();
  // eslint-disable-next-line max-len
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log('deu bom', user);
  })
    .catch((error) => {
      newUser.innerHTML = error.message;
      console.log('deu ruim');
    });
});

// sair da conta do usuario
signOutButton.addEventListener('click', (e) => {
  e.preventDefault();
  firebase.auth().signOut();
  location.reload();
});

// Configurando as autenticações
function uiConfig() {
  return {
    signInFlow: 'popup',
    signInSuccessUrl: '#',  //login feito com sucesso: deve enviar pra dentro do site em SPA no lugar da #
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
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













