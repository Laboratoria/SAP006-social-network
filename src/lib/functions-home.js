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



export const loadPosts = () => {
  const user = currentUser()
  const userId = user.uid

  const reviewsData = () => {
    getReviews()

      .then((snap) => {
        const allReviews = document.querySelector("[data-all-reviews]")
        allReviews.innerHTML = ""

        snap.forEach((doc) => {

          const postId = doc.id          
          const name = doc.data().userName
          const userName = name.replace(/\s/g, '').toLowerCase();
          const date= doc.data().datePost
          const hour = doc.data().hourPost
          const bookImageUrl = doc.data().imageUrl
          const userImageUrl = doc.data().userImg
          const bookTitle = doc.data().book
          const author = doc.data().author
          const rating = doc.data().rating
          const reviewContent = doc.data().review
          const reviewLikes= doc.data().likes
          
          let userImage
          if (userImageUrl!=null){
            userImage = userImageUrl
          } else{
            
            userImage = "./img/default-img.png"
          }
        
          const reviewTemplate = 
                        
            `<div class="post-review" id="${postId}" data-post>
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
                        <h2 class="title-book"> ${bookTitle} </h2>
                        <span class="stars-show">${rating}</span>
                      </div>
                      <h3 class="name-author">${author} </h3>
                    </div>
                  </div>
                  <div class="book-image" id="photo-${postId}">
                    
                  <div>
                </div>
              </div>
                        
              </div>
              <div class="data-book-post">
                  
                  <p class="content-review">${reviewContent}</p> </br>
              </div>

              <div class="likes-container">
                <button class="like" id="like-${postId}" data-item="like">&#10084;</button>
                <span class="num-likes">${reviewLikes.length}</span>
                <button  class="comment-btn" ><img class="comment" src="./img/comment.png"  data-item="comment"/></button>
              </div>

              <div class="comments-container" >
                <div class="add-comment-container" style="display:none">
                  <input type="text" class="input-comment" rows="2"> 
                  <button class="send-comment">Publicar</button>
                </div>
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

        const postDivList = allReviews.querySelectorAll("[data-post]")
        
        for(let post of postDivList){
          post.addEventListener("click",(e)=>{
            const postId = post.getAttribute("id")
            const target = e.target
            const targetDataset = target.dataset.item
            console.log(targetDataset)
            if(targetDataset=="like"){
              likePost(target, postId)
            }

            if(targetDataset=="comment"){
              const div = target.parentNode.nextSibling.style.display="none"
              console.log(div)
            }
          })
        }

      })
      .catch((error) => {
        console.log("Error getting documents: ", error)
      })

  }
  
  reviewsData()
      
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
  const printReview = document.createElement("article")
  printReview.classList.add("new-review")

  window.scrollTo(0,0)

  if (image != undefined){
    uploadImageBooks("input-profile-img")
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then (url => {
      const urlImage = url
      return urlImage
    })
    .then((urlImage)=>{
      createReview(bookName, authorName, valueReview, starsEvaluation, userNameFirebase,urlImage, completeDate, hour)
      
    })
    .then(()=>{
      loadPosts()
    })
    
  } else{
    createReview(bookName, authorName, valueReview, starsEvaluation, userNameFirebase, null, completeDate, hour)
    .then(()=>{
      loadPosts()
    })
  }
}

export const likePost = (target, postId) => {
  const user = currentUser()
  const userId = user.uid


  target.classList.toggle('active');
           
            const numLikesDiv=target.nextSibling.nextSibling
            let updatedNumLikes
            getPost(postId)
            .then((review)=>{
              const likesArray = review.data().likes
              if (likesArray.indexOf(userId) === -1){
                updatedNumLikes = likesArray.length+1
              }else{
                updatedNumLikes = likesArray.length-1
              }
              numLikesDiv.innerText = updatedNumLikes
              like(postId, userId)

            })
            .catch(()=>{
              alert("Falha ao curtir o post! Tente novamente.")

            })

}

export const commentPost = (postId) => {
  const user = currentUser()
  const userId = user.uid


}
