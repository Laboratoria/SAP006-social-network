// Este é o ponto de entrada da sua aplicação

// import { myFunction } from './lib/index.js';

// myFunction();

import homePage from './pages/home-page/index.js';
import register from './pages/register/index.js';
import login from './pages/login/index.js';
import feed from './pages/feed/index.js';

const main = document.querySelector('#root');

const init = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = '';
    switch (window.location.hash) {
      case '#home-page':
        main.appendChild(homePage());
        break;
      case '#register':
        main.appendChild(register());
        break;
      case '#login':
        main.appendChild(login());
        break;
      case '#feed':
        main.appendChild(feed());
        break;
      default:
        main.appendChild(homePage());
    }
  });
};

window.addEventListener('load', () => {
  main.innerHTML = '';
  main.appendChild(homePage());
  init();
});

window.addEventListener('click', () => {
  main.appendChild(register());
});

// window.addEventListener('click', () => {
//   main.appendChild(login());
//   init();
// });

// window.addEventListener('click', () => {
//   main.appendChild(feed());
//   init();
// });

// Firebase

const email = 'bruna.belo@gmail.com';
const password = '123456';

firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
  // Signed in
  const user = userCredential.user;
  console.log('deu bom', user);
  // ...
})
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log('deu ruim', errorCode, errorMessage);
  });
