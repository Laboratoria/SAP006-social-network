import feed from './pages/feed/index.js'
import signup from './pages/signup/index.js';
import signin from './pages/signin/index.js';
import createprofile from './pages/createprofile/index.js'
import profile from './pages/profile/index.js';
import {loginPage, createUser, asyncSendProfileData,uploadImage, currentUser, getUser, setPersistence} from './lib/index.js'
import { changeContent } from './routes.js';
//import { router } from './routes.js';


const mainLogin = document.getElementById("root")




window.addEventListener("load", () => {
  const loggedUser = getUser()
  console.log(loggedUser)
  if(loggedUser == undefined || loggedUser == null){
    mainLogin.appendChild(signin())
    // window.history.pushState("signin", null, "signin")

  }else{
    mainLogin.appendChild(feed())
    // window.history.pushState("feed", null, "feed")
    
  }
  // const url = window.location.pathname
  // const path = url.slice(1)
  // console.log(path)
  // changeContent(path)
 

  window.addEventListener('popstate', (e) =>{
    console.log(e.state)

    if(loggedUser == undefined || loggedUser == null){
      mainLogin.innerHTML=""
      mainLogin.appendChild(signin())     
  
    }else{
      changeContent(e.state)
    
      
    }
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
