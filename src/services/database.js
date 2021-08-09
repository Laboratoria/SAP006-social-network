import { printPost } from '../components/feed.js'

export const loadPosts = () => {
  const collectionOfPosts = firebase.firestore().collection('posts');
  collectionOfPosts.get()
    .then(snap => {
      snap.forEach(post => {
        printPost(post);
      });
    });
}

export const addPosts = (post) => {
  firebase.firestore().collection('posts').add(post);
}

export const deletePost = (postId) => {
  firebase.firestore().collection("posts").doc(postId).delete();
}

