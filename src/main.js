import feed from './pages/feed/index.js'
import signup from './pages/signup/index.js';
import signin from './pages/signin/index.js';
import createprofile from './pages/createprofile/index.js'
import profile from './pages/profile/index.js';
import {loginPage, createUser, asyncSendProfileData,uploadImage, currentUser} from './lib/index.js'
import { navigateTo } from './routes.js';

const mainLogin = document.getElementById("root")

window.addEventListener("load", () => {
  navigateTo("signin", signin())

  const signUpLink = document.getElementById("signup-link") 
  signUpLink.addEventListener("click", (e) => {
    e.preventDefault()
    navigateTo("signup", signup())
    const registerBtn = document.getElementById("register-btn");
    
    const backSignIn = document.querySelector("#back-sign-in");
    backSignIn.addEventListener("click", () => {
      navigateTo("signin",signin()) 
    })

  })
})

        
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
