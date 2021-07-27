import { currentUser , uploadImage, asyncSendProfileData} from "../../lib/index.js"
import { changeContent} from '../../routes.js'
import { errorInput } from '../../error.js'
import feed from "../feed/index.js"


export default () => {

  window.history.pushState("createprofile", null, "/createprofile")

  const sectionElement = document.createElement("section")
  sectionElement.setAttribute("id","create-profile")
  sectionElement.setAttribute("class","form-page")


  const createProfileTemplate = `
    <div class="logo-container logo-container-register">
      <img class="site-logo" src="./img/logo.png">
    </div>
    <div  class="form-container" id="form-create-profile">
      <h1 class="h1-login">CADASTRO</h1>
      <fieldset class="fieldset-create-profile fieldset">
        <form class="form" action="">
          <div class="container-file-img">
            <img src="./img/camera.png" class="file-img">
          </div>
          <input type="file" class="file-input" id="input-profile-img" accept="image/*">
          <input type="text" placeholder="Nome de usuário" class="form-input" id="input-username">
          <button type="button"id="send-profile" class="btn">Enviar</button>
        </form>
      </fieldset>
    </div>

  `

  sectionElement.innerHTML= createProfileTemplate

  let photo = sectionElement.querySelector(".file-img")
  let file = sectionElement.querySelector(".file-input")

  photo.addEventListener("click", () =>{
    file.click()
  })

  file.addEventListener("change", (e) => {
    if(file.files.legth <= 0){
      return;
    }
    photo.style.borderRadius = "50%"
    photo.style.boxShadow="0px 0px 14px 4px rgba(100,100,100,0.7)"
  
    
    let reader =  new FileReader()
    reader.onload = () => {
      photo.src = reader.result
      
    }
    reader.readAsDataURL(file.files[0])
    

  })

  const sendProfileBtn = sectionElement.querySelector("#send-profile")
  sendProfileBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const userNameInput = sectionElement.querySelector("#input-username")
    const userName = userNameInput.value
    const user = currentUser()
    const image = document.getElementById("input-profile-img").files[0]
    console.log(image)
    const userId = user.uid

    if(userName ==""){
      const text = "Escolha um nome de usuário"
      errorInput(text, userNameInput)

    }else{
      if (image === undefined){
        asyncSendProfileData(userName, null)
  
      }else{
        uploadImage("input-profile-img", ""+userId+"")
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then (url => {
          const urlImage = url
          console.log(urlImage)
          return urlImage
        })
        .then((urlImage)=>{
          asyncSendProfileData(userName, urlImage)
    
        })
        .then(()=>{
          changeContent("feed")
        })  
      }
    }
  })    
  return sectionElement
}