import { signUpWithGoogle, loginWithGmail } from '../../services/index.js'

export const SignUp = () => {
  const root = document.createElement('div');
  root.innerHTML = `
  <header>
    <h1>SAILERS</h1>
    <h2>A Rede Social dos Velejadores</h2>
  </header>
  <main id='loginPage' class='container'>
    <section class='img-container'></section>    
    <section id='login' class='login-container'>
      <header class='form-options'>
        <span class='opt-login'>Login</span>
        <span class='opt-signup linkSignUp'>Cadastro</span>
      </header>
      <section class='form-container'>
      <form>
        <div class='form-fields'>
          <label for='email'>E-mail</label>
          <input id='email' type='e-mail' class='input-email'>
          
          <label class='label-login' for='password'>Senha:</label>
          <input id='password' type='password' class='input-password'>
        </div>

          <button type='button' id='signUpButton' class='btn-signup btn form-item'>Cadastrar</button>
          <button type='button' id='btnGmail' class='btnGmail btn form-item'>
              <img src='./img/logo-google.png' class='google-icon'></img>
                <span>Entrar com o Google</span>
          </button>
      </form>
  </section>
  </main>
  `;

  const btnLogin = root.querySelector('.opt-login');
  const btnSignUp = root.querySelector('#signUpButton');
  const btnGoogle = root.querySelector('#btnGmail');
  
  btnLogin.addEventListener('click', () => {
    window.history.pushState({}, '', '/');
    const popStateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popStateEvent);
  })

  btnSignUp.addEventListener('click', () => {
    /*window.history.pushState({}, '', '/feed');*/
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signUpWithGoogle(email, password);
  });

  btnGoogle.addEventListener('click', () => {
    loginWithGmail();
  });
    
  return root;
}
