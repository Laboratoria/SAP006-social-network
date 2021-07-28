import { logout} from "../../lib/index.js"

export default () =>{

  
  const sectionElement = document.createElement("section")
  sectionElement.setAttribute("id", "home-content")

  const createFeedTemplate=`
  <h1 class="h1-home">Bem vindoooo, ${firebase.auth().currentUser.displayName} <3</h1>
  <button id="logout-btn">Logout</button>

  <form class="form" action="">
        <textarea class="post-input" id="text" cols="30" rows="5" data-post-input required placeholder =" Sua review ..."></textarea>
    </div
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