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

export const updateRecipePost = (postID, ingredients, preparation,
  time, difficulty, category, cost) => db.collection('recipes').doc(postID).update({
  ingredientes: ingredients,
  'modo de preparo': preparation,
  'tempo de preparo': time,
  dificuldade: difficulty,
  categoria: category,
  preco: cost,
});

export const updateRecipeLevel = (level) => {
  db.collection('recipes').get().then((querySnapshot) => {
    querySnapshot.forEach((recipe) => {
      if (recipe.data().user_id === firebase.auth().currentUser.uid) {
        db.collection('recipes').doc(recipe.id).update({
          nivel: level,
        });
      }
    });
  });
};

export const updateUserDisplayName = (data) => firebase.auth().currentUser.updateProfile({
  displayName: data,
}).then(() => updateRecipeAuthorName(data));

export const updateUserAuthEmail = (data) => firebase.auth().currentUser.updateEmail(data)
  .then(() => {
    const user = firebase.auth().currentUser;

    // TODO(you): prompt the user to re-provide their sign-in credentials
    const credential = promptForCredentials();

    user.reauthenticateWithCredential(credential).then(() => {
      // User re-authenticated.
    });
  });

export const updateUserLevel = (data, uid) => db.collection('levels').doc(uid).set({
  level: data,
  userUid: uid,
});

export const getUserLevelCollection = () => db.collection('levels').get();

export const getUserLevel = (uid) => db.collection('levels').doc(uid).get();

export const getRecipesCollectionDoc = (postId) => db.collection('recipes').doc(postId).get();

export const signUp = (email, password, signUpName) => firebase.auth()
  .createUserWithEmailAndPassword(email, password)
  .then((credential) => updateUserLevel('Nível não selecionado', credential.user.uid))
  .then(() => updateUserDisplayName(signUpName))
  .then(() => setUserData())
  .then(() => localStorage.setItem('level', 'Nível não selecionado'));

export const signIn = (email, password) => firebase.auth()
  .signInWithEmailAndPassword(email, password)
  .then((credential) => getUserLevel(credential.user.uid))
  .then((level) => level.data().level)
  .then((level) => localStorage.setItem('level', level))
  .then(() => setUserData());

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider)
    .then((credentials) => {
      setUserData();
      const userInfo = credentials;
      getUserLevel(userInfo.user.uid)
        .then((userDoc) => {
          let level = '';
          if (userDoc.exists) {
            level = userDoc.data().level;
          } else {
            level = 'Nível não selecionado';
          }
          return level;
        })
        .then((level) => {
          localStorage.setItem('level', level);
        });
    });
};

export const signOut = () => firebase.auth().signOut();

export const postRecipe = (recipe) => db.collection('recipes').add(recipe);

export const loadRecipe = () => db.collection('recipes').orderBy('data', 'desc').get();

export const likesPost = (postId) => db.collection('recipes').doc(postId).get()

  .then((docPost) => {
    const likeUsers = docPost.data().likes;
    let test;

    if (likeUsers.includes(getUserData().uid)) {
      test = db.collection('recipes').doc(postId).update({
        likes: firebase.firestore.FieldValue.arrayRemove(getUserData().uid),
      });
    } else {
      test = db.collection('recipes').doc(postId).update({
        likes: firebase.firestore.FieldValue.arrayUnion(getUserData().uid),
      });
    }
    return test;
  });

export const numLikes = (postId) => db.collection('recipes').doc(postId).get();

export const deletePost = (postId) => db.collection('recipes').doc(postId).delete();

export const uploadFoodPhoto = (file) => {
  // create storage ref
  const storeageRef = firebase.storage().ref(`userRecipePhoto/ ${file.name}`);

  // upload file
  const task = storeageRef.put(file);
  return task;
};

export const resetPassword = (email) => firebase.auth().sendPasswordResetEmail(email);
