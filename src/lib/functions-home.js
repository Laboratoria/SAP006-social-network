import {
  currentUser,
  createReview,
  uploadImageBooks,
  getReviews,
  getPost,
  like,
  deletePost,
  saveReview,
  sendComment,
  deleteComment,
  save
} from "./index.js"

import { comment } from "../components/comment/index.js";



export const showReviewArea = () => {
  const formReview = document.querySelector(".review-area");
  formReview.style.display = "flex";
  document.querySelector(".welcome").style.display = "none"
  document.querySelector(".button-make-review").style.display = "none";
  document.querySelector(".make-review").style.background = "linear-gradient(300.92deg, #5E97AF 6.15%, #6D9ACE 80.44%, #5694DC 100.96%)";
  document.querySelector(".p-make-review").style.display = "none"

}

export const profileImage = () => {
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


export const loadPosts = (functionFirebase) => {
  const user = currentUser()
  const userId = user.uid

  const reviewsData = () => {

    functionFirebase
      .then((snap) => {
        const allReviews = document.querySelector("[data-all-reviews]")
        allReviews.innerHTML = ""

        snap.forEach((doc) => {

          const postId = doc.id
          const name = doc.data().userName
          const date = doc.data().datePost
          const hour = doc.data().hourPost
          const bookImageUrl = doc.data().imageUrl
          const userImageUrl = doc.data().userImg
          const bookTitle = doc.data().book
          const author = doc.data().author
          const rating = doc.data().rating
          const reviewContent = doc.data().review
          const reviewLikes = doc.data().likes
          const reviewSaves = doc.data().saves

          let userName
          let userName2
          const userNameFirebase = user.displayName

          if (name != null && name != undefined) {
            userName = name
            userName2 = userName.replace(/\s/g, '').toLowerCase();
          } else {
            userName = "Usuário anônimo"
            userName2 = ""
          }


          let userImage
          if (userImageUrl != null) {
            userImage = userImageUrl
          } else {

            userImage = "./img/default-img.png"
          }

          let reviewTemplate =

            `<div class="posts-reviews" id="${doc.id}" data-post>
              <div class="data-post">
                <div class="main-information-post">
                  <div class="information-post-wrapper">
                    <div class="user-post">
                      <img class="photo-post-review" src=${userImage}>
                      <div class="user-wrapper">
                        <div class="user-information-post">
                          <h1 class="name-profile-post">${userName}</h1>
                          <p class="username-post">${userName2}</p>  
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
              <button  class="comment-btn" ><img class="comment" src="./img/comment-btn.png"  data-item="comment"/></button>
                <div class="save" id="save-${postId}"><img class="icon-save"src="img/save-navbar.png"/></div>
                <span class="num-saves">${reviewSaves.length}</span>

                <div class="optionsedition" id="edition-${postId}" data-option style="display:none">
                <div class="container-edit-btns">
                  <button class="edit-delete" id="edit-post">Editar</button>
                  <button class="edit-delete" id="delete-post" data-item="delete">Excluir</button>
                </div>
                  <div class="confirm-delete">
                    <div class="confirm-modal">
                      <h1 class="h1-confirm-delete">Você tem certeza que quer excluir esse post?</h1>
                        <button class="confirm-buttons" id="yes-delete">Confirmar</button>
                        <button class="confirm-buttons" id="no-delete">Cancelar</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="comments-container" id="comment-${postId}">
                <div class="comment-post" data-set="add-comment-container" style="display:none" >
                  <div class="comment-image-div">
                    <img src="${profileImage()}"class="comment-user-image"/>
                  </div>
                  <div class="comment-text comment-text-form">
                    <div class="comment-headline">
                      <p class="comment-username">${currentUser().displayName}</p>
                    </div>
            
                    <textarea class="input-comment" rows="1" data-item="add-comment" placeholder="Adicione seu comentário." wrap="hard"></textarea>
                    <button class="send-comment" data-item="send-comment">Publicar</button>
                    <div>
                </div>

              </div>
              
            </div>`


          allReviews.innerHTML += reviewTemplate

          if (userId == doc.data().userId) {
            const edition = document.querySelector(`#edition-${postId}`)
            edition.style.display = "block"
          }


          const txtAreas = document.querySelectorAll('.input-comment');
          for (let i = 0; i < txtAreas.length; i++) {
            txtAreas[i].addEventListener('input', function () {
              if (this.scrollHeight > this.offsetHeight) this.rows += 1;
            });
          }



          const postSelected = allReviews.querySelectorAll("[data-post]")
          for (let post of postSelected) {
            post.addEventListener("click", (e) => {
              const postId = post.getAttribute("id")
              const target = e.target
              const targetDataset = target.dataset.item
              if (targetDataset == "delete") {
                const divDelete = target.parentNode.parentNode.children[1]
                const divYes = target.parentNode.parentNode.children[1].children[0].children[1]
                const divNo = target.parentNode.parentNode.children[1].children[0].children[2]
                divDelete.style.display = "block"
                divYes.addEventListener("click", () => {
                  deletePost(postId)
                    .then(() => {
                      divDelete.style.display = "none"
                      post.remove()
                    })
                    .catch(e => {
                      console.log("erro")
                    })
                })
                divNo.addEventListener("click", () => {
                  divDelete.style.display = "none"
                })
              }
            })
          }

          if (bookImageUrl != null) {
            document.querySelector(`#photo-${doc.id}`).innerHTML = `<img class="photo-book-review-post" src=${bookImageUrl}></img>`
          }

          const heart = allReviews.querySelector(`#like-${doc.id}`)
          if (reviewLikes.indexOf(userId) != -1) {
            heart.classList.add("active");
          }

          const saved = allReviews.querySelector(`#save-${doc.id}`)
          if (reviewSaves.indexOf(userId) != -1) {
            saved.classList.add("saved");
          }

          const saveDivList = allReviews.querySelectorAll(".save");

          for (let div of saveDivList) {
            div.addEventListener("click", () => {
              div.classList.toggle('saved');
              const idSave = div.getAttribute("id")
              const idReviewSaved = idSave.slice(5)
              const numSavesDiv = div.nextSibling.nextSibling
              let updatedNumSaves
              getPost(idReviewSaved).then((review) => {
                const saveArray = review.data().saves
                if (saveArray.indexOf(userId) === -1) {
                  updatedNumSaves = saveArray.length + 1
                  saveReview(userId, idReviewSaved)
                } else {
                  updatedNumSaves = saveArray.length - 1
                }
                numSavesDiv.innerText = updatedNumSaves
                save(idReviewSaved, userId)

              })
                .catch((error) => {
                  console.log("Error getting documents: ", error)
                })

            })
          }
        })

        const postDivList = allReviews.querySelectorAll("[data-post]")
        const root = document.querySelector("#root")

        for (let post of postDivList) {
          post.addEventListener("click", (e) => {
            const postId = post.getAttribute("id")
            const target = e.target
            const targetDataset = target.dataset.item
            if (targetDataset == "like") {
              likePost(target, postId)
            }

            if (targetDataset == "comment") {
              const parentDiv = target.parentNode.parentNode.parentNode
              const commentDiv = parentDiv.children[3].children[0]
              commentDiv.children[1].children[1].value = ""
              commentDiv.children[1].children[1].placeholder = "Adicione um comentário."

              commentDiv.style.display = "flex"
              root.addEventListener("click", (e) => {
                const target = e.target
                const targetDataset = target.dataset.item
                if (targetDataset != "add-comment") {
                  commentDiv.style.display = "none"
                }

              }, true)
            }

            if (targetDataset == "delete-comment") {
              const commentsDiv = target.parentNode.parentNode.parentNode
              const commentValue = commentsDiv.children[1].children[1].innerText
              const divDelete = target.parentNode.children[1]
              const divYes = target.parentNode.children[1].children[0].children[1]
              const divNo = target.parentNode.children[1].children[0].children[2]
              const userPhoto = currentUser().photoURL
              const userName = currentUser().displayName
              const date = new Date()
              const completeDate = date.toLocaleDateString()
              const hour = date.toLocaleTimeString("pt-BR", {
                timeStyle: "short",
                hour12: false,
                numberingSystem: "latn"
              });
              divDelete.style.display = "block"
              divYes.addEventListener("click", () => {
                deleteComment(postId, commentValue, userId, userPhoto, userName, completeDate, hour)
                  .then(() => {
                    divDelete.style.display = "none"
                    commentsDiv.remove()
                  })
                  .catch(e => {
                    console.log("erro")
                  })
              })
              divNo.addEventListener("click", () => {
                divDelete.style.display = "none"
              })

            }
            if (targetDataset == "send-comment") {
              const commentsDiv = target.parentNode.parentNode.parentNode
              const commentValue = commentsDiv.children[0].children[1].children[1].value
              if (commentValue.replace(/\s/g, '') != "") {
                const userPhoto = currentUser().photoURL
                const userName = currentUser().displayName
                const date = new Date()
                const completeDate = date.toLocaleDateString()
                const hour = date.toLocaleTimeString("pt-BR", {
                  timeStyle: "short",
                  hour12: false,
                  numberingSystem: "latn"
                });
                sendComment(postId, commentValue, completeDate, hour)
                  .then(() => {
                    const divAppend = commentsDiv.children[1]
                    commentsDiv.insertBefore(comment(userPhoto, userName, commentValue, completeDate, hour), divAppend)
                  })

                  .catch((error) => {
                    console.error("Error writing document: ", error);
                  })

              }




            }
          })
        }

        for (let post of postDivList) {
          const postId = post.getAttribute("id")
          const divComments = post.children[0].children[3]
          getPost(postId)
            .then((review) => {
              if (userId == review.data().userId) {
                const edition = document.querySelector(`#edition-${postId}`)
                edition.style.display = "block"
              }

              //divComments.append(comment(userImage, userName,text, date, hour))

            })
            .catch(() => {
              console.log("Error getting documents: ", error)

            })
        }

        for (let post of postDivList) {
          const postId = post.getAttribute("id")
          const divComments = post.children[0].children[3]
          getPost(postId)
            .then((review) => {
              const commentsArray = review.data().comments
              const orderedComments = commentsArray.reverse()
              for (let com of orderedComments) {
                const userImage = com.userImg
                const userName = com.userName
                const text = com.value
                const date = com.dateOfComment
                const hour = com.hourOfComment

                divComments.append(comment(userImage, userName, text, date, hour))
              }
            })
            .catch(() => {
              console.log("Error getting documents: ", error)

            })
        }






      })
      .catch((error) => {
        console.log("Error getting documents: ", error)
      })

  }

  reviewsData()

}



export const publishReview = (e) => {
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

  window.scrollTo(0, 0)

  if (image != undefined) {
    uploadImageBooks("input-profile-img")
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        const urlImage = url
        return urlImage
      })
      .then((urlImage) => {
        createReview(bookName, authorName, valueReview, starsEvaluation, userNameFirebase, urlImage, completeDate, hour)

      })
      .then(() => {
        loadPosts(getReviews())
      })

  } else {
    createReview(bookName, authorName, valueReview, starsEvaluation, userNameFirebase, null, completeDate, hour)
      .then(() => {
        loadPosts(getReviews())
      })
  }
}

export const likePost = (target, postId) => {
  const user = currentUser()
  const userId = user.uid


  target.classList.toggle('active');

  const numLikesDiv = target.nextSibling.nextSibling
  let updatedNumLikes
  getPost(postId)
    .then((review) => {
      const likesArray = review.data().likes
      if (likesArray.indexOf(userId) === -1) {
        updatedNumLikes = likesArray.length + 1
      } else {
        updatedNumLikes = likesArray.length - 1
      }
      numLikesDiv.innerText = updatedNumLikes
      like(postId, userId)

    })
    .catch(() => {
      alert("Falha ao curtir o post! Tente novamente.")

    })

}
