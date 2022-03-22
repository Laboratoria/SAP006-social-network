import { signIn, loginWithGoogle } from '../../services/index.js';


export default () => {
  const container = document.createElement("div");

  const template = `
  <div class="text">
  <h1>Ellas</h1>
  
  <p>Uma filmografia repleta de mulheres incríveis para te inspirar!</p>
  <div class = "images">
   <img src="../imagens/wonderwoman.png">
  </div>
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
      <p class='font-small'>Se não tem uma conta, <a href='/#cadastro' 
      id='sign-up-login'>Cadastre-se.</a>
      </p>
    </div> 
    
    
  </div> 

`;
  

container.innerHTML = template;

const email = container.querySelector("#emailArea");
const password = container.querySelector("#passwordArea");
const googleButton = container.querySelector("#google-button");
const signInButton = container.querySelector("#start");

signInButton.addEventListener("click", (event) => {
  event.preventDefault();
  signIn(email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location.hash = "#feed";
      window.sessionStorage.setItem("logged", true);
      return user;
    })

    .catch((error) => {
      const errorCode = error.code;
      let errorMessage = error.message;
      const errorMsg = document.querySelector("#error-message");
      if (errorCode === "auth/invalid-email") {
        errorMessage = "Email inválido. Tente novamente, ou cadastre-se";
        errorMsg.innerHTML = errorMessage;
      } else if (errorCode === "auth/wrong-password") {
        errorMessage = " Email ou senha incorretos. Tente novamente";
        errorMsg.innerHTML = errorMessage;
      } else {
        errorMessage = "Usuário ainda não cadastrado";
        errorMsg.innerHTML = errorMessage;
      }
      return error;
    });
});

googleButton.addEventListener("click", (event) => {
  event.preventDefault();
  loginWithGoogle()
    .then((userCredential) => {
      const user = userCredential.user;
      window.sessionStorage.setItem("logged", true);
      window.location.hash = "#feed";
    })

    .catch(() => {});
});

return container;
};

