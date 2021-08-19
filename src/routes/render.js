// aqui você exportará as funções que precisa
import { routes } from "../routes/config.js";

export const routeRender = () => {
  const element = document.querySelector("#root");
  element.innerHTML = "";
  element.appendChild(routes[window.location.pathname]());
};
