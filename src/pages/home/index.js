import { currentUser, createReview, uploadImageBooks, updateImageBook, getReviews } from "../../lib/index.js"
import { sidebar } from "../../components/sidebar/index.js"

export default () => {

  const sectionElement = document.createElement("section")
  sectionElement.setAttribute("id", "home-content")

  const user = currentUser()
  const imageUrl = user.photoURL
  let profileImg

  if (imageUrl != null) {
    profileImg = user.photoURL
  } else {
    profileImg = "./img/default-img.png"
  }

  let userName
  const userNameFirebase = user.displayName

  if (userNameFirebase != null) {
    userName == userNameFirebase
  } else {
    userName == "Username não definido"
  }

  const createFeedTemplate = `
  <div class="home-container">
   
    <header>
      <h1 class="header-home">Home</h1>
      <img class="favicon-home" src="img/favicon.png">
    </header>
    <div class="timeline">
    <div class="welcome">
    <img class="photo-profile-feed" src=${profileImg}>
    <h1 class="h1-welcome">Olá, ${firebase.auth().currentUser.displayName} :)</h1> 
    </div>
    
    <div class="make-review">
      <p class="p-make-review">PUBLIQUE UM REVIEW</p>
      <button class="button-make-review" id="add-review">+</button>
    </div>
     <form class="review-area" action="">
     
      <label class="review-label" for="book-name">Livro:</label>
      <input class="review-input" data-book-input type="text" placeholder="" required/>
      <label class="review-label" for="book-author">Autor</label>
      <input class="review-input" data-author-input type="text" placeholder="" required/>
      <label class="review-label1" for="book-edition">Anexe a imagem da capa do livro</label>
      <div class="container-file-img1">
            <img src="./img/imagebooks.png" class="file-img1">
          </div>
      <input type="file" class="file-input" id="input-profile-img" accept="image/*">
      <textarea class="post-input" id="text" cols="30" rows="5" data-post-input required placeholder ="Escreva sua review..."></textarea>
      
      <label class="review-available">Avalie</label>
      <div class="estrelas" >
      <input type="radio" id="cm_star-empty" name="stars" value="" checked/>
      <label for="star-1" class="stars"></label>
      <input type="radio" id="star-1" data-stars-form name="stars" value="★"/>
      <label for="star-2" class="stars"></label>
      <input type="radio" id="star-2" data-stars-form name="stars" value="★★"/>
      <label for="star-3" class="stars"></label>
      <input type="radio" id="star-3" data-stars-form name="stars" value="★★★"/>
      <label for="star-4" class="stars"></label>
      <input type="radio" id="star-4" data-stars-form name="stars" value="★★★★"/>
      <label for="star-5" class="stars"></label>
      <input type="radio" id="star-5" data-stars-form name="stars" value="★★★★★"/>
    </div>
        <div class="buttons">
        <button class="publish-btn" data-publish-btn id="button-review">Publicar</button>
        <button class="cancel-btn" id="button-review">Cancelar</button>
        </div>
     </form>   
    </div>
    <div data-all-reviews class= "all-reviews">
    
    </div>
  </div>
  

    
    <navbar  class="home-navbar" id="nav">
      <button class="menu-mobile-btn"><img src="./img/home-navbar.png" class="menu-img"></button> 
      <button class="menu-mobile-btn" id="add-review-navbar"><img src="./img/add-navbar.png" class="menu-img"></button>   
      <button class="menu-mobile-btn" ><img src="./img/profile-navbar.png" class="menu-img"></button> 
      <button class="menu-mobile-btn" id="open-sidebar"><img src="./img/menu-navbar.png" class="menu-img" ></button>  
    </navbar/>
  `
  sectionElement.innerHTML = createFeedTemplate

  sectionElement.appendChild(sidebar())

  let photo = sectionElement.querySelector(".file-img1")
  let file = sectionElement.querySelector(".file-input")
  let textearea = sectionElement.querySelector("#text")

  photo.addEventListener("click", () => {
    file.click()
  })

  const userId = user.uid
  let imageSelect
  file.addEventListener("change", function (event) {


    let imageUrl = event.target.files[0]

    photo.file = imageUrl

    imageSelect = imageUrl

    if (imageSelect != null) {
      textearea.style.margin = "8.5rem 0rem 0rem"
      photo.style.margin = "2rem 0rem"
      photo.style.height = "190%"
      photo.style.width = "140%"
      const reader = new FileReader()

      reader.onload = (function (img) {
        return function (e) {
          img.src = e.target.result
        }

      })(photo)

      reader.readAsDataURL(imageUrl)
      uploadImageBooks(imageSelect, "" + userId + "")
        .then(snapshot => snapshot.ref.getDownloadURL().then(url => {
          const urlImageBook = url
          console.log(urlImageBook)
          return urlImageBook
        })
          .then((urlImageBook) => {
            updateImageBook(urlImageBook)
          }))
    }
  })

  const imageUrlBook = user.photoBook
  let imageBook

  if (imageUrlBook != null) {
    imageBook = user.photoBook
  } else {
    imageBook = "./img/default-book.png"
  }

  const buttonAddReview = sectionElement.querySelector("#add-review")

  const showReviewArea = () => {
    const formReview = sectionElement.querySelector(".review-area");
    formReview.style.display = "flex";
    sectionElement.appendChild(sidebar())
    sectionElement.querySelector(".welcome").style.display = "none"
    sectionElement.querySelector(".button-make-review").style.display = "none";
    sectionElement.querySelector(".make-review").style.background = "linear-gradient(300.92deg, #5E97AF 6.15%, #6D9ACE 80.44%, #5694DC 100.96%)";
    sectionElement.querySelector(".p-make-review").style.display = "none"

  }
  buttonAddReview.addEventListener("click", () => {
    showReviewArea()
  })

  const buttonAddReviewNavbar = sectionElement.querySelector("#add-review-navbar")
  buttonAddReviewNavbar.addEventListener("click", () => {
    showReviewArea()
  })



  const cancelReview = sectionElement.querySelector(".cancel-btn")
  cancelReview.addEventListener("click", () => {
    sectionElement.querySelector(".review-area").style.display = "none"
    sectionElement.querySelector(".welcome").style.display = "flex"
    sectionElement.querySelector(".button-make-review").style.display = "block";
    sectionElement.querySelector(".make-review").style.background = "linear-gradient(600.92deg, #5E97AF 6.15%, #6D9ACE 52.44%, #5694DC 77.96%, #4C64A4 95.61%)";
    sectionElement.querySelector(".p-make-review").style.display = "block"
  })
  const openSidebar = sectionElement.querySelector("#open-sidebar")
  openSidebar.addEventListener("click", (e) => {
    e.preventDefault()
    const sidebar = sectionElement.querySelector("#sidebar")
    sidebar.style.display = "block"
    sidebar.classList.remove("sidebar-desktop")
  })

  // const postReview = sectionElement.querySelector(".review-area")
  // postReview.style.display="none";


  const publishReview = (e) => {
    e.preventDefault()
    sectionElement.querySelector(".review-area").style.display = "none"
    sectionElement.querySelector(".welcome").style.display = "flex"
    sectionElement.querySelector(".button-make-review").style.display = "block";
    sectionElement.querySelector(".make-review").style.background = "linear-gradient(600.92deg, #5E97AF 6.15%, #6D9ACE 52.44%, #5694DC 77.96%, #4C64A4 95.61%)";
    sectionElement.querySelector(".p-make-review").style.display = "block"

    const formReview = sectionElement.querySelector(".review-area");
    formReview.style.display = "none";

    const bookName = document.querySelector("[data-book-input]").value
    const authorName = document.querySelector("[data-author-input]").value
    const starsEvaluation = document.querySelector('input[name="stars"]:checked').value
    const reviewUser = document.querySelector("[data-post-input]")
    const valueReview = reviewUser.value

    const local = document.querySelector(".timeline")
    const printReview = document.createElement("article")
    printReview.classList.add("new-review")

    const userName = user.displayName
    const userName2 = userName.replace(/\s/g, '').toLowerCase();


    const content =
      `<div id="posts-reviews">
                  <div class="data-post">
                  <div class="aboutbook">
                    <p class="stars-show">${starsEvaluation}</p>
                    <img class="photo-book-review-post" src=${imageBook}>
                    </div>
                    <img class="photo-post-review" src=${profileImg}>
                    <h1 class="name-profile-post">${firebase.auth().currentUser.displayName}</h1>
                    <p class="username-post">@${userName2}</p>                
                    </div>
                    <div class="data-book-post">
                    <h2 class="title-book"> ${bookName} </h2>
                    <h3 class="name-author"> ${authorName} </h3>
                    <p class="content-review">${valueReview}</p> </br>
                    </div>
                    </div>`

    printReview.innerHTML = content
    local.appendChild(printReview)

    createReview(bookName, editionUser, authorName, valueReview, starsEvaluation, userNameFirebase)

  }

  function loadPosts() {

    // const userAllReviews = document.querySelector("[data-all-reviews]")
    // const printAllReviews = document.createElement("article")
    // printAllReviews.classList.add("all-users-reviews")

    const reviewsData = () => {
      getReviews()

        .then((snap) => {
          const allReviews = document.querySelector("[data-all-reviews]")
          allReviews.innerHTML = ""

          snap.forEach((doc) => {

            console.log(doc.id, " => ", doc.data())
            const reviewTemplate = `<div class="data-post" id="${doc.id}">
                                      <h2>${doc.data().book}</h2>
                                      <h3>${doc.data().author}</h3>
                                        <p> ${doc.data().rating}</p>
                                        <p> ${doc.data().userName}</p>
                                        
                                        <p> ${doc.data().review}</p>
                                    <button class="btn-delete-review" id="del-review">deletar</button>
                                    </div>`


            allReviews.innerHTML += reviewTemplate
          })

        })
        .catch((error) => {
          console.log("Error getting documents: ", error)
        })

    }
    // printAllReviews.innerHTML = reviewsData()
    // userAllReviews.appendChild(printAllReviews)
    reviewsData()
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


  loadPosts()


  return sectionElement
}