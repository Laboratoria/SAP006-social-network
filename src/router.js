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
    console.log(window.location.pathname)
}

window.addEventListener("popstate", routRender);
window.addEventListener("load", () => {
    routRender();
    console.log("caiuuuuu no load")

})

export const route = (state) => {
    window.history.pushState({}, "", state);
    const popstateEvent = new PopStateEvent("popstate", { state: {} });
    dispatchEvent(popstateEvent);
};