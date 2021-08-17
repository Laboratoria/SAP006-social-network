
import home from "./pages/home/index.js";
import login from "./pages/login/index.js"; 
import cadastro from "./pages/cadastro/index.js";

const main = document.querySelector("#root");

const init = () => {
  window.addEventListener("hashchange", () => {
    main.innerHTML = ""
    switch (window.location.hash) {
      case "":
        main.appendChild(home());
        break;
        case "#login":
          main.appendChild(login());
      break;
      case "#cadastro":
        main.appendChild(cadastro());
        break;
        default:
        main.appendChild(home());

    }

  })
}
  window.addEventListener("load", () => {
    main.appendChild(home());
    init();

    
  });
