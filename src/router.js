import { login } from './pages/login/index.js'
import { cadastro } from './pages/cadastro/index.js';

const routRender = () => {
  const elemento = document.getElementById("root");
  const routes = {
    "/":login,
    "/cadastro":cadastro

  }
  elemento.innerHTML = "";
  elemento.appendChild(routes[window.location.pathname]())
 /* elemento.appendChild(routes["abacaxi"]())*/
  console.log(window.location.pathname)
}

window.addEventListener("popstate", routRender);
window.addEventListener("load", () => {
  /*window.history.pushState({},"","/")*/
  routRender();
  console.log("caiuuuuu no load")

} )
