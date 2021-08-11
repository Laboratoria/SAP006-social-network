import {
  currentUser,
  logout
} from "../../lib/index.js"
import {
  showReviewArea
} from "../../lib/functions-home.js"


export const sidebar = () => {

  const asideElement = document.createElement("aside")

  asideElement.classList.add('sidebar')
  asideElement.classList.add('sidebar-desktop')
  asideElement.classList.add('mobile-menu')
  asideElement.setAttribute("id", "sidebar")


  const user = currentUser()
  const userName = user.displayName
  const imageUrl = user.photoURL
  let profileImg

  if (imageUrl != null) {
    profileImg = user.photoURL
  } else {
    profileImg = "./img/default-img.png"
  }

  const userName2 = userName.replace(/\s/g, '').toLowerCase();



  const sidebarTemplate = `
    <div class="sidebar-container">
      <button class="close-mobile-sidebar" id="close-mobile-sidebar">x</button>
      <section class="user-data">
      
        <img src="${profileImg}"   class="sidebar-user-img"/>
        <div class="user-information">
          <h3 class="sidebar-user-name sidebar-text user-name">${user.displayName}</h3>
          <p class="sidebar-user sidebar-text">@${userName2}</p>
        </div>
        
      </section>
      <section class="sidebar-profile">
        <div class="profile-line">
          <p class="sidebar-text">Perfil</p>
          <a href="" class="sidebar-link" id="edit-profile-link">editar</a>
        </div>
        <div class="sidebar-line review-line">
          <p class="sidebar-text">Número de resenhas</p>
          <div class="num"><p class="num-text">3</p></div>
        </div>

        <div class="sidebar-line">
          <p class="sidebar-text">Número de curtidas</p>
          <div class="num"><p class="num-text">9</p></div>
        </div>

      </section>


      <section class="sidebar-tools sidebar-add-review">
        <button href="" class="sidebar-btn sidebar-btn-mobile">
          <div class="sidebar-div-links">
            <img src="../../img/add.png" alt="">
            <p class="sidebar-text id="sidebar-review" >Adicionar resenha</p>
          </div>
        </button>
      </section>


      <section class="sidebar-tools sidebar-logout" id="sidebar-logout">
        <button class="sidebar-btn" id="logout-btn-sidebar"> 
          <div class="sidebar-div-links" >
            <img src="../../img/logout-white.png" alt="" id="sidebar-img-logout">
            <p class="sidebar-logout sidebar-text"">Sair</p>
          </div>
        </button>
      </section>
   
    </div>
`
  // <section class="sidebar-tools sidebar-book-list">
  //   <a href="" class=>
  //     <div class="sidebar-div -links">
  //       <img src="../../img/list.png" alt="">
  //       <p>Lista de livros</p>
  //     </div>
  //   </a>
  // </section>


  asideElement.innerHTML = sidebarTemplate

  const logoutBtn = asideElement.querySelector("#logout-btn-sidebar")
  const editProfileLink = asideElement.querySelector("#edit-profile-link")

  editProfileLink.addEventListener("click", (e) => {
    e.preventDefault()
    window.history.pushState(null, null, "/editar-perfil")
    const popStateEvent = new PopStateEvent("popstate", {
      state: {}
    })
    dispatchEvent(popStateEvent)

  })

  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault()
    logout()
    window.history.pushState(null, null, "/login")
    const popStateEvent = new PopStateEvent("popstate", {
      state: {}
    })
    dispatchEvent(popStateEvent)
  })

  const closeBtn = asideElement.querySelector("#close-mobile-sidebar")
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const sidebar = document.querySelector(".mobile-menu")
    sidebar.style.display = "none"


  })

  const buttonAddReviewSidebar = asideElement.querySelector(".sidebar-btn")
  buttonAddReviewSidebar.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo(0, 0)
    showReviewArea()
  })

  // const showSideBar = asideElement.querySelector(".sidebar-container") 
  // showSideBar.addEventListener('mouseover', () => {
  //   document.querySelector(".sidebar-desktop").style.transition="1s"
  //   document.querySelector(".sidebar-desktop").style.margin="0rem 0rem 0rem 80vw"
  // })

  // const hideSideBar = asideElement.querySelector(".sidebar-container") 
  // hideSideBar.addEventListener('mouseout', () => {
  //   document.querySelector(".sidebar-desktop").style.transition="1s"
  //   document.querySelector(".sidebar-desktop").style.margin="0rem 0rem 0rem 113vw"
  // })
  return asideElement

}