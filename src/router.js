import { getTheRoad } from './lib/auth.js';
import { Register } from './pages/register/register.js';
import { Login } from './pages/login/login.js';
import { Feed } from './pages/feed/feed.js';
import { Profile } from './pages/perfil/main.js';

const routRender = () => {
  const elemento = document.getElementById('root');
  const routes = {
    '/': Login,
    '/register': Register,
    '/feed': Feed,
    '/profile': Profile,
  };
  elemento.innerHTML = '';

  const createChild = (path) => {
    elemento.appendChild(routes[path]());
  };

  switch (window.location.pathname) {
    case '/':
      createChild('/');
      break;
    case '/register':
      createChild('/register');
      break;
    default:
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          createChild(window.location.pathname);
        } else {
          getTheRoad('/');
        }
      });
      break;
  }
};

window.addEventListener('popstate', routRender);
window.addEventListener('load', routRender);
