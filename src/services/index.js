// Firebase

// const email = 'bruna.belo@gmail.com';
// const password = '123456';

// Criar usuario

export const createUser = (email, password) => {
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

// Login com email cadastrado

export const loginUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.location.hash = '#feed';
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      let errorMessage = error.message;
      const errorMsg = document.querySelector('#error-message');
      if (errorCode === 'auth/user-not-found') {
        errorMessage = 'Seu email ou senha está incorreto. Tente novamente';
        errorMsg.innerHTML = errorMessage;
      } else if (errorCode === 'auth/wrong-password') {
        errorMessage = 'Seu email ou senha está incorreto. Tente novamente';
        errorMsg.innerHTML = errorMessage;
      } else {
        errorMessage = 'Usuário não cadastrado';
        errorMsg.innerHTML = errorMessage;
      }
      return error;
    });
};

// Login com google

export const signInWithGloogle = () => {
  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(googleProvider)
    .then(() => {
      window.location.hash = '#feed';
      return googleProvider;
    })
    // eslint-disable-next-line arrow-parens
    .catch(error => {
      console.error(error);
    });
};

// Logout

export const logout = () => {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
    console.log('Erro', error);
  });
};
