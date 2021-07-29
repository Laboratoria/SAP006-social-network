import { signInEmailPassword, signInGoogle } from "../../services/index.js"; 

export const Login = () => {
  const rootElement = document.createElement("div");
  const container = `
    <div>
      <img id="background" src="./pages/login/img/paleta3.jpg" alt="">
      <div class="esmaeceHeader logotipo-text">
        <section>
          <h2>FORT</h2>
        </section>
      </div>
      <h4>Nova por aqui? <span><a href="link-cadastro">Cadastre-se</a></span></h4>
      <div class="inputAndReset">
        <input type="text" id="email" class="input" placeholder="Email">
        <input type="password" id="password" class="input" placeholder="Senha">
        <a class="reset-password" href="">Esqueceu a senha?</a><br>
      </div>
      <div class="google">
        <button id="btn-login" class="login btn">LOGIN</button>
        <img id="icon-google" src="./pages/login/img/icon-google-white.png">
      </div>
      <form>
        <input type="checkbox" class="checkbox" name="remember"><label for="remember">Lembrar meus dados</label>
      </form>
      
    </div> 
  `;
  rootElement.innerHTML = container;
  const btnLogin = rootElement.querySelector("#btn-login");
  const btnGoogle = rootElement.querySelector("#icon-google");
  const email = rootElement.querySelector('#email');
  const password = rootElement.querySelector('#password');
  const checkbox = rootElement.querySelector('.checkbox');
  btnLogin.addEventListener("click", () => {
    signInEmailPassword(email.value, password.value);
  });
  btnGoogle.addEventListener("click", () => {
    signInGoogle();
  });
  // checkbox.addEventListener("change", () => {
  //   persistence();
  // })
  // usar local storage
  // funcao para mudar a persistencia com if logado com local ou none
  const none
  const local

  return rootElement;  
  // window.history.pushState({}, "", "/signup");
  // const popstateEvent = new PopStateEvent("popstate", { state: {} });
  // dispatchEvent(popstateEvent);
};

