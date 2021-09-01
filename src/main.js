import home from "./pages/home/index.js";
import login from "./pages/login/index.js";
import cadastro from "./pages/cadastro/index.js";
import feed from "./pages/feed/index.js";
import perfil from "./pages/perfil/index.js";
import addPost from "./pages/addPost/index.js";

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
      case "#feed":
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
});

// const email = "julie_sp1990@hotmail.com";
// const password = "123456";
// firebase
// .auth()
// .createUserWithEmailAndPassword(email , password)
// .then(userCredential) => {

//   const user = userCredential.user;

// }

// .catch((error) => {
//   const errorCode = error.code;
//   const errorMessage = error.message;
// };

