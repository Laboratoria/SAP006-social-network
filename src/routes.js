import { login } from './pages/login.js';
import { register } from './pages/register.js';
import { feed } from './pages/feed.js';

const routes = {
  '': login,
  '#register': register,
  '#feed': feed,
  //        '/reset': reset
};

function renderPage() {
  const url = window.location.hash;
  const page = routes[url]();
  const divRoot = document.getElementById('root');
  divRoot.innerHTML = '';
  divRoot.appendChild(page);
}

window.addEventListener('hashchange', renderPage);
window.addEventListener('load', () => {
  renderPage();
});

/* document.addEventListener('DOMcontent', () => {
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

/* const init = () => {
  document.querySelector('#root').innerHTML = '';
  switch (window.location.hash) {
    case '#register':
      c.appendChild(register());
      break;
    case '#timeline':
      container.appendChild(feed());
      break;
    default:
      container.appendChild(login());
  }
};
*/
