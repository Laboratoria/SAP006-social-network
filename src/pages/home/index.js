import { currentUser, logout, loadReviews} from "../../lib/index.js"
import { sidebar } from "../../components/sidebar/index.js"

export default () =>{

  
  const sectionElement = document.createElement("section")
  sectionElement.setAttribute("id", "home-content")

  const user = currentUser()
  const imageUrl = user.photoURL
  let profileImg

  if (imageUrl!=null){
    profileImg = user.photoURL
  } else{
    profileImg = "./img/menu.png"
  }

  let userName
  const userNameFirebase=user.displayName

  if (userNameFirebase != null){
    userName==userNameFirebase 
  }else{
    userName== "Username não definido"
  }

  console.log(imageUrl)
  console.log(userName)

  const createFeedTemplate=`
  <div class="home-container">
    <navbar  class="home-navbar" id="nav">
      <button class="menu-mobile-btn"><img src="./img/menu.png" class="menu-img"></button>  
    </navbar/>
    <h1 class="h1-home">Olá, ${firebase.auth().currentUser.displayName} ❤</h1> 
    <img class="photo-profile" src=${profileImg}>
    <div class="timeline">
     <form class="review-area" action="">
        <textarea class="post-input" id="text" cols="30" rows="5" data-post-input required placeholder =" Sua review ..."></textarea>
     </form>   
        <button class="publish-btn" data-publish-btn> Publish review </button>
    </div>
    <div data-new-review class ="posted-review">
    
    </div>
  </div>
  

  `
  // <button id="logout-btn"><img class="logout-img" src="../img/logout.png"/></button>
  sectionElement.innerHTML= createFeedTemplate
  sectionElement.appendChild(sidebar())

  const menuBtn = sectionElement.querySelector(".menu-mobile-btn")
  menuBtn.addEventListener("click", (e)=>{
    e.preventDefault()
    const sidebar = sectionElement.querySelector("#sidebar")
    sidebar.style.display="block"
    sidebar.classList.remove("sidebar-desktop")
   
    

  })

  const publishReview = (e) => {
    e.preventDefault()

  const reviewUser = document.querySelector("[data-post-input]")
  const valueReview = reviewUser.value

  const local = document.querySelector("[data-new-review]")
  const printReview = document.createElement('article')
  printReview.classList.add("new-review")

  const content = `<p class="content-review">${valueReview}</p>`

  printReview.innerHTML = content
  local.appendChild(printReview)

  reviewUser.value = ""
  }



  const createReviewBtn = sectionElement.querySelector("[data-publish-btn]")
  // const logoutBtn = sectionElement.querySelector("#logout-btn")
  

  createReviewBtn.addEventListener ("click", publishReview)
  // logoutBtn.addEventListener("click", ()=>{
  //     logout()
  //     window.history.pushState(null, null, "/login")
  //     const popStateEvent = new PopStateEvent("popstate", {state:{}})
  //     dispatchEvent(popStateEvent)
  // })

  return sectionElement
}