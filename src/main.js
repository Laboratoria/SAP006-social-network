import feed from './pages/feed/index.js'
import signup from './pages/signup/index.js'
import signin from './pages/signin/index.js';
import createprofile from './pages/createprofile/index.js'
import {createUser, asyncSendProfileData, signInHome} from './lib/index.js'

// myFunction();

// variável pra acessar o banco de dados
const mainLogin = document.getElementById("root")

window.addEventListener("load", () => {
  mainLogin.innerHTML = signin();

  const enterLogin = document.getElementById("enter");
  enterLogin.addEventListener("click", () => {
    signInHome.loginPage(feed); 
  });

  const signUpBtn = document.getElementById("signup-link") 
  signUpBtn.addEventListener("click", (e) => {
    e.preventDefault()
    mainLogin.innerHTML = signup()

    const backSignIn = document.getElementById("back-sign-in");
    backSignIn.addEventListener("click", () => {
      mainLogin.innerHTML = signin();
    })
    
    const registerBtn = document.getElementById("register-btn");
      registerBtn.addEventListener("click", (e) =>{
      e.preventDefault()
      const registerEmail = document.getElementById("register-email").value
      const registerPassword =  document.getElementById("register-password").value

      createUser(registerEmail, registerPassword)
        .then(() => {
          mainLogin.innerHTML = createprofile()
          const sendProfileBtn = document.getElementById("send-profile")
          sendProfileBtn.addEventListener("click", (e) => {
            e.preventDefault()
            const userName = document.getElementById("input-username").value
            const image = document.getElementById("input-profile-image").value
            asyncSendProfileData(userName, image)

          })
        })
        
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error", errorCode,errorMessage)

          switch(errorCode){
            case "auth/email-already-in-use":
              document.getElementById("register-email").style.border = "1px solid red";
              document.getElementById("user-error-code").style.display = "block";
              break

            case "auth/invalid-email":
              document.getElementById("register-email").style.border = "1px solid red";
              document.getElementById("email-error-code").innerHTML = "Endereço de e-mail inválido";
              break

            case "auth/weak-password":
              document.getElementById("register-password").style.border = "1px solid red";
              document.getElementById("password-error-code").innerHTML = "A senha escolhida é fraca";
              break
          }
        })
    })   
  })
  
})
