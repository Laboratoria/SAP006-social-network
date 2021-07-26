export const Login = () => {
  const root = document.createElement('div');
  root.innerHTML = `
  <section id='' class='loginPage'>
    <section id=''>  
      <img src="img/download.png" class='img' alt='veleiro em mar calmo ao por do sol'>
    </section>
    <section id='login' class='container'>
      <form id='labelsForLogin' class='login-signup'>
        <label for='email'>E-mail:</label>
        <input id='email' type='e-mail' class='inputs'>

        <label for='password'>Senha:</label>
        <input id='password' type='password' class='inputs'>
      
        <button type='button' id='buttonLogin' class='btn'>Entrar</button>

        <p class='signUpHere'>
          Ainda não é cadastrado? 
          <button type='button' id='buttonSignUp' class='btn'>Clique Aqui</button>
        </p>

      </form>
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


