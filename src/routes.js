import { login } from './lib/login/login.js';

const routRender = () => {
  const elemento = document.querySelector('#root');
  const routes = {
    '/': login
  };
  elemento.innerHTML = '';
  elemento.appendChild(routes['/']());
};

window.addEventListener('popstate', routRender);
window.addEventListener('load', () => {
  routRender();
});
