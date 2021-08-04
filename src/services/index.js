export const createAccount = (email, password, confirmPassword) => {

  if (password !== confirmPassword) {
    alert('Algo errado não está certo, verifique a senha digitada!');
    return false;
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(user);
      navigation('/feed')
    })
    .then(() => {
      firebase.auth().currentUser.sendEmailVerification()
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        alert('E-mail já cadastrado');
      } else if (errorCode === 'auth/invalid-email') {
        alert('E-mail inválido');
      } else if (errorCode === 'auth/weak-password') {
        alert('Senha fraca');
      } else {
        alert('Algo deu errado. Por favor, tente novamente.');
      }
    });
};

const verifyUser = () => {
  firebase.auth().onAuthStateChanged((currentUser) => {
    if (currentUser) {
      const uid = currentUser.uid;
      console.log(uid);
      navigation('/feed')
    }
  });
}

export const signInEmailPassword = (email, password) => {
  verifyUser();
  const signIn = firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;

      if (errorCode === 'auth/invalid-email') {
        alert('Poxa, mana, digita um e-mail válido');
      } else if (errorCode === 'auth/user-disabled') {
        alert('ihhh... parece que essa conta foi desativada');
      } else if (errorCode === 'auth/user-not-found') {
        alert('Para tudooo, vai se cadastrar primeiro!');
      } else if (errorCode === 'auth/wrong-password') {
        alert('Deu ruim! A senha ou o e-mail estão errados...');
      } else {
        alert('Algo deu errado. Por favor, tente novamente.');
      }
    });
  return signIn;
};

export const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credentialError = error.credential;
      // ...
    });
};

export const keepLogged = (persistence) => {
  firebase
    .auth()
    .setPersistence(persistence)
    .then(() => {
      const provider = new firebase.auth();
      return firebase.auth().signInWithRedirect(provider);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export const resetPassword = (email) => {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      alert('Corre lá e muda sua senha, miga!');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
