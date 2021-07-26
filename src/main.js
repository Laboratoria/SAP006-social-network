/*
import login from './lib/login/login';
import landing from './lib/landing';


import { signUp } from './lib/signup';

const div = document.querySelector('#root');

const init = () => {
  window.addEventListener('hashchange', () => {
    switch (window.location.hash) {
      default:
        div.appendChild(login());
        break;
      case ' ':
        div.appendChild(login());
    }
  });
};

window.addEventListener('load', () => {
  div.appendChild(login());
  init();
});

const main = document.querySelector('#root');

window.addEventListener('load', () => {
  main.appendChild(landing())
});

firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });

firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });

window.addEventListener('load', () => {

})
*/
