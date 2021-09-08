import { onNavigate } from '../../navigate.js';
// import { auth } from '../../lib/authentication.js';
import { cadastrarsenha } from '../../lib/authentication.js';

export default () => {
  const signUp = document.createElement('div');
  const container = `
    <section id="modal-signup" class="container">
    <div class="box">
      <figure class="logo">
        <img src="./img/ellas-dev-logo.png">
      </figure>
      <h1 class="">Cadastre-se</h1>
      <form id="form">
        <section class="box-input">
          <input type="email" id="signup-email" name="email" placeholder="Email">
        </section>
         <section class="box-input">
      <input type="password" id="signup-password" placeholder="Senha">
      <i id="verSenha" class="fa fa-eye" aria-hidden="true"></i>
    </section>
        <section class="justify-center">
          <button type="submit" id="btn-signup">Cadastrar</button>
          <hr>
        </section>
        <p> Já tem uma conta?
          <a id="login-btn" href="/#login"> Login </a>
        </p>
      </form>
    </div>
  </section>
`;
  signUp.innerHTML = container;

  const signupForm = signUp.querySelector('#form');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    cadastrarsenha(email, password).then(() => {
      const modal = document.querySelector('#modal-signup');
      modal.getInstance(modal).close();
      signupForm.reset();
    });
  });

  const signUpButton = signUp.querySelector('#btn-signup');
  signUpButton.addEventListener('click', () => onNavigate('signUp'));

  signUp.querySelector('.fa-eye')
    .addEventListener('click', () => {
      const inputPassword = document.querySelector('#signup-password');

      if (inputPassword.getAttribute('type') === 'password') {
        inputPassword.setAttribute('type', 'text');
      } else {
        inputPassword.setAttribute('type', 'password');
      }
    });

  return signUp;
};
