import { createUser } from '../../services/index.js';

export default () => {
  const container = document.createElement('div');

  const template = `
    <div class= "container">
      <img src="" alt="" class="logo">
      <div class= "card">
        <p id="error-message" class="error-message"></p>

        <h2 class="title">Cadastrar</h2>
          <form class="form-register" action="">
            <label for="get-full-name" id="labelName" class="label-register">Nome completo</label><br>
            <input type="text" name="name" id="fullName" class="input-register"><br>
            <label for="get-email" id="labelEmail" class="label-register">Email</label><br>
            <input type="email" name="email" id="emailUser" class="input-register"><br>
            <label for="get-password" id="labelPassword" class="label-register">Senha</label><br>
            <div class="show-password">
              <i id="eye-show-register" class="fa fa-eye" aria-hidden="true"></i>
            </div>
            <input type="password" name="password" id="passwordUser">
          </form>

          <div id='msgError'></div>
          <div id='msgSuccess'></div>

          <div class="button">
            <a href="/#login">
              <button id="btn-register" class="register-button">Cadastrar</button>
              <button id="btn-home" class="home-button">Início</button>
            </a> 
      </div>
    </div>
    `;

  container.innerHTML = template;

  const btnRegister = container.querySelector('#btn-register');
  const btnHome = container.querySelector('#btn-home');

  const fullName = container.querySelector('#fullName');
  const labelName = container.querySelector('#labelName');

  const emailUser = container.querySelector('#emailUser');
  const labelEmail = container.querySelector('#labelEmail');

  const passwordUser = container.querySelector('#passwordUser');
  const labelPassword = container.querySelector('#labelPassword');

  const mailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  fullName.addEventListener('keyup', () => {
    if (fullName.value.length <= 2) {
      labelName.setAttribute('style', 'color: red');
      labelName.innerHTML = 'Nome *Insira no minimo 3 caracteres';
      fullName.setAttribute('style', 'border-color: red');
    } else {
      labelName.setAttribute('style', 'color: green');
      labelName.innerHTML = 'Nome';
      fullName.setAttribute('style', 'border-color: green');
    }
  });

  emailUser.addEventListener('keyup', () => {
    if (emailUser.value.length <= 6) {
      labelEmail.setAttribute('style', 'color: red');
      mailFormat.test(emailUser);
      labelEmail.innerHTML = 'Email *Insira no minimo 5 caracteres';
      emailUser.setAttribute('style', 'border-color: red');
    } else {
      labelEmail.setAttribute('style', 'color: green');
      labelEmail.innerHTML = 'Email';
      emailUser.setAttribute('style', 'border-color: green');
    }
  });

  passwordUser.addEventListener('keyup', () => {
    if (passwordUser.value.length <= 5) {
      labelPassword.setAttribute('style', 'color: red');
      labelPassword.innerHTML = 'Senha *Insira no minimo 6 caracteres';
      passwordUser.setAttribute('style', 'border-color: red');
    } else {
      labelPassword.setAttribute('style', 'color: green');
      labelPassword.innerHTML = 'Senha';
      passwordUser.setAttribute('style', 'border-color: green');
    }
  });

  btnRegister.addEventListener('click', (event) => {
    event.preventDefault();
    createUser(fullName.value, emailUser.value, passwordUser.value);
  });

  btnHome.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.hash = '#home';
  });

  container.querySelector('#eye-show-register')
    .addEventListener('click', (event) => {
      event.preventDefault();
      const inputPassword = document.querySelector('#passwordUser');
      if (inputPassword.getAttribute('type') === 'password') {
        inputPassword.setAttribute('type', 'text');
      } else {
        inputPassword.setAttribute('type', 'password');
      }
    }); return container;
};
