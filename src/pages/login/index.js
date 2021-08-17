import { loginWithEmailAndPassword } from '../../lib/authentication.js';
import { onNavigate } from '../../navigate.js';

export default () => {
  const login = document.createElement('div');
  const container = `

<section id="container-login" class="container">
  <section class="box">
    <figure class="logo">
      <img src="./assets/ellas-dev-logo.png">
    </figure>
    <h3 class="">Login</h3>
    <section class="box-input">
      <input type="email" id="user-email" name="usuario" placeholder="Email">
    </section>
    <section class="box-input">
      <input type="password" id="user-password" placeholder="Senha">
      <i id="verSenha" class="fa fa-eye" aria-hidden="true"></i>
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



  // const btn = document.querySelector('.fa-eye')
  // btn.addEventListener('click', () => {
  //   const inputPassword = document.querySelector('#user-password')

  //   if (inputPassword.getAttribute('type') == 'password') {
  //     inputPassword.setAttribute('type', 'text')
  //   } else {
  //     inputPassword.setAttribute('type', 'password')
  //   }
  // })

  const loginButton = login.querySelector('#login-btn')
  loginButton.addEventListener('click', (event) => {
    event.preventDefault();
    const inputEmail = login.querySelector('#user-email');
    const inputPassword = login.querySelector('#user-password');
    loginWithEmailAndPassword(inputEmail.value, inputPassword.value);
  });

  // rootTemplate.querySelector('#google-btn')
  //     .addEventListener('click', (event) => {
  //         event.preventDefault();
  //         loginWithGoogleAccount();
  //     });

  const signUp = login.querySelector('#btn-signup');
  signUp.addEventListener('click', () => onNavigate('#signUp'));


  return login;

};