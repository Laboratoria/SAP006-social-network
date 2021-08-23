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

export const likePost = (postId) => {
  const post = firebase
    .firestore()
    .collection('posts')
    .doc(postId);
  post.onSnapshot((doc) => {
    const userId = firebase.auth().currentUser.uid;
    const curtidas = doc.data().likes;
    if (curtidas.includes(userId)) {
      post.update({
        likes: firebase.firestore.FieldValue.arrayRemove(userId),
      });
    } else {
      post.update({
        curtidas: firebase.firestore.FieldValue.arrayUnion(userId),
      });
    }
  });
};

// export const dislikePost = (postId) => {
//   const curtida = {
//     uid: firebase.auth().currentUser.uid,
//   };

//   const documentoPost = firebase
//     .firestore()
//     .collection('posts')
//     .doc(postId);
//   documentoPost.update({
//     likes: firebase.firestore.FieldValue.arrayRemove(curtida),
//   });
// };

// export const likePost = (postId, currentUser) => {
//   const likesPostId = firebase.firestore().collection('posts').doc(postId);
//   const promiseResult = likesPostId
//     .get()
//     .then(((post) => {
//       const people = post.data().likes;
//       if (people.length >= 1) {
//         if (people.includes(currentUser)) {
//           likesPostId.update({
//             likes: firebase.firestore.FieldValue.arrayRemove(currentUser),
//           });
//           return 'dislike';
//         }
//         likesPostId
//           .update({
//             likes: firebase.firestore.FieldValue.arrayUnion(currentUser),
//           });
//         return 'like';
//       }
//       likesPostId
//         .update({
//           likes: firebase.firestore.FieldValue.arrayUnion(currentUser),
//         });
//       return 'like';
//     }));
//   // .catch((error) => {
//   //   getError(error);
//   // });
//   return promiseResult;
// };
