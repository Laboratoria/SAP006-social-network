import { Register } from "./pages/register/register.js";
import { Login } from "./pages/login/login.js"
import { Feed } from "./pages/feed/feed.js"

const routRender = () => {
  const elemento = document.getElementById("root");
  const routes = {
    "/":Login,
    "/register":Register,
<<<<<<< HEAD
    //"/feed" : feed (aqui construir a página)
=======
    "/feed":Feed
>>>>>>> 08ef583c5e7d77853bba0aa281137c164799bcb5
  }
  elemento.innerHTML = "";
  elemento.appendChild(routes[window.location.pathname]())
 /* elemento.appendChild(routes["pathname"]())*/
  console.log(window.location.pathname)
}

window.addEventListener("popstate", routRender);
window.addEventListener("load", () => {
  /*window.history.pushState({},"","/")*/
  routRender();
  console.log("caiuuuuu no load")

});

export const getTheRoad = (state) => {
  window.history.pushState({}, "", state);
  const popstateEvent = new PopStateEvent("popstate", {state:{}});
  dispatchEvent(popstateEvent);
}