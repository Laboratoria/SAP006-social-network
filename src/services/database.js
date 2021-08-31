export const loadPosts = () => firebase
  .firestore()
  .collection('posts')
  .orderBy('text', 'desc')
  .get();// aqui vai gerar uma promise

export const addPosts = (post) => firebase
  .firestore()
  .collection('posts')
  .add(post)
  .then(() => {
    window.location.reload();
  });

export const updatePosts = (postId, newText) => firebase
  .firestore()
  .collection('posts')
  .doc(postId)
  .update({ text: newText })
  .then(() => {
    // window.location.reload();
  })
  .catch(() => {
    console.log('Não foi dessa vez');
  });

export const deletePost = (postId) => firebase
  .firestore()
  .collection('posts')
  .doc(postId)
  .delete()
  .then(() => console.log(postId));
  // then deverá ser aplicado no addEventListener do feed.js
  // .then(() => window.location.reload());

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
