export const SignUp = () => {
  const root = document.createElement('div');
  root.innerHTML = `
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

  /*const btnSignUp = root.querySelector('#signUpButton');
  btnSignUp.addEventListener('click', () => {
    //e.preventDefault();
    //console.log('clicou')
    window.history.pushState({}, '', '/signup');
    const popStateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popStateEvent);
  })*/
  return root;
}
