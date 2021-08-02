import { signIn, signInWithGoogle } from '../../services/index.js';

export default () => {
  const loginScreenContainer = document.createElement('div');
  const loginScreenButtons = `
  <img class="logo" src="image/Logotipo(1).png">
  
  <form>
    <input type="email" id="input-email" class="signUp-input" placeholder="E-mail">
    <input type="password" id="input-password" class="signUp-input" placeholder="Senha">

    <button type="button" id="enter-acc"  class="btn-login">Entrar</button>

    <div class="signUp-link">
      <span> Ainda não tem conta? </span> 
      <a href="#signUp"> CADASTRE-SE </a>
    </div>
  </form>

  <div class="divider">
    <hr> 
    <span class="hr-label"> ou entre com </span>
    <button type="button" id="btn-google" class="btn-google"> <span class="google-icon"></span> Google</button>
  </div>
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

  return loginScreenContainer;
};
