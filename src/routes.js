import { signUp } from './lib/signUp/index.js';

const routeRender = () => {
  const element = document.querySelector("#root")
  const routes = {
    "/": signUp  
  }
  element.innerHTML = "";
  element.appendChild(routes[window.location.pathname]())
}

window.addEventListener('popstate', routeRender);
window.addEventListener('load', () => {
  routeRender()
});