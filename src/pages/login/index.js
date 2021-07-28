import { loginWithEmailAndPassword } from "../../services/auth.js";
import { loginWithGoogle} from "../../services/auth.js";
import { getTheRoad } from "../../router.js";

export const Login = () => {
  const rootElement = document.createElement("div");
  rootElement.className = "login-container"
  rootElement.innerHTML = `
  <section class="login-left-section w-60">

  <header class="login-left-section-header cursor-pointer c-2f4f4f f-roboto">
    <a>Sobre nós</a>
  </header>

  <main class="main-input bg-white">
    <div class="mt-4">
      <img src="./images/logo-login.png" class="w-40"/>
    </div>

    <form class="m-vertical-6-center-left-right w-40">
      <div class="p-relative">
        <input required type="email" class="login-input w-100 mb-1 pd-b-1 pd-l-3 pd-t-4 c-2f4f4f f-roboto f-120" id="input-email">
        <label class="login-input-label p-absolute pd-2 c-696969 f-roboto f-120">Email</label>
      </div>
      <div class="p-relative">
        <input required type="password" class="login-input w-100 mb-1 pd-b-1 pd-l-3 pd-t-4 c-2f4f4f f-roboto f-120" id="input-password">
        <label class="login-input-label p-absolute pd-2 c-696969 f-roboto f-120">Senha</label>
      </div>
    </form>
    
    <div class="mt-4">
      <button class="login-input login-input-button cursor-pointer f-roboto" id="button-login">ENTRAR</button>  
      <button class="login-input login-input-button cursor-pointer f-roboto" id="button-sign-in">CADASTRAR</button>
    </div>

    <div class="mt-4">
      <button class="login-additional bg-white cursor-pointer mb-1 c-2f4f4f f-roboto" id="button-login-with-google"> Ou conecte-se com o gmail</button>
      <br>
      <button class="login-additional bg-white cursor-pointer mb-1 c-2f4f4f f-roboto"> Esqueceu a senha?</button>
    </div>

  </main>
  <footer class="mt-2 c-2f4f4f f-roboto f-80 b-2"> Willing &copy 2021</footer>
</section> 

<div class="login-right-section w-40">
  <img src="./images/background1.jpeg">
</div>
`

  const signButton = rootElement.querySelector("#button-sign-in")
  signButton.addEventListener("click", () => {
    getTheRoad("/register");
  })

  const btnLoginWithGoogle = rootElement.querySelector("#button-login-with-google")
  btnLoginWithGoogle.addEventListener("click", loginWithGoogle)


  const btnLogin = rootElement.querySelector("#button-login");
  btnLogin.addEventListener('click', () => {
  const email = rootElement.querySelector('#input-email').value;
  const pass = rootElement.querySelector("#input-password").value;
  loginWithEmailAndPassword(email, pass);
  })

   


  return rootElement;

}

