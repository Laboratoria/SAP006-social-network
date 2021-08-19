// Este é o ponto de entrada da sua aplicação
//import SingIn from "./Pages/SingIn/index";
import { routeRender } from "./routes/render.js";
//import { myFunction } from './lib/index.js';
window.addEventListener("popstate", routeRender);
window.addEventListener("load", routeRender);

//myFunction();

/*const email = "beaferraz@gmail.com";
const password = "123456";

firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log("deu bom", user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log("deu ruim", errorCode, errorMessage);
  });
*/
