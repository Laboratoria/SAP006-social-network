const db = firebase.firestore();

export const getUserData = () => {
  const uid = localStorage.getItem('uid');
  const displayName = localStorage.getItem('displayName');
  const level = localStorage.getItem('level');
  return {
    uid,
    displayName,
    level,
  };
};

export const setUserData = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      localStorage.setItem('uid', user.uid);
      localStorage.setItem('displayName', user.displayName);
    }
  });
};

export const removeUserData = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      localStorage.clear();
    }
  });
};

export const updateRecipeAuthorName = (name) => {
  db.collection('recipes').get().then((querySnapshot) => {
    querySnapshot.forEach((recipe) => {
      if (recipe.data().user_id === firebase.auth().currentUser.uid) {
        db.collection('recipes').doc(recipe.id).update({
          autor: name,
        });
      }
    });
  });
};

export const updateUserDisplayName = (data) => firebase.auth().currentUser.updateProfile({
  displayName: data,
}).then(() => updateRecipeAuthorName(data));

export const updateUserAuthEmail = (data) => firebase.auth().currentUser.updateEmail(data);

export const updateUserLevel = (data, uid) => db.collection('levels').doc(uid).set({
  level: data,
});

export const getUserLevel = (uid) => db.collection('levels').doc(uid).get();

export const signUp = (email, password, signUpName) => firebase.auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => updateUserDisplayName(signUpName))
  .then(() => setUserData())
  .then(() => updateUserLevel('Nível não selecionado', getUserData().uid))
  .then(() => localStorage.setItem('level', 'Nível não selecionado'));

export const signIn = (email, password) => firebase.auth()
  .signInWithEmailAndPassword(email, password)
  .then((credential) => getUserLevel(credential.user.uid))
  .then((level) => level.data().level)
  .then((level) => localStorage.setItem('level', level))
  .then(() => setUserData());

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const signOut = () => firebase.auth().signOut();

export const userData = (name, email, uid) => db.collection('users').doc(uid).set({
  name,
  email,
  level: '',
});

export const postRecipe = (recipe) => db.collection('recipes').add({
  likes: [],
  comments: [],
  ...recipe,
});

export const loadRecipe = () => db.collection('recipes').get();

export const likesPost = (postId) => {
  db.collection('recipes').doc(postId).get()

    .then((docPost) => {
      const likeUsers = docPost.data().likes;

      if (likeUsers.includes(getUserData().uid)) {
        db.collection('recipes').doc(postId).update({
          likes: firebase.firestore.FieldValue.arrayRemove(getUserData().uid),
        });
      } else {
        db.collection('recipes').doc(postId).update({
          likes: firebase.firestore.FieldValue.arrayUnion(getUserData().uid),
        });
      }
    });
};

export const deletePost = (postId) => db.collection('recipes').doc(postId).delete();

export const uploadFoodPhoto = (file) => {
  // create storage ref
  const storeageRef = firebase.storage().ref(`userRecipePhoto/ ${file.name}`);

  // upload file
  const task = storeageRef.put(file);
  return task;
};
