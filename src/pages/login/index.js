export default () => {
  const container = document.createElement("div");

  const template = `
  <h1>Ellas</h1>
  <p>Uma filmografia repleta de mulheres incríveis para te inspirar!</p>
    <link rel="stylesheet" href="style.CSS">
    <div class="container">
    <div class="card">
      <h2>Fazer login :</h2>
      <form method='post'>
    <input required="" autocomplete="off" type='email' placeholder='Email' id='emailArea' class='login-area'>
    <input required="" autocomplete="off" type='password' placeholder='Senha' id='passwordArea' class='login-area'>
  </form>
  <button class='button-area btn signIn' id='start'>Entrar</button>
  <p class="or-area">━━━━━━━━━ OU ━━━━━━━━━</p>
  <button class='button-area btn btnGoogle'><img src='imagens/google_small_icon.png' alt='Google' class='google-icon'>Entrar com o google</button>
  <p class='font-small'>Se não tem uma conta, <a href='/#cadastro' style="color:black;font-weight: 600"
      id='sign-up-login'>Cadastre-se.</a>
  </p>
</div>  
  `;
  
  container.innerHTML = template;

  const email = container.querySelector('#emailArea');
  const password = container.querySelector('#passwordArea');

  const signInButton = container.querySelector('#start');
  signInButton.addEventListener('click', (event) => {
    signIn(email.value, password.value);
    event.preventDefault();
  });

  const googleBtn = container.querySelector('.btnGoogle');
  googleBtn.addEventListener('click', () => {
    loginWithGoogle();
  });


  return container;
}

