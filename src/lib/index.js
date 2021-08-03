const database = firebase.firestore()
const storage = firebase.storage()

export const loginPage = (email,password) => {
  if (firebase.auth().currentUser){
      firebase.auth().signOut()
  }
  return firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
}

export const createUser = async(email, password) =>{
  await firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
}

export const setPersistence = () =>{
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
}

export const currentUser = () =>{
  return firebase.auth().currentUser
  
}

  
export const logout = () =>{
  firebase.auth().signOut()
}

export const updateUserName = (userName) => {
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: userName,
  })
}

export const updateUserImage = (urlImage) => {
  const user = firebase.auth().currentUser;

  user.updateProfile({
    photoURL: urlImage,
  })
}

// export const asyncGetProfileData = async () => {
//   const logProfiles = await database.collection("profiles").get()
//   for ( data of logProfiles.docs){
//     profile = {
//       name: document.id,
//       image: document.image
//     }
//     console.log(profile)
//   }
// }


export const signInGoogleAccount = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(provider)
    
}
/*
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    .then((result) => {
    //@type {firebase.auth.OAuthCredential} 
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
*/

 
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

export const uploadImage = (id, userid) =>{
  const ref = storage.ref()
  const file = document.getElementById(id).files[0]
  const imageName = userid
  const metadata = {
    contentType:file.type,
  }

  return ref.child(imageName).put(file, metadata)

  //uploading
  // .then(snapshot => snapshot.ref.getDownloadURL())
  // .then (url => {
  //   const urlImage = url
  //   console.log(urlImage)
  //   return urlImage
  // })

}

export const forgotPassword = (email) =>{
  if(email !== ''){
    return firebase.auth()
    .sendPasswordResetEmail(email)
  }
}


export const createReview = (bookUser, editionUser, authorUser, reviewUser, ratingStars, nameUser) => { 
  const dateReview = new Date()
  
  firebase
  .firestore()
  .collection("reviews").add({
    book: bookUser,
    edition: editionUser,
    author: authorUser,
    review: reviewUser,
    rating: ratingStars,
    userName: nameUser,
    userId: firebase.auth().currentUser.uid,
    datePost: `${dateReview.toLocaleDateString()} ${dateReview.getHours()}:${dateReview.getMinutes()}`,
    savingForLater: [] //likes? list?
  })
  .then(() => {
    console.log("Document successfully written!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
}



export const getReviews = () => {
  firebase
  .firestore()
  .collection("reviews").orderBy("time", "desc").get()   
}