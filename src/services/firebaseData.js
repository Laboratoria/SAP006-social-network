const db = firebase.firestore();
const storage = firebase.storage();
export const addPost = (postar) => db.collection('posts').add(postar);

export const getPosts = () => db.collection('posts').orderBy('data').limit(5).get();


export const liked = (postID) => {
  const likes = firebase.firestore().collection('posts').doc(postID);
  const userId = firebase.auth().currentUser.uid;
  return likes.update({
    curtidas: firebase.firestore.FieldValue.arrayUnion(userId),
  });
};

export const unliked = (postID) => {
  const likes = firebase.firestore().collection('posts').doc(postID);
  const userId = firebase.auth().currentUser.uid;
  return likes.update({
    curtidas: firebase.firestore.FieldValue.arrayRemove(userId),
  });
};
// (firebase.auth().currentUser.uid === `${doc.data().user_id}`)

export const uploadImage = (folder, file) => {
  const ref = storage.ref();
  const imageName = ((new Date().getTime() / 1000) * Math.random()).toString();
  const metadata = {
    contentType: file.type,
  };
  return ref.child(folder).child(imageName).put(file, metadata);
};

