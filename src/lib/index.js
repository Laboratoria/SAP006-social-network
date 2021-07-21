const database = firebase.firestore()

export const signInHome = {
  loginPage: (feed) => {
      if (firebase.auth().currentUser){
          firebase.auth().signOut()
      }
      const email = document.getElementById("login-email").value
      const password = document.getElementById("login-password").value
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
          document.getElementById("root").innerHTML = feed;
          setTimeout( () => {
              window.location.replace("index.html")
          }, 1000)
      })
      .catch((error) => {
          const errorCode = error.code
          if(errorCode == "auth/user-not-found"){
              document.getElementById("user-error").style.display = "block";
              document.getElementById("login-email").style.border = "1px solid red";
              document.getElementById("login-password").style.border = "1px solid red";
          }
          else if(errorCode == "auth/invalid-email"){
            document.getElementById("login-email").style.border = "1px solid red";
            document.getElementById("email-error").innerHTML = "E-mail inválido";
          }
          else if(errorCode == "auth/wrong-password"){
            document.getElementById("login-password").style.border = "1px solid red";
            document.getElementById("password-error").innerHTML = "Senha inválida";
          }
          else{
              alert(error.message)
          }
      })
   }
  }

export const createUser = async(email, password) =>{
  await firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)

}

export const getUser = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if(user){
      return true

    }else{
      return false

    }
  })
}

export const asyncGetProfileData = async () => {
  const logProfiles = await database.collection("profiles").get()
  for ( data of logProfiles.docs){
    profile = {
      name: document.id,
      image: document.image
    }
    console.log(profile)
  }
}

export const asyncSendProfileData= async (name, image) => {
  await database.collection("profiles").add({
    name:name,
    image:image,
  })
  console.log("deu certo")
}
