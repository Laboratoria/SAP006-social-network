import {registerLogin} from '../../services/index.js';

export default () => {
  console.log("cadastro");
  const container = document.createElement("div");

  const template = `
    <h2>Ellas</h2>
    <p>Uma filmografia repleta de mulheres incríveis para te inspirar!</p>
    <link rel="stylesheet" href="style.CSS">
    <div class="container">
      <div class="card">
        <h3>CRIAR UMA NOVA CONTA</h3>
        <form>
          <input required="required" autocomplete="off" type="text" placeholder="Insira seu nome" id="username"
          class='login-area'>
          <input required="required" autocomplete="off" type="email" placeholder="example@example.com" id="register-email"
          class="login-area">
          <input required="required" autocomplete="off" type="password" placeholder="Insira uma senha (Min. 6 digítos)"
          id="register-password" class="login-area">
          <div></div>
          <button class="btn button-area" id="button-register">Cadastrar</button>
        </form>
      </div>
    </div>  
  `;

  

  container.innerHTML = template;

  const name = container.querySelector("#username");
  const email = container.querySelector("#register-email");
  const password = container.querySelector("#register-password");
  const registerBtn = container.querySelector("#button-register");

  registerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    registerLogin(email.value, password.value, name.value);
    // then(() => {
    //   window.location.hash = '#feed';
  });

  return container;
};
