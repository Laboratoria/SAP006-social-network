const db = firebase.firestore();
// const user = firebase.auth().currentUser;

export const signUp = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password);

export const signIn = (email, password) => firebase
  .auth().signInWithEmailAndPassword(email, password);

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => firebase.auth().signInWithPopup(provider);

export const signOut = () => {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    console.log(error);
    // An error happened.
  });
};

export const userData = (name, email, uid) => db.collection('users').doc(uid).set({
  name,
  email,
});

export const postRecipe = (recipe) => db.collection('recipes').add({
  likes: 0,
  comments: 0,
  user_id: firebase.auth().currentUser.uid,
  ...recipe,
});
