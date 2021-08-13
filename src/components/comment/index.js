
export const comment = (userImage, name, text, completeDate, hour) => {

  const sectionElement = document.createElement("section")
  sectionElement.classList.add('comment-post')

  const image = userImage
  let userPhoto
  if (image != null) {
    userPhoto= image
  } else {
    userPhoto = "../../img/default-img.png"
  }

  let userName 


  if (name != null && name != undefined) {
    userName = name
   
  } else {
    userName = "Usuário indefinido"
   
  }

  const commentTemplate = 
  `
    <div class="comment-image-div">
      <img src="${userPhoto}"class="comment-user-image"/>
    </div>
    <div class = "comment-text">
      <div class="comment-headline">
        <p class="comment-username">${userName}</p>
        <p class="comment-date">${completeDate}</p>
        <p class="comment-date">${hour}</p>
      </div>
      <p class="comment-content">${text}</p>
    </div>
`

  sectionElement.innerHTML = commentTemplate

  return sectionElement

}