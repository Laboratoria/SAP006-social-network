import { currentUser , uploadImage, asyncSendProfileData} from "../../lib/index.js"
import { navigateTo } from '../../routes.js'
import feed from "../feed/index.js"


export default () => {

  const sectionElement = document.createElement("section")
  sectionElement.setAttribute("id","create-profile")
  sectionElement.setAttribute("class","form-container")


  const createProfileTemplate = `
    <div id="form-create-profile">
      <fieldset class="fieldset-create-profile">
        <form class="form-create-profile" action="">
          <input type="file" placeholder="Foto de perfil" id="input-profile-image">
          <input type="text" placeholder="Nome de usuário" id="input-username">
          <button type="button"id="send-profile">Enviar</button>
        </form>
      </fieldset>
    </div>

  `

  sectionElement.innerHTML= createProfileTemplate
  const sendProfileBtn = sectionElement.querySelector("#send-profile")
  sendProfileBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const userName = sectionElement.querySelector("#input-username").value
    const user = currentUser()
    const userId = user.uid
    console.log(userId)
    uploadImage("input-profile-image", ""+userId+"")
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
      navigateTo("feed", feed())
    })
  })
         
  return sectionElement
}