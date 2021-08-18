import { onNavigate } from '../../navigate.js';
import { auth } from '../../lib/authentication.js';
// import { loginWithEmailAndPassword } from '../../lib/authentication.js';

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
      <input type="password" id="user-password" placeholder="Senha">
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

    const email = form['signup-email'].value;
    const password = form['signup-password'].value;
    
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      console.log(cred.user);
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();

    })
  });

  const signUpButton = signUp.querySelector('#btn-signup');
  signUpButton.addEventListener('click', () => onNavigate('signUp'));
  const userMail = signUp.querySelector('#user-email');
  const userPassword = signUp.querySelector('#user-password');


  signUp.querySelector('.fa-eye')
    .addEventListener('click', (event) => {
      const inputPassword = document.querySelector('#user-password');

      if (inputPassword.getAttribute('type') == 'password') {
        inputPassword.setAttribute('type', 'text');
      } else {
        inputPassword.setAttribute('type', 'password');
      }
    });


  return signUp;
};





  // rootTemplate.querySelector('#google-btn')
  //     .addEventListener('click', (event) => {
  //         event.preventDefault();
  //         loginWithGoogleAccount();
  //     });


  // const registerUser = signUp.querySelector('#btn-signup');
  /*
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
        // eslint-disable-next-line no-undef
        loginWithEmailAndPassword(inputEmail.value, inputPassword.value);
      });
  
    const loginButton = signUp.querySelector('#login-btn');
    loginButton.addEventListener('click', () => onNavigate('login'));*/