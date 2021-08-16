import {
  onNavigate
} from '../../navigate.js';

// import { loginWithEmailAndPassword, loginWithGoogleAccount } from '../../lib/authentication.js';

export default () => {
  const signUp = document.createElement('div');
  const container = `
    <section class="container">
      <form class="box">
        <figure class="logo">
          <img src="./assets/ellas-dev-logo.png">
        </figure>
        <h1 class="">Cadastre-se</h1>
        <section class="box-input">
          <input type="name" id="user-name" name="usuario" placeholder="usuário">
        </section>
        <section class="box-input">
          <input type="email" id="user-email" name="email" placeholder="e-mail">
        </section>
        <section class="box-input">
          <input type="email" id="user-email-confirm" name="confirmaUsuario" placeholder="confirme seu e-mail">
        </section>
        <section class="box-input">
          <input type="password" id="user-password" placeholder="senha">
        </section>
        <section class="box-input">
          <input type="password" id="user-password-confirm" placeholder="confirme sua senha">
        </section>
        <section class="justify-center">
          <button id="btn-signup">Enviar</button>
          <hr>
        </section>
        <p> Já tem uma conta?
          <a id="login-btn" href="/#login"> Login </a>
        </p>
      </form>
  </section>

`;
  signUp.innerHTML = container;


  // rootTemplate.querySelector('#google-btn')
  //     .addEventListener('click', (event) => {
  //         event.preventDefault();
  //         loginWithGoogleAccount();
  //     });

  const signUpButton = signUp.querySelector('#btn-signup');
  signUpButton.addEventListener('click', () => onNavigate('signUp'));

  //const username = signUp.querySelector('#user-name');
  const userMail = signUp.querySelector('#user-email');
  const userPassword = signUp.querySelector('#user-password');
  //const registerUser = signUp.querySelector('#btn-signup');

  signUp.querySelector('#btn-signup')
    .addEventListener('click', (event) => {
      event.preventDefault();
      onNavigate(signUp);
    });

  signUp.querySelector('#login-btn')
    .addEventListener('click', (event) => {
      event.preventDefault();
      const inputEmail = document.querySelector(userMail);
      const inputPassword = document.querySelector(userPassword);
      loginWithEmailAndPassword(inputEmail.value, inputPassword.value);
    });

  const loginButton = signUp.querySelector('#login-btn');
  loginButton.addEventListener('click', () => onNavigate('login'));


  return signUp;
};

/*
export default () => {
  const signUp = document.createElement('div');
  const container = `
   
<section class="container">
  <form class="box">
    <figure class="logo">
      <img src="./assets/ellas-dev-logo.png">
    </figure>
    <h1 class="">Cadastre-se</h1>
    <section class="box-input">
      <input type="name" id="user-name" name="usuario" placeholder="usuário">
    </section>
    <section class="box-input">
      <input type="email" id="user-email" name="email" placeholder="e-mail">
    </section>
    <section class="box-input">
      <input type="email" id="user-email-confirm" name="confirmaUsuario" placeholder="confirme seu e-mail">
    </section>
    <section class="box-input">
      <input type="password" id="user-password" placeholder="senha">
    </section>
    <section class="box-input">
      <input type="password" id="user-password-confirm" placeholder="confirme sua senha">
    </section>
    <section class="justify-center">
      <button id="btn-signup">Enviar</button>
      <hr>
    </section>
    <p> Já tem uma conta?
      <a id="login-btn" href="/#login"> Login </a>
    </p>
  </form>
</section>

`;

    signUp.innerHTML = container;

  const username = signUp.querySelector('#user-name');
  const userMail = container.querySelector('#user-email');
  const userPassword = container.querySelector('#user-password');
  const registerUser = container.querySelector('#btn-signup');

    signUp.querySelector('#btn-signup')
        .addEventListener('click', (event) => {
            event.preventDefault();
            onNavigate(signUp);
        });

    signUp.querySelector('#login-btn')
        .addEventListener('click', (event) => {
            event.preventDefault();
            const inputEmail = document.querySelector('user-email');
            const inputPassword = document.querySelector('user-password');
            loginWithEmailAndPassword(inputEmail.value, inputPassword.value);
        });

    const login = signUp.querySelector('#login-btn');
    login.addEventListener('click', () => onNavigate('login'));
    
    return signUp;

};
*/