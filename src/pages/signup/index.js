import {createUser} from '../../lib/index.js'
import {changeContent } from '../../routes.js'
import createprofile from '../createprofile/index.js'
import { errorInput, errorPassword } from '../../error.js'


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
          <input type="email" placeholder="Email" class="form-input" id="register-email"> 
          <input type="password" placeholder="Senha" class="form-input" id="register-password">
          <button type="submit" id="register-btn" class="btn">Enviar</button>
        </form>
      </fieldset>
    </div>
 
  `
  
  sectionElement.innerHTML = signUpTemplate

  const registerBtn = sectionElement.querySelector("#register-btn")
  registerBtn.addEventListener("click", (e) =>{
    e.preventDefault()
    const emailInput = sectionElement.querySelector("#register-email")
    const passwordInput =  sectionElement.querySelector("#register-password")

    const registerEmail = emailInput.value
    const registerPassword =  passwordInput.value
    let text
    createUser(registerEmail, registerPassword)
    .then(()=>{
      changeContent("createprofile")
    })
    
    .catch((error)=>{
      const errorCode = error.code
      switch(errorCode){
        case "auth/email-already-in-use":
          text = "E-mail já cadastrado"
          errorInput(text, emailInput)
          break
  
        case "auth/invalid-email":
          text = "Formato de e-mail inválido"
          errorInput(text, emailInput)
          break
  
        case "auth/weak-password":
          text = " As senhas devem ter no mínimo 6 caracteres"
          errorPassword(text, passwordInput)
          break
        
          default:
            alert(error.message)
      }
    })
   
  })

  return sectionElement
}