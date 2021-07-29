import { login } from './views/login/index.js';
import { home } from './views/homepage/index.js';
import { signup } from './views/signup/index.js';

export const renderPage = () => {
  const main = document.getElementById('root');
  const routes = {
    '/': login,
    '/home': home,
    '/cadastrar': signup,
  };
  main.innerHTML = '';
  main.appendChild(routes[window.location.pathname]());
};

window.addEventListener('popstate', renderPage);
window.addEventListener('load', () => {
  renderPage();
});
