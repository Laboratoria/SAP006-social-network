import { cadastrarComEmailSenha } from "./pages/cadastro/index.js";
import { Login } from "./pages/login/index.js"

const routRender = () => {
  const elemento = document.getElementById("root");
  const routes = {
    "/":Login,
    "/cadastro":cadastrarComEmailSenha

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
