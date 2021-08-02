
export const signInWithGoogle = () => {

  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
    .signInWithPopup(provider)
    .then(result => {

      const credentials = {
        credecial: result.credential,
        token: credential.accessToken,
        user: result.user
      }
      return credentials
    })
    .catch(error => {
      const errorCode = error.code;
      if (errorCode === "auth/credential-already-in-use") {
        alert('Opa, está credencial já está em uso')
      }
      else {
        alert(error.message)
      }
    });
}

