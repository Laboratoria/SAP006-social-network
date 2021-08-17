const db = firebase.firestore();

export const addPost = (postar) => db.collection('posts').add(postar);

export const getPosts = () => db.collection('posts').orderBy('data').limit(15).get();

export const liked = (postID) => {
  const likes = firebase.firestore().collection('posts').doc(postID);
  const userId = firebase.auth().currentUser.uid;
  return likes.update({
    curtidas: firebase.firestore.FieldValue.arrayUnion(userId),
  });
};

export const unliked = (postID) => {
  const likes = firebase.firestore().collection('posts').doc(postID);
  const userId = firebase.auth().currentUser.uid;
  return likes.update({
    curtidas: firebase.firestore.FieldValue.arrayRemove(userId),
  });
};
// (firebase.auth().currentUser.uid === `${doc.data().user_id}`)
