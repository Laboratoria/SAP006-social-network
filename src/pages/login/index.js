import { loginEmailAndPassword, loginWithGmail } from "../../services/index.js";

export const Login = () => {
  const root = document.createElement("div");
  root.innerHTML = `
  <header>
    <h1>SAILERS</h1>
    <h2>A Rede Social dos Velejadores</h2>
  </header>
  <main class='container'>  
    <section class='img-container'>
    </section>    
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

            <div class='rememberForgot' >
              <label><input type="checkbox">Manter-me conectado</label>
              <a href='#'>Esqueci a senha</a>
            </div>

              <button type='button' id='buttonLogin' class='btn-login btn form-item'>Entrar</button>
              <p class='separator form-item'>ou</p>                      
              <button type='button' id='btnGmail' class='btnGmail btn form-item'>
                <img src='./img/logo-google.png' class='google-icon'></img>
                <span>Entrar com o Google</span>
              </button>
          </form>
      </section>
    </main>
  `;

  const btnSignUp = root.querySelector('.linkSignUp');
  const btnLogin = root.querySelector('#buttonLogin');
  const btnGmail = root.querySelector('#btnGmail');
  //const keepMeLogged = root.querySelector('keep-me-logged');

  btnSignUp.addEventListener('click', () => {
    window.history.pushState({}, '', '/signup');
    const popStateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popStateEvent);
  });

  btnLogin.addEventListener('click', () => {
    /*window.history.pushState({}, '', '/feed');*/
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    loginEmailAndPassword(email, password);
  });

  btnGmail.addEventListener('click', () => {
    loginWithGmail();
  });

  return root;
};
