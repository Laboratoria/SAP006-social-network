import { currentUser, createReview, uploadImageBooks, updateImageBook} from "../../lib/index.js"
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
    profileImg = "./img/default-img.png"
  }

  let userName
  const userNameFirebase=user.displayName

  if (userNameFirebase != null){
    userName==userNameFirebase 
  }else{
    userName== "Username não definido"
  }



  const createFeedTemplate=`
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
  </div>
  
    <div data-all-reviews class= "all-reviews">
      
    </div>
    <navbar  class="home-navbar" id="nav">
      <button class="menu-mobile-btn"><img src="./img/home-navbar.png" class="menu-img"></button> 
      <button class="menu-mobile-btn" id="add-review-navbar"><img src="./img/add-navbar.png" class="menu-img"></button>   
      <button class="menu-mobile-btn" ><img src="./img/profile-navbar.png" class="menu-img"></button> 
      <button class="menu-mobile-btn" id="open-sidebar"><img src="./img/menu-navbar.png" class="menu-img" ></button>  
    </navbar/>
  `
  sectionElement.innerHTML= createFeedTemplate

  sectionElement.appendChild(sidebar())
  
  let photo = sectionElement.querySelector(".file-img1")
    let file = sectionElement.querySelector(".file-input")
    let textearea = sectionElement.querySelector("#text")
  
    photo.addEventListener("click", () =>{
      file.click()
    })
  
    file.addEventListener("change", (e) => {
      textearea.style.margin = "8.5rem 0rem 0rem" 
      photo.style.margin = "2rem 0rem"
      photo.style.height = "190%"
      photo.style.width = "140%"
      if(file.files.legth <= 0){
        
    
        return;
      }
       
      let reader =  new FileReader()
      reader.onload = () => {
        photo.src = reader.result
        
      }
      reader.readAsDataURL(file.files[0])
    })
  
    const userId = user.uid
    let imageSelect
    

  const buttonAddReview = sectionElement.querySelector("#add-review")

  const showReviewArea = () =>{
    const formReview = sectionElement.querySelector(".review-area");
    formReview.style.display="flex";
    sectionElement.appendChild(sidebar())
    sectionElement.querySelector(".welcome").style.display="none"
    sectionElement.querySelector(".button-make-review").style.display="none";
    sectionElement.querySelector(".make-review").style.background="linear-gradient(300.92deg, #5E97AF 6.15%, #6D9ACE 80.44%, #5694DC 100.96%)";
    sectionElement.querySelector(".p-make-review").style.display="none"

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
    sectionElement.querySelector(".review-area").style.display="none"
    sectionElement.querySelector(".welcome").style.display="flex"
    sectionElement.querySelector(".button-make-review").style.display="block";
    sectionElement.querySelector(".make-review").style.background="linear-gradient(600.92deg, #5E97AF 6.15%, #6D9ACE 52.44%, #5694DC 77.96%, #4C64A4 95.61%)";
    sectionElement.querySelector(".p-make-review").style.display="block"
  })
  const openSidebar = sectionElement.querySelector("#open-sidebar")
  openSidebar.addEventListener("click", (e)=>{
    e.preventDefault()
    const sidebar = sectionElement.querySelector("#sidebar")
    sidebar.style.display="block"
    sidebar.classList.remove("sidebar-desktop")
  }) 

  // const postReview = sectionElement.querySelector(".review-area")
  // postReview.style.display="none";
    

  const publishReview = (e) => {
    e.preventDefault()
    sectionElement.querySelector(".review-area").style.display="none"
    sectionElement.querySelector(".welcome").style.display="flex"
    sectionElement.querySelector(".button-make-review").style.display="block";
    sectionElement.querySelector(".make-review").style.background="linear-gradient(600.92deg, #5E97AF 6.15%, #6D9ACE 52.44%, #5694DC 77.96%, #4C64A4 95.61%)";
    sectionElement.querySelector(".p-make-review").style.display="block"

    const formReview = sectionElement.querySelector(".review-area");
    formReview.style.display="none";

    const bookName = document.querySelector("[data-book-input]").value
    const authorName = document.querySelector("[data-author-input]").value
    const starsEvaluation = document.querySelector('input[name="stars"]:checked').value
    const reviewUser = document.querySelector("[data-post-input]")
    const valueReview = reviewUser.value
    const image = document.getElementById("input-profile-img").files[0]
    
    const local = document.querySelector(".timeline")
    const printReview = document.createElement("article")
    printReview.classList.add("new-review")

    const userName = user.displayName
    const userName2 = userName.replace(/\s/g, '').toLowerCase();

    uploadImageBooks("input-profile-img", ""+userId+"")
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then (url => {
      const urlImage = url
      console.log(urlImage)
      return urlImage
    })
    .then((urlImage)=>{
      createReview(bookName, authorName, valueReview, starsEvaluation, userNameFirebase,urlImage)
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
  
  
    const content = 
                  `<div id="posts-reviews">
                  <div class="data-post">
                  <div class="aboutbook">
                    <p class="stars-show">${starsEvaluation}</p>
                    <img class="photo-book-review-post" src="./img/default-book.png">
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
  
  // logoutBtn.addEventListener("click", ()=>{
  //     logout()
  //     window.history.pushState(null, null, "/login")
  //     const popStateEvent = new PopStateEvent("popstate", {state:{}})
  //     dispatchEvent(popStateEvent)
  // })

 
// const like = sectionElement.querySelector(".like")
// like.addEventListener("click", ()=>{
//   like.classList.toggle("active")
// })
 

{/* <div class="likes-container">
<div class="like">&#10084;</div>
<span id="num-likes">4</span>
</div>


<form class="review-area" action=""> */}


  return sectionElement
}