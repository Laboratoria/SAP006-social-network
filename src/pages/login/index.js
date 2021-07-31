import { signIn } from '../../services/index.js';

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

  <span class="divider"> ou entre com </span>
  <button type="button" class="btn-google"> <span class="google-icon"></span> Google</button>
  `;

  loginScreenContainer.innerHTML = loginScreenButtons;

  const btnLogin = loginScreenContainer.querySelector('#enter-acc');
  btnLogin.addEventListener('click', signIn);

  return loginScreenContainer;
};
