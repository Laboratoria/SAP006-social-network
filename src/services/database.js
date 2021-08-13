import { printPost } from '../components/feed_component.js';

export function loadPosts() {
  firebase
    .firestore()
    .collection('posts')
    .orderBy('text', 'desc')
    .get()
    .then((snap) => {
      snap.forEach((post) => {
        printPost(post);
      });
    });
  // .catch((error) => {
  //   console.error('Erro ao excluir o post: ', error);
  // });
}

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
    // console.log('Publicação deletada!');
  })
  .then(() => loadPosts());
  // .catch((error) => {
  //   console.error('Erro ao excluir o post: ', error);
  // });
