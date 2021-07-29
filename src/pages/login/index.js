import { loginEmailAndPassword, loginWithGmail } from "../../services/index.js";

export const Login = () => {
  const root = document.createElement("div");
  root.innerHTML = `
  <header>
    <h1>SAILERS</h1>
    <h2>A Rede Social dos Velejadores</h2>
  </header>
  <section id='loginPage' class='loginPage'>
    <section id='loginImage' class='loginImage'>  
      <img src="img/login-image.png" class='img' alt='veleiro em mar calmo ao por do sol'>
    </section>
    <section id='login' class='container'>
      <form id='labelsForLogin' class='login-signup'>
        <label class='label-login' for='email'>E-mail:</label>
        <input id='email' type='e-mail' class='inputs form-item'>

        <label class='label-login' for='password'>Senha:</label>
        <input id='password' type='password' class='inputs form-item'>

        <div id='keepMeLogged' >
          <input type='checkbox' id='keepMeLogged' name='Mantenha-me Conectado'>
          <label class='keep-me-logged' for='keepMeLogged'> Mantenha-me Conectado</label>
        </div>

        <button type='button' id='buttonLogin' class='btn-login form-item'>Entrar</button>

        <p class='or'>ou</p>        
        
        <nav class='btnGoogle'>
          <button type='button' id='btnGmail' class='btnGmail'></button>
        </nav>

        <p class='signUpHere'>
          Ainda não é cadastrado? 
          <a href='#' id='linkSignUp' class="link-signup">Cadastre-se!</a>
        </p>

      </form>
    </section>
  </section>
  `;

  const btnSignUp = root.querySelector('#linkSignUp');
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
