// Firebase

// const email = 'bruna.belo@gmail.com';
// const password = '123456';

// Criar usuario

export const fireBaseUser = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
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

// Login com google

export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = firebase.auth().singInWhithPopUp(provider)
    .then(() => {
      window.location.assign('./feed');
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
};
