import { Comunique } from './pages/landing_pages/comunique.js';
import { Conecte } from './pages/landing_pages/conecte.js';
import { Welcome } from './pages/landing_pages/welcome.js';
import { Login } from './pages/login/login.js';
import { signUp } from './pages/signup/signup.js';
import { Reset } from './pages/signup/reset.js';
import { Feed } from './pages/feed/feed.js';

export const routeRender = () => {
  const elementRoute = document.querySelector('#root');
  const auth = firebase.auth();
  let path = window.location.pathname;

  const routes = {
    '/': Welcome,
    '/welcome': Welcome,
    '/conecte': Conecte,
    '/comunique': Comunique,
    '/login': Login,
    '/reset': Reset,
    '/signup': signUp,
    '/feed': Feed,
  };

  auth.onAuthStateChanged((user) => {

    if (!user && (path !== '/signup' || path !== '/login')) {
      window.history.replaceState(null, null, path);
    };
    if (user && (path === '/' || path === '/login' || path === '/signup')) {
      path = '/feed';
      window.history.replaceState(null, null, path);
    };
    if (!user && (path === '/feed')) {
      path = '/login';
      window.history.replaceState(null, null, path);
      // window.location.reload();
    };

  elementRoute.innerHTML = '';
  elementRoute.appendChild(routes[path]());
  });
};

window.addEventListener('load', routeRender);
window.addEventListener('popstate', routeRender);
