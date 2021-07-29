import { cadastro } from "./pages/cadastro/index.js";
import { Login } from "./pages/login/index.js"
import { home } from "./pages/home.js";

const routRender = () => {
    const elemento = document.getElementById("root");
    const routes = {
        "/": Login,
        "/cadastro": cadastro,
        "/home": home

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

})
