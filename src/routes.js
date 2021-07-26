import { Comunique } from './lib/landing_pages/comunique.js';
import { Conecte } from './lib/landing_pages/conecte.js';
import { Welcome } from './lib/landing_pages/welcome.js';
import { Login } from './lib/login/login.js';

const routeRender = () => {
  const element = document.querySelector("#root")
  const routes = {
    "/": Welcome,
    "/welcome": Welcome,
    "/conecte": Conecte,
    "/comunique": Comunique,
    "/login": Login
  }
  element.innerHTML = "";
  element.appendChild(routes[window.location.pathname]())
}

window.addEventListener('popstate', routeRender);
window.addEventListener('load', () => {
  // window.history.pushState({}, "", "/")
  routeRender()
});