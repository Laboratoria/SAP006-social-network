import loginpage from "./pages/loginpage/index.js"
import registerpage from "./pages/registerpage/index.js"
import mainscreen from "./pages/mainscreen/index.js"

const main = document.querySelector("#root")
const pagebuttons = document.querySelector("#pagebuttons")
const signup = document.querySelector("#signup")

//quando a página carregar a tela de login vai aparecer dentro do main

window.addEventListener("load", () => {
  main.innerHTML = ""
  main.appendChild(loginpage());
  signup.style.display = "none";
})

//ao clicar no botao de login, o firebase irá autenticar o email
//e senha inseridos e redirecionar para a tela principal
//!criar função que verifica se o login foi feito ou nao para então redirecionar o usuário

const login = document.querySelector("#login");
login.addEventListener("click", () => {
  const emailContent = document.querySelector("#emailogin");
  const email = emailContent.value;
  const passContent = document.querySelector("#passlogin");
  const password = passContent.value;
  console.log(email, password)

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("logou")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("nao logou")
    });

  main.innerHTML = "";
  pagebuttons.innerHTML = "";
  main.appendChild(mainscreen());
});

//ao clicar em cadastrar-se, o usuário será redirecionado 
//para a tela de cadastro onde o firebase irá criar o novo usuário
//!criar função para comparar se os emails e senhas conferem

const register = document.querySelector("#register");
register.addEventListener("click", () => {
  main.innerHTML = "";
  pagebuttons.innerHTML = "";
  main.appendChild(registerpage());
  signup.style.display = "block";
  signup.addEventListener("click", () => {
    const emailContent = document.querySelector("#newemail");
    const email = emailContent.value;
    const passContent = document.querySelector("#newpass");
    const password = passContent.value;
    console.log(email, password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("deu bom")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("deu ruim")
        // ..
      });
  });
});

//login com o google

const googleLogin = document.querySelector("#google-login")

const resultLogin = googleLogin.addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithRedirect(provider);
})

if(resultLogin != ""){
  firebase.auth()
  .getRedirectResult()
  .then((result) => {
    if (result.credential) {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
    console.log("logou")
    main.innerHTML = "";
    pagebuttons.innerHTML = "";
    main.appendChild(mainscreen());
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    console.log("deu merda")
  });
}
