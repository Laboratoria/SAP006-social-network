import {criarFirebaseconta} from "../../lib/auth.js"

export const Register = () => {
  const rootElement = document.createElement("div");
  rootElement.classList.add("register-container");
  rootElement.innerHTML = `
  <section class="login-left-section">
    <header class="login-left-section-header">
      <a>Sobre nós</a>
    </header>
    <main>
    <div>
      <img src="./images/logo-login.png"/>
    </div>
    <form>
      <div>
        <input required type="text" id="input-name">
        <label class="login-input-label">Nome</label>
      </div>
      <div>
        <input required type="email" id="input-email">
        <label class="login-input-label" id="label-input-email">Email</label>
      </div>
      <div>
        <input required type="password" id="input-password">
        <label class="login-input-label">Senha</label>
      </div>
      <label class="keep-logged-in"> Mantenha-me logadex
        <input type="checkbox" id="keep-logged-in-checkbox">
      </label>
    </form>
    <div id="print-error-here"> 
      <p class="transparent"> . </p>
    </div>
     
    <div class="login-btn-sig-log register-btn-register">
      <button id="send">REGISTRAR</button>
    </div>
  </main>
  <footer class="register-footer"> Willing &copy 2021</footer>
</section> 
`
const getEmail = rootElement.querySelector("#input-email");
getEmail.addEventListener("keyup", (event) => {
  const labelEmail = rootElement.querySelector("#label-input-email");
  const inputValue = event.target.value;
  if (inputValue.length > 1) {
    labelEmail.classList.add("login-input-label-up");
  }
});

const createAccount = rootElement.querySelector('#send');
createAccount.addEventListener('click', () => {

const checkboxKeepLoggedIn = rootElement.querySelector("#keep-logged-in-checkbox");

const name = rootElement.querySelector('#input-name').value;
const email = rootElement.querySelector('#input-email').value;
const senha = rootElement.querySelector('#input-password').value;
criarFirebaseconta(email, senha, name, checkboxKeepLoggedIn);
});


  return rootElement;
}