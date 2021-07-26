import {loginPage, signInGoogleAccount} from '../../lib/index.js'
import { changeContent} from '../../routes.js'


export default () => {
  window.history.pushState("signin", null, "/signin");

  const sectionElement = document.createElement("section")
  sectionElement.setAttribute("id","signin-page")
  sectionElement.setAttribute("class","form-page")
  

  const signInTemplate = `
  <div class="logo-container">
    <img class="site-logo" src="./img/logo.png">
  </div>
  <div  class="form-container" id="form-sign-in">
    <h1 class="h1-login">Login</h1>
    <fieldset class="fieldset-sign-in fieldset">
      <form class="form" action="">
        <p class="user-not-found" id="user-error">Usuário não encontrado</p>
        <p id="email-error"></p>
        <input class="form-input" type="email" placeholder="Email" id="login-email"/>
        <p id="password-error"></p>
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
    changeContent("signup")

  })
  

  enterLogin.addEventListener("click", () =>{
    const email = sectionElement.querySelector("#login-email").value
    const password = sectionElement.querySelector("#login-password").value
    loginPage(email,password)
    .then(() => {
      alert("Login realizado")
      setTimeout( () => {
        changeContent("feed")
      }, 1000)
    })
    .catch((error) => {
      const errorCode = error.code
      if(errorCode == "auth/user-not-found"){
          alert(`Usuário não encontrado`)
      }
      else if(errorCode == "auth/wrong-password"){
          alert("Senha invalida")
      }
      else if(errorCode == "auth/invalid-email"){
          alert("E-mail invalido")
      }
      else{
          alert(error.message)
      }
    })
  })
 
  loginWithGoogle.addEventListener("click", () =>{
    signInGoogleAccount()
    .then(() => {
      alert("Login realizado")
    })
    .then(() => {
      changeContent("feed")
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