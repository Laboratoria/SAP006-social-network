import { login } from './pages/login/index.js';
import { cadastro } from './pages/cadastro/index.js';
import { home } from './pages/home/index.js';
import { postar } from './pages/postar/index.js';

const routRender = () => {
  const elemento = document.getElementById('root');
  const routes = {
    '/': login,
    '/login': login,
    '/cadastro': cadastro,
    '/home': home,
    '/posts': postar,
  };
  elemento.innerHTML = '';
  elemento.appendChild(routes[window.location.pathname]());
};

window.addEventListener('popstate', routRender);
window.addEventListener('load', () => {
  routRender();
});
