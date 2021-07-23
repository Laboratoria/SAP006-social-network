import feed from './pages/feed/index.js'
import signup from './pages/signup/index.js';
import signin from './pages/signin/index.js';
import createprofile from './pages/createprofile/index.js'
import profile from './pages/profile/index.js';
import {loginPage, createUser, asyncSendProfileData,uploadImage, currentUser,getURLImage} from './lib/index.js'


const mainLogin = document.getElementById("root")

window.addEventListener("load", () => {
  mainLogin.appendChild(signin());

  const signUpLink = document.getElementById("signup-link") 
  signUpLink.addEventListener("click", (e) => {
    e.preventDefault()
    mainLogin.innerHTML=""
    mainLogin.appendChild(signup())

    const backSignIn = document.querySelector("#back-sign-in");
    backSignIn.addEventListener("click", () => {
      mainLogin.innerHTML=""
      mainLogin.appendChild(signin())
      
    })
  })
})
    
//     const registerBtn = document.getElementById("register-btn");
//       registerBtn.addEventListener("click", (e) =>{
//       e.preventDefault()
//       const registerEmail = document.getElementById("register-email").value
//       const registerPassword =  document.getElementById("register-password").value

//       createUser(registerEmail, registerPassword)
//         .then(() => {
//           mainLogin.innerHTML = createprofile()
//           const sendProfileBtn = document.getElementById("send-profile")
//           sendProfileBtn.addEventListener("click", (e) => {
//             e.preventDefault()
//             const userName = document.getElementById("input-username").value
//             const user = currentUser()
//             const userId = user.uid
//             console.log(userId)
          
//             uploadImage("input-profile-image", userId)
//             const URLProfileImage =getURLImage(userId)
//             console.log(URLProfileImage)
//             asyncSendProfileData(userName, URLProfileImage)

          
           

//             mainLogin.innerHTML = profile()
           
          

//             const userImage = document.getElementById("user-image")
//             image.src = 


//           })
//         })
        
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           console.log("error", errorCode,errorMessage)

//           switch(errorCode){
//             case "auth/email-already-in-use":
//               document.getElementById("register-email").style.border = "1px solid red";
//               document.getElementById("user-error-code").style.display = "block";
//               break

//             case "auth/invalid-email":
//               document.getElementById("register-email").style.border = "1px solid red";
//               document.getElementById("email-error-code").innerHTML = "Endereço de e-mail inválido";
//               break

//             case "auth/weak-password":
//               document.getElementById("register-password").style.border = "1px solid red";
//               document.getElementById("password-error-code").innerHTML = "A senha escolhida é fraca";
//               break
//           }
//         })
//     })   
//   })
  
// })
