import { signIn, loginWithGoogle} from '../../services/index.js';


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
      <button class='button-area btn btnGoogle' id='google-button'><img src='imagens/google_small_icon.png' alt='Google' class='google-icon'>Entrar com o google</button>
      <p class='font-small'>Se não tem uma conta, <a href='/#cadastro' style="color:black;font-weight: 600"
      id='sign-up-login'>Cadastre-se.</a>
      </p>
    </div> 
  </div> 

`;
  

  container.innerHTML = template;

  const email = container.querySelector("#emailArea");
  const password = container.querySelector("#passwordArea");
  const googleButton = container.querySelector('#google-button');
  const signInButton = container.querySelector("#start");
  signInButton.addEventListener("click", (event) => {
    event.preventDefault();
    signIn(email.value, password.value);
     then((userCredential) => {
      const user = userCredential.user;
        window.location.hash = '#feed';
        return user;
   })
      
   .catch((error) => {
    const errorCode = error.code;
    let errorMessage = error.message;
    const errorMsg = document.querySelector('#error-message');
    if (errorCode === 'auth/invalid-email') {
      errorMessage = 'Email inválido. Tente novamente, ou cadastre-se';
      errorMsg.innerHTML = errorMessage;
    } else if (errorCode === 'auth/wrong-password') {
      errorMessage = 'Seu email ou senha está incorreto. Tente novamente';
      errorMsg.innerHTML = errorMessage;
    } else {
      errorMessage = 'Usuário não cadastrado';
      errorMsg.innerHTML = errorMessage;
    }
    return error;
  });
});



googleButton.addEventListener('click', (event) => {
  event.preventDefault();
  loginWithGoogle()
    .then(() => {
      window.location.hash = '#feed';
    })
    // eslint-disable-next-line arrow-parens
    .catch(() => {
      window.location.hash = '#not-found';
    });
});


    // const inputPassword = document.querySelector('#password-user');
    // if (inputPassword.getAttribute('type') === 'password') {
    //   inputPassword.setAttribute('type', 'text');
    // } else {
    //   inputPassword.setAttribute('type', 'password');
    // }
  
return container;
};