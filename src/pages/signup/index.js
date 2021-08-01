// import { createUserWithEmailAndPassword } from "../../services";

export const signUp = () => {
  const rootElement = document.createElement('div');
  //rootElement.className = 'area-signup'

  const container = `
  <img id="background" src="./pages/login/img/paleta3.jpg" alt="">
      <div class="esmaeceHeader logotipo-text">
        <section>
          <h2>FORT</h2>
        </section>
      </div>
  <div>
    <form class="form-register">
      <input
        class="profile-pic"
        type="file"
        name="profile-pic"
        id="profile-pic"
        accept="image/jpeg, image/png, image/jpg"
        capture="profile-pic">

      <input
        class="value-register"
        type="text"
        name="name"
        id="name"
        placeholder="Nome completo">

      <input
        class="value-register"
        type="text"
        name="username"
        id="username"
        placeholder="Nome de usuário">

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

      <input
        class="value-register"
        type="tel"
        name="user-telephone"
        id="usertelephone"
        placeholder="Celular">

    </form>

    <div class="btnDiv">
      <button id="btn-signup" class="btn">Cadastrar</button>
      <p>Já tem uma conta? <span><a href="/login">Faça seu login aqui</a></span></p>

    </div>
    
  </div>
  `

  rootElement.innerHTML = container;

  const userPicture = rootElement.querySelector('#profile-pic'),
        userFullName = rootElement.querySelector('#name'),
        username = rootElement.querySelector('#username'),
        userEmail = rootElement.querySelector('#useremail'),
        userPassword = rootElement.querySelector('#userpassword'),
        userConfirmPassword = rootElement.querySelector('#user-confirm-password'),
        userTelephone = rootElement.querySelector('#usertelephone'),
        signUpBtn = rootElement.querySelector('#btn-signup')

  signUpBtn.addEventListener('click', () => {      
    createUserWithEmailAndPassword(
      userPicture.nodeValue,
      userFullName,
      username,
      userEmail,
      userPassword,
      userConfirmPassword,
      userTelephone
    )
  })

return rootElement
}