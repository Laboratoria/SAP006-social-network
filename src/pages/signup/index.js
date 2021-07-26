import {createUser} from '../../lib/index.js'
import {changeContent } from '../../routes.js'
import createprofile from '../createprofile/index.js'


export default () => { 

  window.history.pushState("signup", null, "/signup");

  const sectionElement = document.createElement("section")
  sectionElement.setAttribute("id","sign-up")
  sectionElement.setAttribute("class","form-page")

  const signUpTemplate = `
    <div class="logo-container">
      <img class="site-logo" src="./img/logo.png">
    </div>
    <div  class="form-container" id="form-sign-up">
      <h1 class="h1-login">CADASTRO</h1>
    
      <fieldset class="fieldset-sign-up fieldset">
        <form class="form" action="">
          <p id="email-error-code"></p>
          <input type="email" placeholder="Email" class="form-input" id="register-email">
          <p id="email-error-code"></p>
          <input type="password" placeholder="Senha" class="form-input" id="register-password">
          <p id="password-error-code"></p>
          <button type="submit" id="register-btn" class="btn">Enviar</button>
        </form>
      </fieldset>
    </div>
 
  `
  
  sectionElement.innerHTML = signUpTemplate

  const registerBtn = sectionElement.querySelector("#register-btn")
  registerBtn.addEventListener("click", (e) =>{
    e.preventDefault()
    const registerEmail = sectionElement.querySelector("#register-email").value
    const registerPassword =  sectionElement.querySelector("#register-password").value
    createUser(registerEmail, registerPassword)
    .then(()=>{
      changeContent("createprofile")
    })
    .catch((error)=>{
      const errorCode = error.code
      switch(errorCode){
        case "auth/email-already-in-use":
          alert("E-mail já cadastrado")
          break
  
        case "auth/invalid-email":
          alert("Formato de e-mail inválido")
          break
  
        case "auth/weak-password":
          alert("Senha fraca")
          break
      }
    })
   
  })

  return sectionElement
}