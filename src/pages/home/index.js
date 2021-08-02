import { currentUser, logout, createReview} from "../../lib/index.js"

export default () =>{

  
  const sectionElement = document.createElement("section")
  sectionElement.setAttribute("id", "home-content")

  const user = currentUser()
  const imageUrl = user.photoURL
  const userName=user.displayName
  console.log(imageUrl)
  console.log(userName)

  const createFeedTemplate=`
  <button id="logout-btn"><img class="logout-img" src="../img/logout.png"/></button>
  <h1 class="h1-home">Olá, ${firebase.auth().currentUser.displayName} ❤</h1> 
  <img class="photo-profile" src=${imageUrl}>
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

    <div data-all-reviews class= "all-reviews">
      
    </div>
  `

  sectionElement.innerHTML= createFeedTemplate

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

    const content = `<div>
                    <h2 class="title-book"> ${bookName} </h2>
                    <h3 class="name-author"> ${authorName} </h3>
                    <p class="edition-content"> ${editionBook}</p> </br>
                    <p class="content-review">${valueReview}</p> </br>
                    <p class="stars-show">${starsEvaluation}</p> 
                    </div>`

    printReview.innerHTML = content 
    local.appendChild(printReview)

    createReview(bookName, editionBook, authorName, valueReview, starsEvaluation, userName)

    reviewUser.value = ""
    bookName = ""
    authorName = ""
    editionBook = ""
    starsEvaluation = "" 
  }

  // const loadPosts = () => {

  //   const userAllReviews = document.querySelector("[data-all-reviews]")
  //   const printAllReviews = document.createElement("article")
  //   printAllReviews.classList.add("all-users-reviews")

  //   const reviewsData = getReviews()
  //   .then(snap => {
  //     snap.forEach(post => {
  //       post.data()
        
  //     });
  //   })

  //   printAllReviews.innerHTML = reviewsData
  //   userAllReviews.appendChild(printAllReviews)

  // }



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