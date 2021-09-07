export const updateProfile = (userName) => {
  firebase.auth()
    .currentUser.updateProfile({
      displayName: userName,
      return: updateProfile,
    });
};

export const createAccount = (email, password, userName) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      updateProfile(userName);
    });
};

export const signInEmailPassword = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      localStorage.setItem('displayName', user.user.displayName);
      localStorage.setItem('email', user.user.email);
    });
};

export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.history.pushState({}, null, '/login');
      const popStateEvent = new PopStateEvent('popstate', {});
      dispatchEvent(popStateEvent);
    });
};

export const signInGoogle = (userName) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider).then((user) => {
      localStorage.setItem('displayName', user.user.displayName);
      localStorage.setItem('email', user.user.email);
    })
    .then(() => {
      updateProfile(userName);
    });
};

export const keepLogged = () => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
};

export const resetPassword = (email) => {
  firebase
    .auth()
    .sendPasswordResetEmail(email);
};

export const uploadPicture = (userId, file) => {
  firebase
    .storage()
    .ref(`images/${userId}`)
    .put(file);
};

export const downloadPicture = (userId, currentUser) => {
  firebase
    .storage()
    .ref()
    .child(`images/${userId}`)
    .getDownloadURL()
    .then((url) => {
      currentUser
        .updateProfile({
          photoURL: url,
        });
    });
};
