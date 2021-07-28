export const Login = () => {
  const root = document.createElement('div');
  root.innerHTML = `
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
      
        <button type='button' id='buttonLogin' class='btn-login form-item'>Entrar</button>

        <p class='signUpHere'>
          Ainda não é cadastrado? 
          <a href="#" id="buttonSignUp" class="link-signup">Cadastre-se!</a>
        </p>

      </form>
    </section>
  </section>
  `;
//console.log(root);

  const btnSignUp = root.querySelector('#buttonSignUp');
  btnSignUp.addEventListener('click', () => {
    window.history.pushState({}, '', '/signup');
    const popStateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popStateEvent);
  })
  return root;
}


/*
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  console.log(email, password)
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      console.log('deu certo', user)
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;

      console.log('deu ruim', errorCode, errorMessage)
    });
});
*/


