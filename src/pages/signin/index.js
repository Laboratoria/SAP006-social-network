import {loginPage} from '../../lib/index.js'

export default () => {

  const sectionElement = document.createElement("section")
  sectionElement.setAttribute("id","sign-in")
  sectionElement.setAttribute("class","form-container")

  const signInTemplate = `
  <div id="form-sign-in">
    <h1 class="h1-login">Login</h1>
    <fieldset class="fieldset-sign-in fieldset">
      <form class="form-sign-in" action="">
        <p class="user-not-found" id="user-error">Usuário não encontrado</p>
        <p id="email-error"></p>
        <input type="email" placeholder="Email" id="login-email"/>
        <p id="password-error"></p>
        <input type="password" placeholder="Senha" id="login-password"/>
        <p class="forget-password"><a href = "index.html">Esqueceu sua senha?</a></p>
        <button type="button" id="enter">Entrar</button>
        <p class="p-sign-in">Não é cadastrado? <a href="" id="signup-link">Cadastre-se</a></p>    
        <p class="or">OU</p>
        <button type="button" id="gmail-btn"><p class="sign-google"><img src="./img/logogoogle.png" class="logo-google"/>Entrar com o Google</p></button>
      </form>
    </fieldset>
  </div>

  `;

  

  sectionElement.innerHTML = signInTemplate

  const enterLogin = sectionElement.querySelector("#enter")
  

  enterLogin.addEventListener("click", () =>{
    const email = sectionElement.querySelector("#login-email").value
    const password = sectionElement.querySelector("#login-password").value
    loginPage(email,password)
  })
 



  return sectionElement;
}