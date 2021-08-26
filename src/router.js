import { cadastro } from './pages/cadastro/index.js';
import { home } from './pages/home/index.js';
import { postar } from './pages/postar/index.js';
import { login } from './pages/login/index.js';
<<<<<<< HEAD
import { route } from './routes/navigator.js';
=======
// import { route } from './routes/navigator.js';

>>>>>>> 4eceadfafd488dd1b874974fd24d24267165d14a

export const routeRender = () => {
  const elemento = document.getElementById('root');
  const destiny = window.location.pathname;
  const routes = {
    '/': login,
    '/login': login,
    '/cadastro': cadastro,
    '/home': home,
    '/posts': postar,
  };
  elemento.innerHTML = '';
  elemento.appendChild(routes[destiny]());
};

window.addEventListener('popstate', routeRender);
window.addEventListener('load', () => {
  routeRender();
});

<<<<<<< HEAD
const verUser = () => {
  if (localStorage.getItem('displayName') === null) {
    route('/login');
  }
};

verUser();
=======


>>>>>>> 4eceadfafd488dd1b874974fd24d24267165d14a
