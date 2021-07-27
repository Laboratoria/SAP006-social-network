import {loginPage, signInGoogleAccount} from '../../lib/index.js'
import { errorInput, errorPassword } from '../../error.js'

export default () => {
 
  const sectionElement = document.createElement("section")
  sectionElement.setAttribute("id","signin-page")
  sectionElement.setAttribute("class","form-page")

  const signInTemplate = `
  <div class="logo-container">
  <h1 id="bookish">BOOKISH</h1>
    <img class="site-logo" src="./img/logo.png"/>
  </div>
  <div  class="form-container" id="form-sign-in">
    <h1 class="h1-login">Login</h1>
    <fieldset class="fieldset-sign-in fieldset">
      <form class="form" action="">
        <input class="form-input" type="email" placeholder="Email" id="login-email"/>
        <input class="form-input"  type="password" placeholder="Senha" id="login-password"/>
        <p class="forget-password"><a href = "index.html">Esqueceu sua senha?</a></p>
        <button type="button" class="btn" id="enter">Entrar</button>
        <p class="p-sign-in">Não tem uma conta? <a href="" class="forget-password-link" id="signup-link">Cadastre-se</a></p>    
        <p class="or">OU</p>
        <button class="btn gmail-btn" type="button" id="gmail-btn"><p class="sign-google"><img class="logo-google" src="./img/logogoogle.png" class="logo-google"/>Entre com uma conta Google</p></button>
      </form>
    </fieldset>
  </div>

  `; 

  sectionElement.innerHTML = signInTemplate

  const enterLogin = sectionElement.querySelector("#enter")
  const loginWithGoogle = sectionElement.querySelector("#gmail-btn")

  const signUpLink = sectionElement.querySelector("#signup-link") 
  signUpLink.addEventListener("click", (e) => {
    e.preventDefault()
    window.history.pushState(null, null, "/cadastro")
    const popStateEvent = new PopStateEvent("popstate", {state:{}})
    
    dispatchEvent(popStateEvent)
  })
  
  enterLogin.addEventListener("click", () =>{
    let text
    const emailInput= sectionElement.querySelector("#login-email")
    const passwordInput= sectionElement.querySelector("#login-password")
    const email = emailInput.value
    const password = passwordInput.value
    loginPage(email,password)
    .then(() => {
      setTimeout( () => {
        window.history.pushState(null, null, "/home")
        const popStateEvent = new PopStateEvent("popstate", {state:{}})
        dispatchEvent(popStateEvent)
      }, 1000)
    })
    .catch((error) => {
      const errorCode = error.code
      switch(errorCode){
        case "auth/user-not-found":
          text = "Usuário não encontrado"
          errorInput(text, emailInput)
          break
        
        case "auth/wrong-password":
          text = "Senha inválida"
          errorPassword(text, passwordInput)
          break
  
        case "auth/invalid-email":
          text = "E-mail inválido"
          errorInput(text, emailInput)
          break

        default:
          alert(error.message)

      }
    })
  })
 
  loginWithGoogle.addEventListener("click", () =>{
    signInGoogleAccount()
    .then(() => {
      window.history.pushState(null, null, "/home")
      const popStateEvent = new PopStateEvent("popstate", {state:{}})
      dispatchEvent(popStateEvent)
    })
    .catch((error) => {
      const errorCode = error.code
      if(errorCode == "auth/invalid-email"){
        alert("E-mail invalido")
      }
      else{
        alert(error.message)
      }
    })
  })


  return sectionElement;
}