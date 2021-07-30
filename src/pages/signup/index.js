import { createUserWithEmailAndPassword } from "../../services";


export const signUp = () => {
  const divRoot = document.createElement('div');
  //divRoot.className = 'area-signup'

  const container = `
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

      <button id="btn-signup">Cadastrar</button>

    </form>

    <p>Já tem uma conta? Faça seu login aqui</p>

  </div>
  `

  divRoot.innerHTML = container;

  const nameUser = divRoot.querySelector('#username');
  const emailUser = divRoot.querySelector('#useremail');
  const passwordUser = divRoot.querySelector('#userpassword');
  const confirmpassword = divRoot.querySelector('#user-confirm-password');
  const telephoneUser = divRoot.querySelector('#usertelephone');
  const signUpBtn = divRoot.querySelector('#btn-signup')

  signUpBtn.addEventListener('click', () => {

    const valueName = nameUser.value;
    const valueEmail = emailUser.value;
    const valuePassword = passwordUser.value;
    const valueConfirm = confirmpassword.value;
    const valueTel = telephoneUser.value;
      
    createUserWithEmailAndPassword(valueName)
  })

return divRoot
}