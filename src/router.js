import { Feed } from './pages/feed/index.js';
import { Login } from './pages/login/index.js';
import { Profile } from './pages/profile/index.js';
import { SignUp } from './pages/signup/index.js';

const routeRender = () => {
  const elements = document.getElementById('root');
  const routes = {
    '/': Login,
    '/signup': SignUp,
    '/feed': Feed,
    '/profile': Profile
  }

  elements.innerHTML = '';
  elements.appendChild(routes[window.location.pathname]());
  //elements.appendChild(routes['/signup']());
}

window.addEventListener('popstate', routeRender);
window.addEventListener('load', () => {
  routeRender();
  //console.log("tá funcionando");
})