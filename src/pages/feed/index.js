import { logout} from "../../lib/index.js"
import { changeContent } from "../../routes.js"
import signin from "../signin/index.js"


export default () =>{

  window.history.pushState("feed", null, "feed")
  const sectionElement = document.createElement("section")

  const createFeedTemplate=`
  <button id="logout-btn">Logout</button>
  <h1>BEM VINDO <3</h1>`

  sectionElement.innerHTML= createFeedTemplate
  const logoutBtn = sectionElement.querySelector("#logout-btn")
  
  const mainLogin = document.getElementById("root")
  logoutBtn.addEventListener("click", ()=>{
      logout()
      mainLogin.appendChild(signin())

  })


  return sectionElement
}