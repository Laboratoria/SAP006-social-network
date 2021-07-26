import login from './views/login/index.js';
import signup from './views/signup/index.js';
import homepage from './views/homepage/index.js';

const main = document.querySelector('#root');

const renderPage = () => {
  main.innerHTML = '';
  switch (window.location.hash) {
    case '':
      main.appendChild(login());
      break;
    case '#Cadastrar':
      main.appendChild(signup());
      break;
    case '#homepage':
      main.appendChild(homepage());
      break;
    default:
      break;
  }
};

const init = () => window.addEventListener('hashchange', renderPage);
window.addEventListener('load', () => {
  renderPage();
  init();
});

window.onload = () => {
  const loginButton = document.getElementById('login');
  loginButton.addEventListener('click', () => {
    const userEmail = document.getElementById('email');
    const userPassword = document.getElementById('password');
    firebase.auth().signInWithEmailAndPassword(userEmail.value, userPassword.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  });
};
