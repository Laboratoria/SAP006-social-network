export const SignUp = () => {
  const root = document.createElement('div');
  root.innerHTML = `
    <section id='signUp' class='container'>
    <form id='labelsForSignUp' class='login-signup'>

      <label for='firstName'>Primeiro Nome:</label>
      <input id='name' type='name' >
    
      <label for='lastName'>Último nome:</label>
      <input id='name' type='name'>

      <label for='email'>E-mail:</label>
      <input id='email' type='e-mail'>
    
      <label for='password'>Senha:</label>
      <input id='password' type='password'>
    
      <button type='button' id='signUpButton' class='btn'>Cadastrar</button>

    </form>
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
