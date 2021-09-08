const auth = firebase.auth();

// funções de login para criar conta chamar onnavigate
export const loginWithEmailAndPassword = (email, password) => auth
  .signInWithEmailAndPassword(email, password);

// FUNÇÃO DE LOGIN COM GOOGLE
export const signInWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(googleProvider);
};

export function cadastrarsenha(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}
