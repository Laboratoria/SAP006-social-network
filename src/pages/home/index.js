import { currentUser, getReviews } from "../../lib/index.js"
import { sidebar } from "../../components/sidebar/index.js"
import { showReviewArea, publishReview, profileImage, loadPosts } from "../../lib/functions-home.js"


export default () => {


  const sectionElement = document.createElement("section")
  sectionElement.setAttribute("class", "home-content")

  const user = currentUser()
  const userId = user.uid

  const profileImg = profileImage()

  let userName
  let userName2
  const userNameFirebase = user.displayName

  if (userNameFirebase != null && userNameFirebase != undefined) {
    userName = userNameFirebase
    userName2 = userName.replace(/\s/g, '').toLowerCase();

  } else {
    userName = "Usuário anônimo"
    userName2 = ""
  }


  const createFeedTemplate = `
  <div class="home-container">
   
    <header>
      <h1 class="header-home">Bookish</h1>
      <img class="favicon-home" src="img/favicon.png">
    </header>
    <div class="timeline">
    <div class="welcome">
    <img class="photo-profile-feed" src=${profileImg}>
    <h1 class="h1-welcome">Olá, ${userName} :)</h1> 
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
        <button class="publish-btn button-review" data-publish-btn >Publicar</button>
        <button class="cancel-btn button-review">Cancelar</button>
        </div>
     </form>   
    </div>
    <div data-all-reviews class= "all-reviews">
    
    </div>

  </div>
  <navbar  class="home-navbar" id="nav">
      <button class="menu-mobile-btn" id="home-navbar"><img src="./img/home-navbar.png" class="menu-img"></button> 
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

  file.addEventListener("change", (e) => {
    textearea.style.margin = "8.5rem 0rem 0rem"
    photo.style.margin = "2rem 0rem"
    photo.style.height = "190%"
    photo.style.width = "140%"
    if (file.files.legth <= 0) {

      return;
    }

    let reader = new FileReader()
    reader.onload = () => {
      photo.src = reader.result

    }
    reader.readAsDataURL(file.files[0])
  })


  const buttonAddReview = sectionElement.querySelector("#add-review")

  buttonAddReview.addEventListener("click", () => {
    showReviewArea()
  })

  const buttonAddReviewNavbar = sectionElement.querySelector("#add-review-navbar")
  buttonAddReviewNavbar.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo(0, 0)
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

  const buttonHomeNavbar = sectionElement.querySelector("#home-navbar")
  buttonHomeNavbar.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo(0, 0)

  })




  const createReviewBtn = sectionElement.querySelector("[data-publish-btn]")
  //const logoutBtn = sectionElement.querySelector("#logout-btn")

  createReviewBtn.addEventListener("click", publishReview)


  loadPosts(getReviews())

  return sectionElement
}