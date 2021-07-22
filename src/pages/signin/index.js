import {loginPage} from '../../lib/index.js'


export default () => {

  const sectionElement = document.createElement("section")

  const signInTemplate = `
  <div id="formSignIn">
  <h1 class="h1-login">Login</h1>
  <fieldset class="fieldsetSignIn">
    <form class="formSignIn" action="">
      <input type="email" placeholder="Email" id="loginEmail"/>
      <input type="password" placeholder="Senha" id="loginPassword"/>
      <p class="forgetpassword">Esqueceu sua senha?</p>
      <button type="button" id="enter">Entrar</button>
      <p class="p-signIn">Não é cadastrado? <a href="#signup" id="signup-link">Cadastre-se</a></p>
      <button type="button" id="gmail"><p class="signInGoogle"><img src="./img/logogoogle.png" class="logo-google"/>Entrar com o Google</p></button>
    </form>
  </fieldset>
  </div>

  `;

  sectionElement.innerHTML = signInTemplate

  const enterLogin = sectionElement.querySelector("#enter")
  

  enterLogin.addEventListener("click", () =>{
    const email = sectionElement.querySelector("#loginEmail").value
    const password = sectionElement.querySelector("#loginPassword").value
    loginPage(email,password)
  })
 



  return sectionElement;
}