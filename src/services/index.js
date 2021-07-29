// Configurando as autenticações
export const googleLogin = (provider) => {
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      firebase.firestore().collection('users').doc(user.email)
        .set({
          name: user.displayName,
          id: user.uid,
          photo: user.photoURL,
        }, { merge: true });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('Essa conta já existe com uma credencial diferente');
      }
    });
};

export const signOut = () => {
  firebase.auth().signOut();
  window.location.hash = '';
  location.reload();
}

export const loginWithEmail = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if(password) {
          saveInfoProfile(userName);
          const user = userCredential.user;
          window.location.hash = 'timeline';
          console.log('senhas corretas', name + user);
        }
    })
}