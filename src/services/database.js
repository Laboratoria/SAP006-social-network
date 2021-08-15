export const loadPosts = () => firebase
  .firestore()
  .collection('posts')
  .orderBy('text', 'desc')
  .get();// aqui vai gerar uma promisse

export const addPosts = (post) => firebase
  .firestore()
  .collection('posts')
  .add(post)
  .then(() => loadPosts());

export const updatePosts = (postId, newText) => firebase
  .firestore()
  .collection('posts')
  .doc(postId)
  .update({ text: newText })
  .then(() => {
    console.log('Caiu no load');
  })
  .catch(() => {
    console.log('Não foi dessa vez');
  });

export const deletePost = (postId) => firebase
  .firestore()
  .collection('posts')
  .doc(postId)
  .delete()
  .then(() => {
  })
  .then(() => loadPosts());
