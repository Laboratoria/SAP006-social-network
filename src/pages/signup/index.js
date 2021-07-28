import {createUser} from '../../lib/index.js'
import { errorInput, errorPassword } from '../../error.js'

export default () => { 

  const sectionElement = document.createElement("section")
  sectionElement.setAttribute("id","sign-up")
  sectionElement.setAttribute("class","form-page")

  const signUpTemplate = `
    <div class="logo-container">
    <button class="back-to-login">← Voltar</button>
    <h1 id="bookish">BOOKISH</h1>
      <img class="site-logo" src="./img/logo.png">
    </div>
    <div  class="form-container" id="form-sign-up">
      <h1 class="h1-login">Cadastro</h1>
    
      <fieldset class="fieldset-sign-up fieldset">
        <form class="form" action="">          
          <input type="email" placeholder="Email" class="form-input" id="register-email"> 
          <input type="password" placeholder="Senha" class="form-input" id="register-password">
          <button type="submit" id="register-btn" class="btn">Cadastrar</button>
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
      window.history.pushState({}, "", "/cadastro-perfil")
      const popStateEvent = new PopStateEvent("popstate", {state:{}})
      dispatchEvent(popStateEvent)
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

  const backToLogin = sectionElement.querySelector(".back-to-login")
  backToLogin.addEventListener("click", () => {
    window.history.pushState(null, null, "/login")
          const popStateEvent = new PopStateEvent("popstate", {state:{}})
          dispatchEvent(popStateEvent)
  })
  return sectionElement
}