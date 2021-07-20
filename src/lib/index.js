const database = firebase.firestore()

export const createUser= async(email, password) =>{
  await firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)

}

export const getUser = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if(user){
      return true

    }else{
      return false

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
