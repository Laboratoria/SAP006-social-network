export const loadPosts = () => firebase
  .firestore()
  .collection('posts')
  .orderBy('datePost', 'desc')
  .get();

export const addPosts = (postId) => firebase
  .firestore()
  .collection('posts')
  .add(postId);
  // .then(() => window.location.reload());

export const updatePosts = (postId, newText) => firebase
  .firestore()
  .collection('posts')
  .doc(postId)
  .update({ text: newText })
  .then(() => {
    // window.location.reload();
  });

export const deletePost = (postId) => firebase
  .firestore()
  .collection('posts')
  .doc(postId)
  .delete();

export const getLikes = (postId) => firebase
  .firestore()
  .collection('posts')
  .doc(postId)
  .get();

export const likePost = (userId, postId) => firebase
  .firestore()
  .collection('posts')
  .doc(postId)
  .update({ likes: firebase.firestore.FieldValue.arrayUnion(userId) });

export const unlikePost = (userId, postId) => firebase
  .firestore()
  .collection('posts')
  .doc(postId)
  .update({ likes: firebase.firestore.FieldValue.arrayRemove(userId) });

export const searchDrinks = (array) => firebase
  .firestore()
  .collection('posts')
  .where('terms', 'array-contains-any', array)
  .orderBy('datePost', 'desc')
  .get();
