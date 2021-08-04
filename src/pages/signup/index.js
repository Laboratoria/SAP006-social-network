import { createAccount } from "../../services/index.js";
import { navigation } from '../../routes.js';

export const signUp = () => {
  const rootElement = document.createElement('div');
  //rootElement.className = 'area-signup'

  const container = `
  <img id="background" class="img-background" src="./pages/login/img/paleta3.jpg" alt="">
      <div class="esmaeceHeader logotipo-text">
        <section>
          <h2>FORT</h2>
        </section>
      </div>
  <div>
    <form class="form-register">
      <input
        class="value-register"
        type="email"
        name="adress-email"
        id="useremail"
        placeholder="E-mail">

      <input
        class="value-register"
        type="password"
        name="user-password"
        id="userpassword"
        placeholder="Senha">

      <input
      class="value-register"
      type="password"
      name="confirm-user-password"
      id="user-confirm-password"
      placeholder="Confirme a senha">

    </form>

    <div class="btnDiv">
      <button id="btn-signup" class="btn">Cadastrar</button>
      <p>Já tem uma conta? <span><a href="/login">Faça seu login aqui</a></span></p>

    </div>
    
  </div>
  `

  rootElement.innerHTML = container;

  const userEmail = rootElement.querySelector('#useremail');
  const userPassword = rootElement.querySelector('#userpassword');
  const userConfirmPassword = rootElement.querySelector('#user-confirm-password');
  const signUpBtn = rootElement.querySelector('#btn-signup');

  signUpBtn.addEventListener('click', (event) => {
    event.preventDefault(); 
    createAccount(userEmail.value, userPassword.value, userConfirmPassword.value)
    navigation('/feed')
  })

return rootElement

}

//       <input
//         class="profile-pic"
//         type="file"
//         name="profile-pic"
//         id="profile-pic"
//         accept="image/jpeg, image/png, image/jpg"
//         capture="profile-pic">

//       <input
//         class="value-register"
//         type="text"
//         name="name"
//         id="name"
//         placeholder="Nome completo">

//       <input
//         class="value-register"
//         type="text"
//         name="username"
//         id="username"
//         placeholder="Nome de usuário">
//         </input>

//         <input
//         class="value-register"
//         type="tel"
//         name="user-telephone"
//         id="usertelephone"
//         placeholder="Celular">