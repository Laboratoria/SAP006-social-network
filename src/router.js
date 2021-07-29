import { cadastro } from "./pages/cadastro/index.js";
import { login } from "./pages/login/index.js"

const routRender = () => {
  const elemento = document.getElementById("root");
  const routes = {
    "/":login,
    "/login": login,
    "/cadastro":cadastro
  }
  elemento.innerHTML = "";
  elemento.appendChild(routes[window.location.pathname]())
}

window.addEventListener("popstate", routRender);
window.addEventListener("load", () => {
  /*window.history.pushState({},"","/")*/
  routRender();
});
