import { Login } from './pages/login/index.js';
import { SignUp } from './pages/signup/signup.js';

const routeRender = () => {
  const elements = document.getElementById('root');
  const routes = {
    '/': Login,
    '/signup': SignUp
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