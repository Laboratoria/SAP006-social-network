
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

      alert(`Atenção, o email ${error.email} não foi possível efetuar o cadastro.
    Atenção, página ${error.code} não encontrada. Por favor, verifique se não
    há erro de digitação ${error.message}. Por favor, confire sua credencial${error.credecial}.`);
    });
}