import {criarFirebaseconta} from "../../lib/auth.js"

export const Register = () => {
  const rootElement = document.createElement("div");
  rootElement.setAttribute('class', 'register-container')
  rootElement.innerHTML = `

  <section class="login-left-section w-60">

  <header class="login-left-section-header cursor-pointer c-2f4f4f f-roboto">
    <a>Sobre nós</a>
  </header>

  <main class="main-input bg-white">

    <div class="mt-4">
      <img src="./images/logo-login.png" class="w-40"/>
    </div>

    <form class="m-vertical-6-center-left-right w-40">

    <div class="p-relative">
              <input required type="text" class="login-input w-100 mb-1 pd-b-1 pd-l-3 pd-t-4 c-2f4f4f f-roboto f-120" id="input-name">
              <label class="login-input-label p-absolute pd-2 c-696969 f-roboto f-120">Nome</label>
          </div>

      <div class="p-relative">
        <input required type="email" class="login-input w-100 mb-1 pd-b-1 pd-l-3 pd-t-4 c-2f4f4f f-roboto f-120" id="input-email">
        <label class="login-input-label p-absolute pd-2 c-696969 f-roboto f-120">Email</label>
      </div>

      <div class="p-relative">
        <input required type="password" class="login-input w-100 mb-1 pd-b-1 pd-l-3 pd-t-4 c-2f4f4f f-roboto f-120" id="input-password">
        <label class="login-input-label p-absolute pd-2 c-696969 f-roboto f-120">Senha</label>
      </div>
    </form>
    
      <div class="button-submit">
          <button class="submit" id="send">Registrar</button>
      </div>

  </main>
  <footer class="mt-2 c-2f4f4f f-roboto f-80 b-2"> Willing &copy 2021</footer>
</section> 

<div class="login-right-section w-40">
<img src="./images/login-desktop-background.jpg">
</div>

`
/*
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
              <input required type="text" class="input-data" id="input-name">
              <label for="input-name" class="input-data-label">Nome</label>
          </div>

          <div class="email-info">
              <input required type="email" class="input-data" id="input-email">
              <label for="input-email-adress" class="input-data-label">Email</label>
          </div>

          <div class="password-info">
              <input required type="password" class="input-data" id="input-password">
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
*/

const criarConta = rootElement.querySelector('#send');
criarConta.addEventListener('click', (event) => {

const name = rootElement.querySelector('#input-name').value;
const email = rootElement.querySelector('#input-email').value;
const senha = rootElement.querySelector('#input-password').value;
criarFirebaseconta(email, senha, name);
});


  return rootElement;
}

