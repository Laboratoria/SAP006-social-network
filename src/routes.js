import { Comunique } from './pages/landing_pages/comunique.js';
import { Conecte } from './pages/landing_pages/conecte.js';
import { Welcome } from './pages/landing_pages/welcome.js';
import { Login } from './pages/login/index.js';
import { signUp } from './pages/signup/index.js';

const routeRender = () => {
  const element = document.querySelector('#root');
  const routes = {
    '/': Welcome,
    '/welcome': Welcome,
    '/conecte': Conecte,
    '/comunique': Comunique,
    '/login': Login,
    '/signup': signUp,
  };
  element.innerHTML = '';
  element.appendChild(routes[window.location.pathname]());
};

window.addEventListener('popstate', routeRender);
window.addEventListener('load', routeRender());

// export const navigation = (path, state = {}) => {
//   window.history.pushState(
//     state,
//     null,
//     path,
//   );

//   const popStateEvent = new PopStateEvent('popstate', { state: state });
//   dispatchEvent(popStateEvent);
// };
