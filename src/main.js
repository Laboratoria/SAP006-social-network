import feed from './pages/feed/index.js'
import signup from './pages/signup/index.js';
import signin from './pages/signin/index.js';
import createprofile from './pages/createprofile/index.js'
import profile from './pages/profile/index.js';
import {loginPage, createUser, asyncSendProfileData,uploadImage, currentUser,getURLImage} from './lib/index.js'


const mainLogin = document.getElementById("root")

window.addEventListener("load", () => {
  mainLogin.appendChild(signin());

  // const enterLogin = document.getElementById("enter");
  // enterLogin.addEventListener("click", () => {
  //   auth.loginPage();  
  // });


  const signUpBtn = document.getElementById("signup-link") 
  signUpBtn.addEventListener("click", (e) => {
    e.preventDefault()
    mainLogin.innerHTML= signup()

    const registerBtn = document.getElementById("register-btn")

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
            const user = currentUser()
            const userId = user.uid
            console.log(userId)
          
            uploadImage("input-profile-image", userId)
            const URLProfileImage =getURLImage(userId)
            console.log(URLProfileImage)
            asyncSendProfileData(userName, URLProfileImage)

          
           

            mainLogin.innerHTML = profile()
           
          

            // const userImage = document.getElementById("user-image")
            // image.src = 


          })
        })
        
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error", errorCode,errorMessage)

          switch(errorCode){
            case "auth/email-already-in-use":
              alert("Esse e-mail já é cadastrado")
              break

            case "auth/invalid-email":
              alert("Endereço de e-mail inválido")
              break

            case "auth/weak-password":
              alert("A senha escolhida é fraca")
              break
          }
        })
    

    })   
  })
  
})



