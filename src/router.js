import { Register } from "./pages/register/index.js";
import { Login } from "./pages/login/index.js";
import { Feed } from "./pages/feed/index.js";

const routRender = () => {

  const elemento = document.getElementById("root");

  const routes = {
    "/":Login,
    "/register":Register,
    "/feed":Feed
  }

  elemento.innerHTML = "";
  elemento.appendChild(routes[window.location.pathname]())
}

window.addEventListener("popstate", routRender);
window.addEventListener("load", () => {
  routRender();
});

export const getTheRoad = (state) => {
  window.history.pushState({}, "", state);
  const popstateEvent = new PopStateEvent("popstate", {state:{}})
  dispatchEvent(popstateEvent)
}