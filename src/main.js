// Este é o ponto de entrada da sua aplicação

import { myFunction } from "./lib/index.js";
import feed from "./pages/feed/index.js";
import perfil from "./pages/perfil/index.js";
import addPost from "./pages/addPost/index.js";
myFunction();
const main = document.querySelector("#root")

const init = () => {
    window.addEventListener("hashchange", () => {
        main.innerHTML = ""
        switch(window.location.hash){
            case "feed":
                main.appendChild(feed());
                break;
            case "#perfil":
                main.appendChild(perfil());
                break;
            case "#addPost":
                main.appendChild(addPost())
                break;
            default:
                main.appendChild(home());        
        }
    })
}

window.addEventListener("load", () => {
    main.appendChild(home());   
    init();
})

