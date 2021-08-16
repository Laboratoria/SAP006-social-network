export const signIn = (email, password, onError) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        window.location.hash = '#feed';
        return result;
      })
      .catch(error => onError(error));
  };
  
  export const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        window.location.hash = '#feed';
        return result;
      }).catch(error => error);
    };