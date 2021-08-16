
import home from './lib/index.js';

const main = document.querySelector("#root");

const init = () => {
  window.addEventListener("hashchange", () => {
    main.innerHTML = ""
    switch (window.location.hash) {
      case "":
        main.appendChild(home());
        break;
      default:
        main.appendChild(home());

    }

  })

  window.addEventListener("load", () => {
    main.appendChild(home());
    init();

    //  const email = "julieteandrade1990@gmail.com";
    //  const password = "123456";


    //  firebase.auth().signInWithEmailAndPassword(email, password)
    //  .then((userCredential) => {
    //    // Signed in
    //    const user = userCredential.user;
    //    // ...
    //    console.log("Logou");
    //  })
    //  .catch((error) => {
    //    const errorCode = error.code;
    //    const errorMessage = error.message;
    //    console.log("não logou");
  });
