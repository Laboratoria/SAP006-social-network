import { loginWithGoogle, buttonEntrar } from "../../services/index.js";

export default () => {
  const container = document.createElement("div");

  const template = `
 <div class= "container_login">
 <div class="container_form">
 <h1 class="titulo"> Login</h1>
 <form>
 <div class="input-field">
 <input type="text" name="username" id="username"
     placeholder="Digite seu Email">
 <div class="underline"></div>
</div>
<div class="input-field">
<input type="password" name="password" id="password"
    placeholder="Senha">
<div class="underline"></div>
</div>
<button type="submit" class="button" id="entrar">Entrar</button>
 </form>
 <div class="footer">
            <span>Ou Conecte-se com seu email</span>
            <div class="rede_social">
            <button type="submit" class="btn" id="google-button">Conta google</button>
</div>
<p class="p-sign-in">Não tem uma conta? <a href="#cadastro"
class="forget-password-link" id="signup-link">Cadastre-se</a></p>    
 </div>
 
 </div>

  `;
  container.innerHTML = template;

  const email = container.querySelector("#username");
  const password = container.querySelector("#password");
  const googleButton = container.querySelector("#google-button");
  const signInButton = container.querySelector("#entrar");
  signInButton.addEventListener("click", (event) => {
    event.preventDefault();
    buttonEntrar(email.value, password.value, googleButton.value)
      .then((userCredential) => {
        const user = userCredential.user;
        window.location.hash = "#feed";
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
          errorMessage = "Seu email ou senha está incorreto. Tente novamente";
          errorMsg.innerHTML = errorMessage;
        } else {
          errorMessage = "Usuário não cadastrado";
          errorMsg.innerHTML = errorMessage;
        }
        return error;
      });
  });

  googleButton.addEventListener("click", (event) => {
    event.preventDefault();
    loginWithGoogle()
      .then(() => {
        window.location.hash = "#feed";
      })
      // eslint-disable-next-line arrow-parens
      .catch(() => {
        window.location.hash = "#not-found";
      });
  });

  return container;
};
