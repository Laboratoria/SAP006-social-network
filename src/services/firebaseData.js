const db = firebase.firestore();
const storage = firebase.storage();
export const addPost = (postar) => db.collection('posts').add(postar);

export const getPosts = () => db.collection('posts').orderBy('data').limit(5).get();

export const uploadImage = (folder, file) => {
  const ref = storage.ref();
  const imageName = ((new Date().getTime() / 1000) * Math.random()).toString();
  const metadata = {
    contentType: file.type,
  };
  return ref.child(folder).child(imageName).put(file, metadata);
};
