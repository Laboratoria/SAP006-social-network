import { currentUser} from "../../lib/index.js"
import { sidebar } from "../../components/sidebar/index.js"
import {profileImage, loadPosts } from "../../lib/functions-home.js"


export default () => {

  const sectionElement = document.createElement("section")
  sectionElement.setAttribute("id", "home-content")

  const user = currentUser()
  const userId = user.uid
  
  const profileImg = profileImage()

  let userName 
  let userName2
  const userNameFirebase = user.displayName
  console.log(userNameFirebase)

  if (userNameFirebase != null && userNameFirebase != undefined) {
    userName = userNameFirebase
    userName2 = userName.replace(/\s/g, '').toLowerCase();
    console.log("definido")
  } else {
    userName = "Usuário indefinido"
    userName2 = ""
  }
  const savedTemplate = `
  <div class="home-container">
   
    <header>
      <h1 class="header-home">Bookish</h1>
      <img class="favicon-home" src="img/favicon.png">
    </header>
    <div class="timeline">
    <div class="welcome">
    <img class="photo-profile-feed" src=${profileImg}>
    <h1 class="h1-welcome">Olá, ${firebase.auth().currentUser.displayName} :)</h1> 
    </div>
    
    <div data-all-reviews class= "all-reviews">
    
    </div>

  
    
  <navbar  class="home-navbar" id="nav">
      <button class="menu-mobile-btn" id="home-navbar"><img src="./img/home-navbar.png" class="menu-img"></button> 
      <button class="menu-mobile-btn" id="add-review-navbar"><img src="./img/add-navbar.png" class="menu-img"></button>   
      <button class="menu-mobile-btn" ><img src="./img/profile-navbar.png" class="menu-img"></button> 
      <button class="menu-mobile-btn" id="open-sidebar"><img src="./img/menu-navbar.png" class="menu-img" ></button>  
    </navbar/>
    
  `
  sectionElement.innerHTML = savedTemplate

  sectionElement.appendChild(sidebar())
  
    // let photo = sectionElement.querySelector(".file-img1")
    // let file = sectionElement.querySelector(".file-input")
    // let textearea = sectionElement.querySelector("#text")
  
    // photo.addEventListener("click", () =>{
    //   file.click()
    // })
  
    // file.addEventListener("change", (e) => {
    //   textearea.style.margin = "8.5rem 0rem 0rem" 
    //   photo.style.margin = "2rem 0rem"
    //   photo.style.height = "190%"
    //   photo.style.width = "140%"
    //   if(file.files.legth <= 0){
           
    //     return;
    //   }
       
    //   let reader =  new FileReader()
    //   reader.onload = () => {
    //     photo.src = reader.result
        
    //   }
    //   reader.readAsDataURL(file.files[0])
    // })
  
    
  // const buttonAddReview = sectionElement.querySelector("#add-review")

  // buttonAddReview.addEventListener("click", () => {
  //   showReviewArea()
  // })

  // const buttonAddReviewNavbar = sectionElement.querySelector("#add-review-navbar")
  // buttonAddReviewNavbar.addEventListener("click", (e) => {
  //   e.preventDefault()
  //   window.scrollTo(0,0)
  //   showReviewArea()
  // })

  // const cancelReview = sectionElement.querySelector(".cancel-btn")
  // cancelReview.addEventListener("click", () => {
  //   sectionElement.querySelector(".review-area").style.display = "none"
  //   sectionElement.querySelector(".welcome").style.display = "flex"
  //   sectionElement.querySelector(".button-make-review").style.display = "block";
  //   sectionElement.querySelector(".make-review").style.background = "linear-gradient(600.92deg, #5E97AF 6.15%, #6D9ACE 52.44%, #5694DC 77.96%, #4C64A4 95.61%)";
  //   sectionElement.querySelector(".p-make-review").style.display = "block"
  
  // })

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
    window.scrollTo(0,0)
   
  })


  

  //  const createReviewBtn = sectionElement.querySelector("[data-publish-btn]")
  // //const logoutBtn = sectionElement.querySelector("#logout-btn")

  // createReviewBtn.addEventListener ("click", publishReview)
  
  
  loadPosts()  

  return sectionElement
}