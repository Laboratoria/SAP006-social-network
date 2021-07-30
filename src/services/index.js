//senha
export const createUserWithEmailAndPassword = () => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(
      picture,
      fullName,
      username,
      email,
      password,
      confirmPassword,
      telephone
    )

    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

const verifyUser = () => {
  firebase.auth().onAuthStateChanged((currentUser) => {
  if (currentUser) {
    const uid = currentUser.uid;
    console.log(uid);
    window.history.pushState({}, null, "/feed");
    //   // User is signed in
    const popStateEvent = new PopStateEvent("popstate", { state: {} });
    dispatchEvent(popStateEvent);
  } else {
    // User is signed out
    console.log('usuária não cadastrada')
  }
});
}

export const signInEmailPassword = (email, password) => {
  verifyUser();
  const signIn = firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);

    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        alert("Senha incorreta.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  return signIn;
};

// google
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
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credentialError = error.credential;
      // ...
    });
};

export function keepLogged(persistence) {
  // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.persistence)
  firebase
    .auth()
    .setPersistence(persistence)
    .then(() => {
      const provider = new firebase.auth();
      // In memory persistence will be applied to the signed in Google user
      // even though the persistence was set to 'none' and a page redirect
      // occurred.
      return firebase.auth().signInWithRedirect(provider);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export const resetPassword = (email) => {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log("Password reset email sent successfully");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
