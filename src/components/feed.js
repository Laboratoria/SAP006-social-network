export const printPost = (post) => {
  const areaOfPost = document.createElement('div')
  areaOfPost.innerHTML =
  `
  <section class="all-posts">
    <div class='text-published'>${post.data().text} ❤️ ${post.data().likes}</div>
  </section>

  <section class='edit-text'>

    <input class="area-edit" placeholder="Edite o texto aqui" />

    <div class='save-btn-area'>
      <button class="save-button" value='${post.id}'>Salvar post</button>
    </div>

  </section>

  <section class="actions-posts">

    <div class='delete-btn-area'>
      <button id="delete" class="delete-button" value='${post.id}'>Excluir post</button>
    </div>

    <div class='edit-btn-area'>
      <button id="edit" class="edit-button" value='${post.id}'>Editar post</button>
    </div>

  </section>
`;
  
  areaOfPost.querySelector('.edit-button').addEventListener('click', () => {
    const valueInput = areaOfPost.querySelector('.area-edit').value
    updatePost(valueInput)
      .then(() => {
        const containerEditText = areaOfPost.querySelector('.edit-text')
        containerEditText.style.display = "block"
        const areaForEdit = areaOfPost.querySelector('.area-edit')
        const divTextPublished = areaOfPost.querySelector('.text-published')
        const textReady = areaOfPost.querySelector('.text-published').innerHTML

        divTextPublished.style.display = 'none'

        areaForEdit.value = textReady;
      })
      .catch((error) => {
        console.log('Não foi', error)
      })

  })

  areaOfPost.querySelector('.save-button').addEventListener('click', () => {
    const valueInput = areaOfPost.querySelector('.area-edit').value
    const divTextPublished = areaOfPost.querySelector('.text-published')
    areaOfPost.querySelector('.text-published')
    const containerEdit = areaOfPost.querySelector('.edit-text')

    containerEdit.style.display = 'none'
    divTextPublished.style.display = 'block'

    divTextPublished.innerHTML = valueInput
  })

  /*const elementPost = addPost(post);
  rootElement.querySelector('#get-post').appendChild(elementPost)  
   */ 
  return areaOfPost
}

