import {createUser} from '../../lib/index.js'
import {changeContent } from '../../routes.js'
import createprofile from '../createprofile/index.js'


export default () => { 

  window.history.pushState("signup", null, "signup");

  const sectionElement = document.createElement("section")
  sectionElement.setAttribute("id","sign-up")
  sectionElement.setAttribute("class","form-container")

  const signUpTemplate = `

  <div id="form-sign-up">
    <h1 class="h1-signup">CADASTRO</h1>
    <fieldset class="fieldset-sign-up fieldset">
    <form class="form-sign-up" action="">
    <p class="user-already-in-use" id="user-error-code">Esse e-mail já é cadastrado</p>
    <p id="email-error-code"></p>
      <input type="email" placeholder="Email" id="register-email">
    <p id="password-error-code"></p>
      <input type="password" placeholder="Senha" id="register-password">
      <button type="submit" id="register-btn">Enviar</button>
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