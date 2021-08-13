const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

export const getUserData = () => {
  const uid = localStorage.getItem('uid');
  const displayName = localStorage.getItem('displayName');
  return {
    uid,
    displayName,
  };
};

export const setUserData = (uid, displayName) => {
  localStorage.setItem('uid', uid);
  localStorage.setItem('displayName', displayName);
};

export const updateUserDisplayName = (data) => firebase.auth().currentUser.updateProfile({
  displayName: data,
});

export const updateUserAuthEmail = (data) => firebase.auth().currentUser.updateEmail(data);

export const updateUserLevel = (data, uid) => db.collection('levels').doc(uid).set({
  level: data,
});

export const signUp = (email, password, signUpName) => firebase.auth()
  .createUserWithEmailAndPassword(email, password).then(() => {
    updateUserDisplayName(signUpName);
  })
  .then(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserData(user.uid, signUpName);
      }
    });
  });

export const signIn = (email, password) => firebase
  .auth().signInWithEmailAndPassword(email, password);
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    setUserData(user.uid, user.displayName);
  }
});

export const signInWithGoogle = () => firebase.auth().signInWithPopup(provider);

// export const signOut = () => {
//   firebase.auth().signOut().then(() => {
//     // Sign-out successful.
//   }).catch((error) => {
//     // An error happened.
//   });
// };

export const userData = (name, email, uid) => db.collection('users').doc(uid).set({
  name,
  email,
  level: '',
});

export const postRecipe = (recipe) => db.collection('recipes').add({
  likes: 0,
  comments: 0,
  user_id: firebase.auth().currentUser.uid,
  ...recipe,
});
