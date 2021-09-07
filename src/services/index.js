// const email = "julie_sp1990@hotmail.com";
// const password = "123456";
// firebase
// .auth()
// .createUserWithEmailAndPassword(email , password)
// .then(userCredential) => {

//   const user = userCredential.user;

// })

// .catch((error) => {
//   const errorCode = error.code;
//   const errorMessage = error.message;

// });



export const registerLogin = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userIdentification) => {
      // Signed in
        const user = userIdentification.user;
        window.location.hash = '#login';
        console.log('deu bom', user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log('deu ruim', errorCode, errorMessage);
      });
  };
  
  // Login 
  
  export const signIn = (email, password) => firebase.auth()
    .signInWithEmailAndPassword(email, password);
  
  // Login com google
  

export const loginWithGoogle = () => {
  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(googleProvider);
};
  // Logout
  
  export const logout = () => {
    firebase.auth().signOut()
      .then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
        console.log('Erro', error);
      });
  };
  
  // Post
  
  export const newPost = (postInf) => {
    const db = firebase.firestore();
    return db.collection('posts').add(postInf);
  };