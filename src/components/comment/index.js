
export const comment = (userImage, name, text, completeDate, hour) => {

  const sectionElement = document.createElement("section")
  sectionElement.classList.add('comment-post')

  const image = userImage
  let userPhoto
  if (image != null) {
    userPhoto = image
  } else {
    userPhoto = "../../img/default-img.png"
  }

  let userName


  if (name != null && name != undefined) {
    userName = name

  } else {
    userName = "Usuário anônimo"

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
    <div class="options-edition-comment">
      <button class="edit-delete-comment" id="delete-post-comment" data-item="delete-comment">Excluir</button>
      <div class="confirm-delete-comment">
        <div class="confirm-modal-comment">
          <h1 class="h1-confirm-delete-comment">Você tem certeza que quer excluir esse comentário?</h1>
            <button class="confirm-buttons-comment" id="yes-delete-comment">Confirmar</button>
            <button class="confirm-buttons-comment" id="no-delete-comment">Cancelar</button>
        </div>
      </div>
    </div>
    </div>
`

  sectionElement.innerHTML = commentTemplate

  return sectionElement

}