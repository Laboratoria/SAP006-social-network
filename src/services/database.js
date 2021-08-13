import { printPost } from '../components/post/post.js';

export const loadPosts = () => {
  firebase
    .firestore()
    .collection('posts')
    .orderBy('text', 'desc')
    .get()
    .then((snap) => {
      snap.forEach((post) => {
        const postInfo = (post.data());
        printPost(postInfo);
      });
    });

};

export const addPosts = (post) => firebase
  .firestore()
  .collection('posts')
  .add(post)
  .then(() => loadPosts());

export const updatePost = (valueInput, post) => firebase
  .firestore()
  .collection('posts')
  .doc(post.id)
  .update({ text: valueInput });

export const deletePost = (postId) => firebase
  .firestore()
  .collection('posts')
  .doc(postId)
  .delete()
  .then(() => {
  })
  .then(() => loadPosts())
  .catch((error) => {
  });
