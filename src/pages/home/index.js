import { currentUser, logout, loadReviews} from "../../lib/index.js"

export default () =>{

  
  const sectionElement = document.createElement("section")
  sectionElement.setAttribute("id", "home-content")

  const user = currentUser()
  const imageUrl = user.photoURL
  const userName=user.displayName
  console.log(imageUrl)
  console.log(userName)

  const createFeedTemplate=`
  <h1 class="h1-home">Bem vindoooo, ${firebase.auth().currentUser.displayName} <3</h1>
  <button id="logout-btn">Logout</button>

    <div class="timeline">
     <form class="review-area" action="">
        <textarea class="post-input" id="text" cols="30" rows="5" data-post-input required placeholder =" Sua review ..."></textarea>
     </form>   
        <button class="publish-btn" data-publish-btn> Publish review </button>
    </div>
    <div data-new-review class ="posted-review">
    
    </div>
  <img src=${imageUrl}>

  `


  sectionElement.innerHTML= createFeedTemplate

  

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
  const logoutBtn = sectionElement.querySelector("#logout-btn")
  

  createReviewBtn.addEventListener ("click", publishReview)
  logoutBtn.addEventListener("click", ()=>{
      logout()
      window.history.pushState(null, null, "/login")
      const popStateEvent = new PopStateEvent("popstate", {state:{}})
      dispatchEvent(popStateEvent)
  })

  return sectionElement
}