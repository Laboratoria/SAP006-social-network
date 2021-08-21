// Firebase

// const email = 'bruna.belo@gmail.com';
// const password = '123456';

// Criar usuario

export const createUser = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
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

// Login com email cadastrado

export const loginUser = (email, password) => firebase.auth()
  .signInWithEmailAndPassword(email, password);

// Login com google

export const signInWithGloogle = () => {
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
