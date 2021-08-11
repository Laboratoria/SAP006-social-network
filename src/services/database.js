import { printPost } from '../components/feed.js'

export const loadPosts = () => {
  return firebase
  .firestore()
  .collection('posts')
  .orderBy('time', 'desc')
  .get()
  .then(snap => {
    // const posts = [];
    snap.forEach(post => {
      printPost(post);
    });
  });
  // .catch((error) => {
  //   console.error('Erro ao excluir o post: ', error);
  // });
};

export const addPosts = (post) => {
  return firebase
  .firestore()
  .collection('posts')
  .add(post)
  .then(() => loadPosts());
};

export const deletePost = (postId) => {
  return firebase
  .firestore()
  .collection("posts")
  .doc(postId)
  .delete()
  .then(() => {
    console.log('Publicação deletada!');
  })
  .then(() => loadPosts())
  .catch((error) => {
    console.error('Erro ao excluir o post: ', error);
  });
  };