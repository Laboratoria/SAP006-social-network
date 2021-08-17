import { cadastro } from './pages/cadastro/index.js';
import { home } from './pages/home/index.js';
import { postar } from './pages/postar/index.js';
import { login } from './pages/login/index.js';
import { route } from './routes/navigator.js';

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
  const destiny = window.location.pathname;

  elemento.appendChild(routes[destiny]());
};

window.addEventListener('popstate', routeRender);
window.addEventListener('load', () => {
  routeRender();
});


// const verUser = () => {
//   if (firebase.auth().currentUser.uid !== data().user_id) {
//     route('/login');
//   }
// };

// verUser();

