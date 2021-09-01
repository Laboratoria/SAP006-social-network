export const loadPosts = () => firebase
  .firestore()
  .collection('posts')
  .orderBy('text', 'desc')
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
  // then deverá ser aplicado no addEventListener do feed.js
  // .then(() => window.location.reload());

// export const likePost = (postId) => {

// };
