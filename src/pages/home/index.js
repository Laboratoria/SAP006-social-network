import { currentUser, logout, createReview, getReviews} from "../../lib/index.js"
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
     
      <label class="review-label" for="book-name"> Book: </label>
      <input class="review-book" data-book-input type="text" placeholder="" required>
      <label class="review-label" for="book-author"> Author: </label>
      <input class="review-author" data-author-input type="text" placeholder="" required>
      <label class="review-label" for="book-edition"> Edition: </label>
      <input class="review-author" data-edition-input type="text" placeholder="" required>
      <textarea class="post-input" id="text" cols="30" rows="5" data-post-input required placeholder =" Sua review ..."></textarea>

      <label class="rating">Rating:</label>
        <select class="stars" id="stars" data-stars-form>
          <option value="one">1</option>
          <option value="two">2</option>
          <option value="three">3</option>
          <option value="four">4</option>
          <option value="five">5</option>
        </select>
     </form>   
        <button class="publish-btn" data-publish-btn> Publish review </button>
    </div>
    <div data-new-review class ="posted-review">
    
    </div>
  </div>
  

    <div data-all-reviews class= "all-reviews">
      
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

    const bookName = document.querySelector("[data-book-input]").value
    const authorName = document.querySelector("[data-author-input]").value
    const editionBook = document.querySelector("[data-edition-input]").value
    const starsEvaluation = document.querySelector("[data-stars-form]").value

    const reviewUser = document.querySelector("[data-post-input]")
    const valueReview = reviewUser.value

    const local = document.querySelector("[data-new-review]")
    const printReview = document.createElement("article")
    printReview.classList.add("new-review")

    createReview(bookName, editionBook, authorName, valueReview, starsEvaluation, userNameFirebase)

    const content = `<div>
                    <h2 class="title-book"> ${bookName} </h2>
                    <h3 class="name-author"> ${authorName} </h3>
                    <p class="edition-content"> ${editionBook}</p> </br>
                    <p class="content-review">${valueReview}</p> </br>
                    <p class="stars-show">${starsEvaluation}</p> 
                    </div>`

    printReview.innerHTML = content 
    local.appendChild(printReview)


    reviewUser.value = ""
    bookName = ""
    authorName = ""
    editionBook = ""
    starsEvaluation = "" 
  }

   const loadPosts = () => { 

      const userAllReviews = document.querySelector("[data-all-reviews]")
     const printAllReviews = document.createElement("article")
      printAllReviews.classList.add("all-users-reviews")

      const reviewsData = getReviews()
       .then((reviews) => {
        reviews.forEach((doc) => {
            console.log(doc)
          const reviewTemplate = `<h2>${doc.book}</h2>
                                  <h3>${doc.author}</h3>`

       const allReviews = document.querySelector("[data-all-reviews]")
       allReviews.innerHTML += reviewTemplate
       })
       
     });

      printAllReviews.innerHTML = reviewsData
      userAllReviews.appendChild(printAllReviews)

   }



  const createReviewBtn = sectionElement.querySelector("[data-publish-btn]")
  const logoutBtn = sectionElement.querySelector("#logout-btn")
  

  createReviewBtn.addEventListener ("click", publishReview)
  // logoutBtn.addEventListener("click", ()=>{
  //     logout()
  //     window.history.pushState(null, null, "/login")
  //     const popStateEvent = new PopStateEvent("popstate", {state:{}})
  //     dispatchEvent(popStateEvent)
  // })



  return sectionElement
}