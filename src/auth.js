const auth = {
loginPage: (feed) => {
    if (firebase.auth().currentUser){
        firebase.auth().signOut()
    }
    const email = document.getElementById("loginEmail").value
    const password = document.getElementById("loginPassword").value
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
        alert("Login realizado")
        feed()
        setTimeout( () => {
            window.location.replace(feed)
        }, 1000)
    })
    .catch((error) => {
        const errorCode = error.code
        if(errorCode == "auth/user-not-found"){
            alert(`Usuário não encontrado`)
        }
        else if(errorCode == "auth/wrong-password"){
            alert("Senha invalida")
        }
        else if(errorCode == "auth/invalid-email"){
            alert("E-mail invalido")
        }
        else{
            alert(error.message)
        }
    })
 }
}

export default auth

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