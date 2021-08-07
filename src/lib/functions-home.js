import {currentUser, createReview, uploadImageBooks, getReviews, getPost, like} from "./index.js"



export const showReviewArea = () => {
  const formReview =document.querySelector(".review-area");
  formReview.style.display = "flex";
  document.querySelector(".welcome").style.display = "none"
  document.querySelector(".button-make-review").style.display = "none";
  document.querySelector(".make-review").style.background = "linear-gradient(300.92deg, #5E97AF 6.15%, #6D9ACE 80.44%, #5694DC 100.96%)";
  document.querySelector(".p-make-review").style.display = "none"

}

export const profileImage = ()=>{ 
  const user = currentUser()
  const imageUrl = user.photoURL
  let profileImg

    if (imageUrl != null) {
      profileImg = user.photoURL
    } else {
      profileImg = "./img/default-img.png"
    }
      return profileImg
}

export const publishReview = (e) =>{
  const user = currentUser()
  const userId = user.uid
  e.preventDefault()
  const date = new Date()
  const completeDate = date.toLocaleDateString()
  const hour = date.toLocaleTimeString("pt-BR", {
    timeStyle: "short",       
    hour12: false,          
    numberingSystem: "latn"   
  });


  document.querySelector(".review-area").style.display = "none"
  document.querySelector(".welcome").style.display = "flex"
  document.querySelector(".button-make-review").style.display = "block";
  document.querySelector(".make-review").style.background = "linear-gradient(600.92deg, #5E97AF 6.15%, #6D9ACE 52.44%, #5694DC 77.96%, #4C64A4 95.61%)";
  document.querySelector(".p-make-review").style.display = "block"

  const formReview = document.querySelector(".review-area");
  formReview.style.display = "none";

  const userNameFirebase = user.displayName
  const bookName = document.querySelector("[data-book-input]").value
  const authorName = document.querySelector("[data-author-input]").value
  const starsEvaluation = document.querySelector('input[name="stars"]:checked').value
  const reviewUser = document.querySelector("[data-post-input]")
  const valueReview = reviewUser.value
  const image = document.getElementById("input-profile-img").files[0]
  const profileImg = profileImage()
  
  const local = document.querySelector(".timeline")
  const printReview = document.createElement("article")
  printReview.classList.add("new-review")

  const userName = user.displayName
  const userName2 = userName.replace(/\s/g, '').toLowerCase();

    

  const content = 
  `<div id="posts-reviews">
  <div class="data-post">
    <div class="main-information-post">
      <div class="information-post-wrapper">
        <div class="user-post">
          <img class="photo-post-review" id="photo-book" src=${profileImg}>
          <div class="user-wrapper">
            <div class="user-information-post">
              <h1 class="name-profile-post">${userName}</h1>
              <p class="username-post">@${userName2}</p>  
            </div>
            <div class="date">
              <p class="date-post">${completeDate}</p>
              <p class="date-post">${hour}</p>
            </div>
            
          </div>
        </div>
        <div class="book-information">
          <div class="title-wrapper">
            <h2 class="title-book"> ${bookName} </h2>
            <span class="stars-show">${starsEvaluation}</span>
          </div>
          <h3 class="name-author">${authorName} </h3>
        </div>
      </div>
      <div class="book-image" id="book-image">
       
      <div>
    </div>
  </div>
            
  </div>
  <div class="data-book-post">
      
      <p class="content-review">${valueReview}</p> </br>
  </div>

  <div class="likes-container">
    <div class="like" id="like-own-post">&#10084;</div>
    <span class="num-likes" id="num-likes-own-post">0</span>
  </div>
  
</div>`

  printReview.innerHTML = content
  local.appendChild(printReview)
  window.scrollTo(0,0)

  let idPost
  if (image != undefined){
    uploadImageBooks("input-profile-img")
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then (url => {
      const urlImage = url
      document.querySelector("#book-image").innerHTML = `<img class="photo-book-review-post" src=${urlImage}></img>`
      return urlImage
    })
    .then((urlImage)=>{
      createReview(bookName, authorName, valueReview, starsEvaluation, userNameFirebase,urlImage, completeDate, hour)
      
    })
    .then(docRef => {
      idPost = docRef.id
    })
    
  } else{
    createReview(bookName, authorName, valueReview, starsEvaluation, userNameFirebase, null, completeDate, hour)
    .then(docRef => {
      idPost = docRef.id
    })
  }

  const likeYourOwnPost = document.querySelector("#like-own-post")
  const numLikesPost = document.querySelector("#num-likes-own-post")
  likeYourOwnPost.addEventListener("click", ()=>{
    like(idPost,userId)
    likeYourOwnPost.classList.toggle('active');
    if(numLikesPost.innerText=="0"){
      numLikesPost.innerHTML="1"
      
    } else if(numLikesPost.innerText=="1"){
      numLikesPost.innerHTML="0"
    }
   
    
  })

}

