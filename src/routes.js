import { Comunique } from './pages/landing_pages/comunique.js';
import { Conecte } from './pages/landing_pages/conecte.js';
import { Welcome } from './pages/landing_pages/welcome.js';
import { Login } from './pages/login/index.js';
import { signUp } from './pages/signup/index.js';
import { Reset } from './pages/signup/reset.js';
import { Feed } from './pages/feed/index.js';

export const routeRender = () => {
  const element = document.querySelector('#root');
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

  element.innerHTML = '';
  element.appendChild(routes[window.location.pathname]());

};

window.addEventListener('popstate', routeRender);
window.addEventListener('load', routeRender());

export const navigation = (path) => {
  window.history.pushState({}, null, path);

  const popStateEvent = new PopStateEvent('popstate', { state: {} });
  dispatchEvent(popStateEvent);
};
