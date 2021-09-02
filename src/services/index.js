import { onNavigate } from '../navigate.js';

export const saveUserIdOnLocalStorage = (uid) => {
  localStorage.uid = uid;
};

export const getUserIdOnLocalStorage = () => localStorage.uid;

export const clearLocalStorage = () => localStorage.clear();

export const loginWithGoogleAccount = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const loginWithEmailAndPassword = (
  userEmail,
  userPassword,
) => firebase.auth()
  .signInWithEmailAndPassword(userEmail, userPassword);

export const createAccountWithEmailAndPassword = (
  userEmail,
  userPassword,
) => firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword);

export const userUpdateProfile = (userName) => firebase.auth().currentUser
  .updateProfile({
    displayName: userName,
  });

export const logOut = () => firebase.auth().signOut();

export const loadPosts = () => {
  const postsCollection = firebase
    .firestore()
    .collection('posts');
  return postsCollection.orderBy('createdAt', 'desc').get();
};

export const createPost = (textPost) => {
  const date = new Date();
  const user = firebase.auth().currentUser;
  const post = {
    text: textPost,
    userId: user.uid,
    userName: user.displayName,
    userEmail: user.email,
    createdAt: date.toLocaleString('pt-BR'),
    likes: [],
    comments: [],
  };

  const postsCollection = firebase
    .firestore()
    .collection('posts');
  return postsCollection.add(post);
};

export const currentUser = () => firebase.auth().currentUser;

export const editPost = (newText, postId) => firebase
  .firestore().collection('posts').doc(postId)
  .update({
    text: newText,
  });

firebase.auth().onAuthStateChanged(() => {
  if (!firebase.auth().currentUser) {
    onNavigate('/');
  }
});

export const deletePost = (id) => firebase
  .firestore()
  .collection('posts').doc(id).delete();

export const likesPost = (postId) => {
  firebase
    .firestore()
    .collection('posts').doc(postId).get()
    .then((post) => {
      const arrayLikes = post.data().likes;
      const likesInPost = firebase
        .firestore()
        .collection('posts').doc(postId);
      if (getUserIdOnLocalStorage()) {
        likesInPost.update({

          likes: firebase.firestore.FieldValue.arrayUnion(getUserIdOnLocalStorage()),
        });
      }
      if (arrayLikes.includes(getUserIdOnLocalStorage())) {
        likesInPost.update({
          likes: firebase.firestore.FieldValue.arrayRemove(getUserIdOnLocalStorage()),
        });
      }
    });
};
