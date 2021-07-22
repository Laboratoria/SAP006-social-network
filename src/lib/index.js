const database = firebase.firestore()

export const createUser= async(email, password) =>{
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

export const signInGoogleAccount = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  firebase
    .auth()
    .signInWithPopup(provider)
    
    .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  })
  .catch((error) => {
    
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  
}

 
export const signOut = () => {
  firebase
  .auth()
  .signOut()
  /*
  .then(() => {
    // Sign-out successful.
  }).catch((error) => {
    swal.fire({
      icon: "error",
      title: error.message,
    })// An error happened.
  });
 */
}
