import { signUpWithGoogle } from '../../services/index.js'

export const SignUp = () => {
  const root = document.createElement('div');
  root.innerHTML = `
  <header>
    <h1>SAILERS</h1>
    <h2>A Rede Social dos Velejadores</h2>
  </header>
  <section id='loginPage' class='loginPage'>
    <section id='loginImage' class='loginImage'>  
      <img src="img/login-image.png" class='img' alt='veleiro em mar calmo ao por do sol'>
    </section>
    <section id='signUp' class='container'>
      <form id='labelsForSignUp' class='login-signup'>       

        <label class='label-login' for='email'>E-mail:</label>
        <input id='email' type='e-mail' class='inputs form-item'>
      
        <label class='label-login' for='password'>Senha:</label>
        <input id='password' type='password' class='inputs form-item'>
      
        <button type='button' id='signUpButton' class='btn-signup form-item'>Cadastrar</button>
      </form>
    </section>
  </section>
  `;

  const btnSignUp = root.querySelector('#signUpButton');
  
  btnSignUp.addEventListener('click', () => {
    /*window.history.pushState({}, '', '/feed');*/
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signUpWithGoogle(email, password);
  });
  return root;
}
