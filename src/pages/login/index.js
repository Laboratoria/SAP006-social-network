export default () => {
// export const loginScreen = () => {
  const loginScreenContainer = document.createElement('div');

  const loginScreen = `
  <img class="logo" src="image/Logotipo(1).png">
  
  <form action='/signUp'>
    <input type="email" class="signIn-input" id="input-email" placeholder="E-mail">
    <input type="password" class="signIn-input" id="input-password" placeholder="Senha">

    <button type="submit" class="btn-login" id="enter-acc">Entrar</button>

    <div class="signUp-link">
      <span> Ainda não tem conta? </span>
      <a href="/signUp"> CADASTRE-SE </a>
    </div>
  </form>

  <span class="divider"> ou entre com </span>
  <button type="button" class="btn-google"> <span class="google-icon"></span> Google</button>
  `;

  loginScreenContainer.innerHTML = loginScreen;
  const main = document.getElementById('root');
  main.appendChild(loginScreenContainer);

  // document.getElementById('enter-acc').addEventListener('click', () => {
  //   window.history.pushState({ page_id: 2 }, null, '/signUp');
  // });

  return main;
};
