import { logout} from "../../lib/index.js"
import { changeContent } from "../../routes.js"

export default () =>{

  window.history.pushState("home", null, "/home")
  const sectionElement = document.createElement("section")
  sectionElement.setAttribute("id", "home-content")

  const createFeedTemplate=`
  <h1 class="h1-home">Bem vindoooo <3</h1>
  <button id="logout-btn">Logout</button>
  `

  sectionElement.innerHTML= createFeedTemplate
  const logoutBtn = sectionElement.querySelector("#logout-btn")
  
  logoutBtn.addEventListener("click", ()=>{
      logout()
      changeContent("signin")
  })

  return sectionElement
}