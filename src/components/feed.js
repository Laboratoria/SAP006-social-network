export const printPost = (post) => {
  const areaOfPost = document.createElement('div');

  areaOfPost.innerHTML = `
    <section class="all-posts">

      <section class='edit-text'>
        <input class="area-edit" placeholder="Edite o texto aqui" />
        <div class='save-btn-area'>
          <button class="save-button" value='${post.id}'>Salvar post</button>
        </div>
        <div class='edit-btn-area'>
          <button id="edit" class="edit-button" value='${post.id}'>Editar post</button>
        </div>
      </section>

      <section data-container>
        <div class="box">
          <p class="username">username</p>
          <div class="content">
            <button>
              <span class="iconify no-pic" data-inline="false" data-icon="bi:person-circle"
                style="color: #706F6B;"></span>
            </button>
            
            <div class="textBox">
              <p class="post-content text-post" id='${post.id}'>${post.text}</p>
              <div class="btn-inside">
                <button class="btn-actions"><span class="iconify" data-inline="false"
                    data-icon='ri:image-add-fill'></span>
                </button>
                <button class="btn-actions"><span class="iconify" data-inline="false"
                    data-icon="mdi:send-circle"></span>
                </button>
              </div>
            </div>
          </div>

          <section class="actions">
            <button class="delete-button" value="${post.id}">
              <span class="iconify" data-inline="false"
                data-icon="bytesize:trash" style="color: #706f6b;"></span>
            </button>
            <button>
              <span id="btn-reply" class="iconify" data-inline="false" data-flip="vertical"
                data-icon="bi:reply"></span>
            </button>
            <button>❤️ ${post.likes}</button>
          </section>

        </div>
      </section>
    </section>
`;

  areaOfPost.querySelector('.edit-button').addEventListener('click', () => {
    const valueInput = areaOfPost.querySelector('.area-edit').value;
    updatePost(valueInput)
      .then(() => {
        const containerEditText = areaOfPost.querySelector('.edit-text');
        containerEditText.style.display = 'block';
        const areaForEdit = areaOfPost.querySelector('.area-edit');
        const divTextPublished = areaOfPost.querySelector('.text-published');
        const textReady = areaOfPost.querySelector('.text-published').innerHTML;

        divTextPublished.style.display = 'none';

        areaForEdit.value = textReady;
      })
      .catch((error) => {
        console.log('Não foi', error);
      });
  });

  areaOfPost.querySelector('.save-button').addEventListener('click', () => {
    const valueInput = areaOfPost.querySelector('.area-edit').value;
    const divTextPublished = areaOfPost.querySelector('.text-published');
    areaOfPost.querySelector('.text-published');
    const containerEdit = areaOfPost.querySelector('.edit-text');

    containerEdit.style.display = 'none';
    divTextPublished.style.display = 'block';

    divTextPublished.innerHTML = valueInput;
  });

  /* const elementPost = addPost(post);
  rootElement.querySelector('#get-post').appendChild(elementPost)
   */
  return areaOfPost;
};
