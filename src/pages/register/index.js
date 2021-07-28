import {criarFirebaseconta} from "../../services/auth.js"

export const Register = () => {
  const rootElement = document.createElement("div");
  rootElement.innerHTML = `<section class="all-content">
       
  <div class="lateral-img">
      <img src="/images/login-desktop-background.jpg" class="img-camping">
  </div>
 
  <aside class="info-container">

      <div class="willing-logo">
          <img src="/images/logo-login.png" class="img-logo">
      </div>

      <form class="form-container">

          <div class="name-info">
              <input required type="text" class="input-data" id="name">
              <label for="input-name" class="input-data-label">Nome</label>
          </div>

          <div class="email-info">
              <input required type="email" class="input-data" id="email">
              <label for="input-email-adress" class="input-data-label">Email</label>
          </div>

          <div class="password-info">
              <input required type="password" class="input-data" id="password">
              <label for="input-password" class="input-data-label">Senha</label>
          </div>

      </form>

      <div class="button-submit">
          <button class="submit" id="send">Registrar</button>
      </div>

  </aside>

</section>`;

   
const criarConta = rootElement.querySelector('#send');
criarConta.addEventListener('click', (event) => {

const name = rootElement.querySelector('#name').value;
const email = rootElement.querySelector('#email').value;
const senha = rootElement.querySelector('#password').value;
criarFirebaseconta(email, senha, name);
});


  return rootElement;
}

