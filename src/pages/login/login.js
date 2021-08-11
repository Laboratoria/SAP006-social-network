
import { loginWithEmailAndPassword } from "../../lib/auth.js";
import { loginWithGoogle} from "../../lib/auth.js";
import { getTheRoad } from "../../router.js";
import { resetPassword } from "../../lib/auth.js";

export const Login = () => {
  const rootElement = document.createElement("div");
  rootElement.className = "login-container";
  rootElement.innerHTML = `
  <section class="login-left-section">
    <header>
      <a>Sobre nós</a>
    </header>
    <main>
      <div>
        <img src="./images/logo-login.png"/>
      </div>
      <form>
        <div>
          <input required type="email" id="input-email">
          <label class="login-input-label" id="label-input-email">Email</label>
        </div>
        <div class = "password-div" id="password-div">
          <input required type="password" class="input-password" id="input-password">
          <img class="eye" id="eye" src="./images/eye-off.png"/>
          <label class="login-input-label">Senha</label> 
        </div>
        <label class="keep-logged-in"> Mantenha-me logadex
          <input type="checkbox" id="keep-logged-in-checkbox">
        </label>
      </form>
      <div class="login-error-div" id="print-error-here"> 
        <p class="transparent"> . </p>
      </div>
      <div class="login-btn-sig-log">
        <button id="button-login">ENTRAR</button>  
        <button id="button-sign-in">CADASTRAR</button>
      </div>
      <div class="login-additionals">
        <button id="button-login-with-google"> Ou conecte-se com o gmail</button>
        <br>
        <button id="button-forgot-password"> Esqueceu a senha?</button>
      </div>
    </main>
    <footer> Willing &copy 2021</footer>
  </section> 
 
`
  const getEmail = rootElement.querySelector("#input-email");
  getEmail.addEventListener("keyup", (event) => {
    const labelEmail = rootElement.querySelector("#label-input-email");
    const inputEmailValue = event.target.value;
    if (inputEmailValue.length > 1) {
      labelEmail.classList.add("login-input-label-up");
    }
  })

  const btnSignIn = rootElement.querySelector("#button-sign-in")
  btnSignIn.addEventListener("click", () => {
   getTheRoad("/register");
  })


  const checkboxKeepLoggedIn = rootElement.querySelector("#keep-logged-in-checkbox");

  const btnLoginWithGoogle = rootElement.querySelector("#button-login-with-google")
  btnLoginWithGoogle.addEventListener("click", () => {
    loginWithGoogle(checkboxKeepLoggedIn)
  });

  const btnLogin = rootElement.querySelector('#button-login');
  btnLogin.addEventListener('click', () => {
    const inputEmail = rootElement.querySelector("#input-email").value;
    const inputPassword = rootElement.querySelector('#input-password').value;
    loginWithEmailAndPassword(inputEmail, inputPassword, checkboxKeepLoggedIn);
  });

  const btnResetPassword = rootElement.querySelector("#button-forgot-password");
  btnResetPassword.addEventListener("click", () => {
     const email = rootElement.querySelector('#input-email').value;
    resetPassword(email);
  });

  let container = rootElement.querySelector(".password-div");
  let input = rootElement.querySelector(".input-password");
  let icon = rootElement.querySelector(".eye");
  icon.addEventListener("click", function() {
    container.classList.toggle('visible');
    if (container.classList.contains('visible')) {
      icon.src = ".//images/eye.png";
      input.type = 'text';
    } else {
      icon.src = "./images/eye-off.png";
      input.type = 'password';
    }
  });

  return rootElement;
};


  

  
