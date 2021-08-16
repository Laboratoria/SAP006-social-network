// import { loginWithEmailAndPassword, loginWithGoogleAccount } from '../../lib/authentication.js';
import { onNavigate } from '../../navigate.js';

export default () => {
  const login = document.createElement('div');
  const container = `

<section class="container">
  <section class="box">
    <figure class="logo">
      <img src="./assets/ellas-dev-logo.png">
    </figure>
    <h3 class="">Login</h3>
    <section class="box-input">
      <input type="email" id="user-email" name="usuario" placeholder="e-mail">
    </section>
    <section class="box-input">
      <input type="password" id="user-password" placeholder="senha">
    </section>
    <!--     <a href=''>Esqueci minha senha</a> -->
    <section class="justify-center">
      <button id="login-btn">Entrar</button>
      <p>OU</p>
      <button id="google-btn">Entrar com Google</button>
      <hr>
    </section>
    <p> Não tem uma conta?
      <a id="btn-signup" href="/#signUp"> Cadastre-se </a>
    </p>
  </section>
</section>

`;
  login.innerHTML = container;

  const loginWithEmailAndPassword = login.querySelector('#login-btn')
    .addEventListener('click', (event) => {
      event.preventDefault();
      const inputEmail = document.querySelector('user-email');
      const inputPassword = document.querySelector('user-password');
      loginWithEmailAndPassword(inputEmail.value, inputPassword.value);
    });

  // rootTemplate.querySelector('#google-btn')
  //     .addEventListener('click', (event) => {
  //         event.preventDefault();
  //         loginWithGoogleAccount();
  //     });

  const signUp = login.querySelector('#btn-signup');
  signUp.addEventListener('click', () => onNavigate('signUp'));


  return login;
};