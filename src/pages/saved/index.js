import { currentUser, getSavedReviews} from "../../lib/index.js"
import { sidebar } from "../../components/sidebar/index.js"
import {profileImage, loadPosts } from "../../lib/functions-home.js"


export default () => {

  const sectionElement = document.createElement("section")
  sectionElement.setAttribute("class", "home-content")

  // const user = currentUser()
  // const userId = user.uid
  
  // const profileImg = profileImage()

  // let userName 
  // let userName2
  // const userNameFirebase = user.displayName
  // console.log(userNameFirebase)

  // if (userNameFirebase != null && userNameFirebase != undefined) {
  //   userName = userNameFirebase
  //   userName2 = userName.replace(/\s/g, '').toLowerCase();
  //   console.log("definido")
  // } else {
  //   userName = "Usuário anônimo"
  //   userName2 = ""
  // }
  const savedTemplate = `
  <div class="home-container">
   
    <header>
      <p class="header-home">Bookish</p>
      <img class="favicon-home" src="img/favicon.png">
    </header>
  
    <div class="saved-items">
      <img  class="img-title-saved" src="./img/save.png">
      <p class="title-saved">SALVOS</p> 
      
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
  

  loadPosts(getSavedReviews())
 
 

  return sectionElement
}