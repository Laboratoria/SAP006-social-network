import { cadastro } from './pages/cadastro/index.js';
import { home } from './pages/home/index.js';
import { postar } from './pages/postar/index.js';
import { login } from './pages/login/index.js';

export const routeRender = () => {
  const elemento = document.getElementById('root');
  const routes = {
    '/': login,
    '/login': login,
    '/cadastro': cadastro,
    '/home': home,
    '/posts': postar,
  };
  elemento.innerHTML = '';
  let destiny = window.location.pathname;

  if (firebase.auth().currentUser === null) {
    // destiny = '/login';
  }

  elemento.appendChild(routes[destiny]());
};

window.addEventListener('popstate', routeRender);
window.addEventListener('load', () => {
  routeRender();
});
