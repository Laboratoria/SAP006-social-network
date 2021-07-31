import { SignIn, googleLogin } from '../../services/firebaseAuth.js';
import { route } from "../../router.js";

export const Login = () => {
  const rootElement = document.createElement("div");
  rootElement.setAttribute("class", "page")
  rootElement.innerHTML = `<div class="container">
    <img class="logo" src="img/logo.png" alt="GO VEG - logo">
    <div class="label-float">
      <input class="login" type="text" id="usuario" placeholder="E-mail">
      <span class="focus-input100"></span>
    </div>
    <div class="label-float">
      <input class="password" type="password" id="senha" placeholder="Senha">
      <span class="focus-input100"></span>
    </div>
    <div class="justify-enter">
      <button type="button" name="botao" id="entrar">ENTRAR</button>
    </div>
    <div class="justify-google">
      <button type="button" name="botao" id="google-login"> <img src="./img/google.png" class="google-logo" />Sign in
        with Google</button>
    </div>
    <div class="line">
      <hr>
    </div>
    <div class="justify-register">
      <a id="cadastro" href="#">Cadastre-se</a>
    </div> 
  </div>`;

  const usuario = rootElement.querySelector('#usuario');
  const passwordLogin = rootElement.querySelector('#senha');
  const signInButton = rootElement.querySelector('#entrar');

  signInButton.addEventListener('click', (e) => {
    e.preventDefault();
    SignIn(usuario.value, passwordLogin.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        window.history.pushState({}, "", "/home")
        const popstateEvent = new PopStateEvent("popstate", { state: {} })
        dispatchEvent(popstateEvent)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert('E-mail ou senha incorretos, por favor, verifique!')
      });
  });


  const botaoCadastro = rootElement.querySelector("#cadastro");
  const botaoGoogle = rootElement.querySelector("#google-login");

  botaoCadastro.addEventListener("click", (e) => {
    e.preventDefault();
    route("/cadastro");
  });

  botaoGoogle.addEventListener("click", (e) => {
    e.preventDefault();
    googleLogin();
  });

  return rootElement;
};
