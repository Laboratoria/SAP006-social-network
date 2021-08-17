import { registerAccount } from '../../lib/auth.js';

export const Register = () => {
  const rootElement = document.createElement('div');
  rootElement.classList.add('register-container');
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
        <div class="div-password" id="div-password">
          <input required type="password" id="input-password">
          <img class="icon-eye" id="icon-eye" src="./images/eye-off.png"/>
          <label class="login-input-label">Senha</label> 
        </div>
        <label class="checkbox-keep-logged-in"> Mantenha-me logadex
          <input type="checkbox" id="checkbox-keep-logged-in">
        </label>
      </form>
      <div id="print-error-here"> 
        <p class="transparent"> . </p>
      </div>
      <div class="login-btn-sig-log register-btn-register">
        <button id="btn-register-account">REGISTRAR</button>
      </div>
    </main>
    <footer class="register-footer"> Willing &copy 2021</footer>
  </section> 
`;
  const getUserEmail = rootElement.querySelector('#input-email');
  const getUserPassword = rootElement.querySelector('#input-password');

  getUserEmail.addEventListener('keyup', (event) => {
    const labelEmail = rootElement.querySelector('#label-input-email');
    const inputValue = event.target.value;
    if (inputValue.length > 1) {
      labelEmail.classList.add('login-input-label-up');
    }
  });

  const registerAccountBtn = rootElement.querySelector('#btn-register-account');
  registerAccountBtn.addEventListener('click', () => {
    const userName = rootElement.querySelector('#input-name').value;
    const userEmail = getUserEmail.value;
    const userPassword = getUserPassword.value;
    const checkboxKeepLoggedIn = rootElement.querySelector('#checkbox-keep-logged-in');
    registerAccount(userEmail, userPassword, userName, checkboxKeepLoggedIn);
  });

  const passwordContainer = rootElement.querySelector('#div-password');
  const eyeIcon = rootElement.querySelector('#icon-eye');
  eyeIcon.addEventListener('click', () => {
    passwordContainer.classList.toggle('visible');
    if (passwordContainer.classList.contains('visible')) {
      eyeIcon.src = './/images/eye.png';
      getUserPassword.type = 'text';
    } else {
      eyeIcon.src = './images/eye-off.png';
      getUserPassword.type = 'password';
    }
  });

  return rootElement;
};
