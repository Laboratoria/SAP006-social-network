import { currentUser, logout} from "../../lib/index.js"

export default () =>{

  
  const sectionElement = document.createElement("section")
  sectionElement.setAttribute("id", "home-content")

  const user = currentUser()
  const imageUrl = user.photoURL
  const userName=user.displayName
  console.log(imageUrl)
  console.log(userName)

  const createFeedTemplate=`
  <h1 class="h1-home">Bem vindoooo <3</h1>
  <button id="logout-btn">Logout</button>
  <img src=${imageUrl}>

  `


  sectionElement.innerHTML= createFeedTemplate
  const logoutBtn = sectionElement.querySelector("#logout-btn")
  
  logoutBtn.addEventListener("click", ()=>{
      logout()
      window.history.pushState(null, null, "/login")
      const popStateEvent = new PopStateEvent("popstate", {state:{}})
      dispatchEvent(popStateEvent)
  })

  return sectionElement
}