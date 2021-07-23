const database = firebase.firestore()
const storage = firebase.storage()

export const loginPage = (email,password) => {
  if (firebase.auth().currentUser){
      firebase.auth().signOut()
  }
  return firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  // .then(() => {
  //     alert("Login realizado")
  //     feed()
  //     setTimeout( () => {
  //         window.location.replace(feed)
  //     }, 1000)
  // })
  // .catch((error) => {
  //     const errorCode = error.code
  //     if(errorCode == "auth/user-not-found"){
  //         alert(`Usuário não encontrado`)
  //     }
  //     else if(errorCode == "auth/wrong-password"){
  //         alert("Senha invalida")
  //     }
  //     else if(errorCode == "auth/invalid-email"){
  //         alert("E-mail invalido")
  //     }
  //     else{
  //         alert(error.message)
  //     }
  // })
}


export const createUser = async(email, password) =>{
  await firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then(()=>{
    alert("Cadastro efetuado com sucesso")
    //redirecionar para tela profile
  })
 

}

export const currentUser = () =>{
  const user = firebase.auth().currentUser;
  return user
}

export const getUser = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if(user){
      console.log(user)
      return user.uid

    }else{
      setTimeout(()=>{
        window.location.replace("./index.html")
      },1000)

    }
  })
}

export const asyncGetProfileData = async () => {
  const logProfiles = await database.collection("profiles").get()
  for ( data of logProfiles.docs){
    profile = {
      name: document.id,
      image: document.image
    }
    console.log(profile)
  }
}

export const asyncSendProfileData= async (name, image) => {
  await database.collection("profiles").add({
    name:name,
    image:image,
  })
  console.log("deu certo")
}

export const uploadImage = (id, userid) =>{
  const ref = storage.ref()
  const file = document.getElementById(id).files[0]
  const imageName = userid
  const metadata = {
    contentType:file.type,
  }

  return ref.child(imageName).put(file, metadata)

  //uploading
  // .then(snapshot => snapshot.ref.getDownloadURL())
  // .then (url => {
  //   const urlImage = url
  //   console.log(urlImage)
  //   return urlImage
  // })

}


