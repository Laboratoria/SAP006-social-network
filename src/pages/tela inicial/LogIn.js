import { signIn } from '../../lib/index.js';

export default () => {
  const loginScreenContainer = document.createElement('div');
  //console.log('heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
  const loginScreenButtons = `
  <img class="logo" src="image/Logotipo(1).png">
  
  <form>
    <input type="email" id="input-email" placeholder="E-mail">
    <input type="password" id="input-password" placeholder="Senha">

    <button type="button" id="enter-acc">Entrar</button>

    <div class="signUp-link">
      <span> Ainda não tem conta? </span> 
      <a href="#"> CADASTRE-SE </a>
    </div>
  </form>

  <span class="divider"> ou entre com </span>
  <button type="button" class="btn-google"> <span class="google-icon"></span> Google</button>
  `;

  loginScreenContainer.innerHTML = loginScreenButtons;

  return loginScreenContainer;
};
