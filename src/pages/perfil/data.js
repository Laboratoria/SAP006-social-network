import { getTheRoad } from "../../router.js";

export const user = (nome, url) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: nome,
      photoURL: url,
    }).then(() => {
      console.log('Perfil atualizado')
    }).catch((error) => {
      console.log(error);
    });
  };
  
  export const perfilImage = (photo, callback) => {
    const file = photo.files[0];
    const storageRef = firebase.storage().ref('imagens/' + file.name);
  
    storageRef.put(file).then(() => {
      storageRef.getDownloadURL().then((url) => {
        callback(url);
      });
    });
  };
  
  export const back = () => {
    getTheRoad("/feed");
  };