import home from './pages/home/index.js'
import signin from './pages/signin/index.js';
import {getUser} from './lib/index.js'
import { changeContent } from './routes.js';
//import { router } from './routes.js';


const mainLogin = document.getElementById("root")

window.addEventListener("load", () => {
  const loggedUser = getUser()
  console.log(loggedUser)
  if(loggedUser == undefined || loggedUser == null){
    mainLogin.appendChild(signin())
  }
  else{
    mainLogin.appendChild(home())    
  }
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
