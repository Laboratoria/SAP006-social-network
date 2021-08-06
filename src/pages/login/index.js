import { signIn, signInWithGoogle } from '../../services/index.js';

export default () => {
  const loginScreenContainer = document.createElement('div');
  loginScreenContainer.setAttribute('class', 'container');

  const loginScreenButtons = `
  <img class="logo" src="image/logotipo.png">
  
  <form class="initialForm">
    <h1 class="title"> Entrar </h1>
    <input type="email" id="input-email" class="signUp-input" placeholder="E-mail">
    <input type="password" id="input-password" class="signUp-input" placeholder="Senha">

    <button type="button" id="enter-acc"  class="btn-login">Entrar</button>
    <button type="button" id="btn-google" class="btn-login"> <span class="google-icon"></span>Entrar com Google</button>
    <button type="button" id="sign-up"  class="btn-login">Criar conta</button>
    
  </form>
  `;

  loginScreenContainer.innerHTML = loginScreenButtons;

  const btnLogin = loginScreenContainer.querySelector('#enter-acc');
  btnLogin.addEventListener('click', () => {
    const inputEmail = loginScreenContainer.querySelector('#input-email').value;
    const inputPassword = loginScreenContainer.querySelector('#input-password').value;
    signIn(inputEmail, inputPassword);
  });

  const btnGoogle = loginScreenContainer.querySelector('#btn-google');
  btnGoogle.addEventListener('click', signInWithGoogle);

  const btnSignUp = loginScreenContainer.querySelector('#sign-up');
  btnSignUp.addEventListener('click', () => {
    window.location.hash = '#signUp';
  });
  return loginScreenContainer;
};
