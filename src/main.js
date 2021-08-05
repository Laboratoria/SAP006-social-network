import timeline from './pages/Timeline/index.js'
import login from './pages/Login/index.js'
import register from './pages/Register/index.js'

const container = document.querySelector('#root');

// SINGLE PAGE APLICATION
const init = () => {
  document.querySelector('#root').innerHTML = '';
  switch (window.location.hash) {
    case '#register':
      container.appendChild(register());
      break;
    case '#timeline':
      container.appendChild(timeline());
      break;
    default:
      container.appendChild(login());
  }
};

window.addEventListener('hashchange', () => {
  init();
});

// FUNÇÃO PARA ABRIR O SITE SEMPRE NO CADASTRO E VERIFICAR SE TEVE MUDANÇA NA #
window.addEventListener('load', () => {
  // container.appendChild(login());
  init();
});

// Iniciando o firebase
document.addEventListener('DOMContentLoaded', () => {
  const loadEl = document.querySelector('#root');

  try {
    firebase.app();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        window.location.hash = 'timeline'
      }
    });
  } catch (e) {
    console.error(e);
    loadEl.textContent = 'Error loading the Firebase SDK, check the console.';
  }
});
