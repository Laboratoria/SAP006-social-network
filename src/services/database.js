import { printPost } from '../components/feed.js';

export const loadPosts = () => {
  firebase
    .firestore()
    .collection('posts')
    .orderBy('text', 'desc')
    .get()
    .then((snap) => {
      snap.forEach((post) => {
        // console.log(post.id);
        printPost(post);
      });
    });
  // .catch((error) => {
  //   console.error('Erro ao excluir o post: ', error);
  // });
};

export const addPosts = (post) => firebase
  .firestore()
  .collection('posts')
  .add(post)
  .then(() => loadPosts());

export const updatePost = (valueInput) => firebase
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
    // console.log('Publicação deletada!');
  })
  .then(() => loadPosts())
  .catch((error) => {
    // console.error('Erro ao excluir o post: ', error);
  });
