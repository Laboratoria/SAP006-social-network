
//  signUp: () => {
//     const email = document.getElementById("signUpEmail").value
//     const password = document.getElementById("signUpPassword").value
//      firebase
//      .auth()
//      .createUserWithEmailAndPassword(email, password)
//      .then( () => {
//          alert("Cadastro concluído com sucesso!")
//          setTimeout( () => {
//              window.location.replace("index.html")
//          }, 1000)
//      })
//      .catch((error) => {
//          const errorCode = error.code
//          if(errorCode == "auth/weak-password"){
//             alert("Senha muito fraca")
//         }
//         else if(errorCode == "auth/email-already-in-use"){
//             alert("Esse e-mail já está sendo usado \nPor favor, utilize outro e-mail!")            
//         }
//         else{
//             alert(error.message)
//         }
//      })
//  }