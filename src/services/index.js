export const registerLogin = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
      // Signed in
        const user = userCredential.user;
        window.location.hash = '#login';
        console.log('deu bom', user);
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
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
  
  export const logOut = () => firebase.auth().signOut();
    
  
  // Fazer Post
  
  export const postarMensagem = (postagem) => {
    const db = firebase.firestore();
   return db.collection("postagens").add(postagem);
  };