export const loadPosts = () => {
  const user = currentUser()
  const userId = user.uid

  const reviewsData = () => {
    getReviews()

      .then((snap) => {
        const allReviews = document.querySelector("[data-all-reviews]")
        allReviews.innerHTML = ""

        snap.forEach((doc) => {
          
          const name = doc.data().userName
          const userName = name.replace(/\s/g, '').toLowerCase();
          const date= doc.data().datePost
          const hour = doc.data().hourPost
          const bookImageUrl = doc.data().imageUrl
          const userImageUrl = doc.data().userImg
          const reviewLikes= doc.data().likes
          
        

          let userImage
          if (userImageUrl!=null){
            userImage = userImageUrl
          } else{
            
            userImage = "./img/default-img.png"
          }
        
          const reviewTemplate = 
                        
            `<div id="posts-reviews">
              <div class="data-post">
                <div class="main-information-post">
                  <div class="information-post-wrapper">
                    <div class="user-post">
                      <img class="photo-post-review" src=${userImage}>
                      <div class="user-wrapper">
                        <div class="user-information-post">
                          <h1 class="name-profile-post">${name}</h1>
                          <p class="username-post">@${userName}</p>  
                        </div>
                        <div class="date">
                          <p class="date-post">${date}</p>
                          <p class="date-post">${hour}</p>
                        </div>
                        
                      </div>
                    </div>
                    <div class="book-information">
                      <div class="title-wrapper">
                        <h2 class="title-book"> ${doc.data().book} </h2>
                        <span class="stars-show">${doc.data().rating}</span>
                      </div>
                      <h3 class="name-author">${doc.data().author} </h3>
                    </div>
                  </div>
                  <div class="book-image" id="photo-${doc.id}">
                    
                  <div>
                </div>
              </div>
                        
              </div>
              <div class="data-book-post">
                  
                  <p class="content-review">${doc.data().review}</p> </br>
              </div>

              <div class="likes-container">
                <div class="like" id="like-${doc.id}">&#10084;</div>
                <span class="num-likes">${reviewLikes.length}</span>
              </div>
              
            </div>`
                    
          allReviews.innerHTML += reviewTemplate

          if (bookImageUrl!=null){
           document.querySelector(`#photo-${doc.id}`).innerHTML = `<img class="photo-book-review-post" src=${bookImageUrl}></img>`
          }
          
          const heart = allReviews.querySelector(`#like-${doc.id}`)
          if(reviewLikes.indexOf(userId) != -1){
            heart.classList.add("active");
          }  
        })

        const likeDivList = allReviews.querySelectorAll(".like");
        
        for(let div of likeDivList){
          div.addEventListener("click", (e) => {
            e.preventDefault()
            //const liked = menu.classList.contains('.active');
            div.classList.toggle('active');
            //this.innerHTML = aberto ? 'abrir' : 'fechar';
            
            const idLike = div.getAttribute("id")
            const idReviewLiked = idLike.slice(5)
            const numLikesDiv=div.nextSibling.nextSibling
            let updatedNumLikes
            getPost(idReviewLiked)
            .then((review)=>{
              const likesArray = review.data().likes
              if (likesArray.indexOf(userId) === -1){
                updatedNumLikes = likesArray.length+1
              }else{
                updatedNumLikes = likesArray.length-1
              }
              numLikesDiv.innerText = updatedNumLikes
              like(idReviewLiked, userId)

            })
            
          })
        }

      })
      .catch((error) => {
        console.log("Error getting documents: ", error)
      })

  }
  
  reviewsData()
      
}
