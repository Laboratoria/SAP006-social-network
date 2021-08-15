import { updatePosts } from '../services/database.js';

export const printPost = (post) => {
  const areaOfPost = `
  <section class="all-posts">

  <section data-container>
    <div class="box">
      <p class="username">username</p>
      <div class="content">
        <button>
          <span class="iconify no-pic" data-inline="false" data-icon="bi:person-circle"
            style="color: #706F6B;"></span>
        </button>
        
        <div class="textBox">
          <textarea
            name="post-text"
            class="post-content text-post"
            id="${post.data().id}">
            ${post.data().text}
          </textarea>
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

      <section class='edit-text'>
        <div class='save-btn-area'>
          <button class="save-button" value='${post.data().id}'>Salvar post</button>
        </div>
        <div class='edit-btn-area'>
          <button
            id="edit"
            class="edit-button"
            value='${post.data().id}'>
            Editar post
          </button>
        </div>
      </section>

      <section class="actions">
        <button class="delete-button" value=""><span class="iconify" data-inline="false"
            data-icon="bytesize:trash" style="color: #706f6b;"></span></button>
        <button><span id="btn-reply" class="iconify" data-inline="false" data-flip="vertical"
            data-icon="bi:reply"></span></button>
        <button>❤️ ${post.likes}</button>
      </section>

    </div>
  </section>
</section>
`;

  const postTemplate = document.querySelector('#postTemplate');
  postTemplate.innerHTML += areaOfPost;

  updatePosts('4pVdpwtzW4OFz5Lk4xUe', 'banana');

  const editButton = postTemplate.querySelector('.edit-button');
  // eslint-disable-next-line no-debugger
  debugger;
  editButton.addEventListener('click', () => {
    const valueText = areaOfPost.querySelector('.post-content text-post').value;
    console.log(valueText);
  });

  /*
  const elementPost = addPost(post);
  rootElement.querySelector('#get-post').appendChild(elementPost)
   */

  // const editPost = () => {
  //   const valueInput = document.querySelector('.area-edit').value;
  //   const posts = document.querySelector('all-posts');
  //   updatePost(valueInput, posts)
  //     .then(() => {
  //       const containerEditText = document.querySelector('.edit-text');
  //       containerEditText.style.display = 'block';
  //       const areaForEdit = document.querySelector('.area-edit');
  //       const divTextPublished = document.querySelector('.text-published');
  //       const textReady = document.querySelector('.text-published').innerHTML;

  //       divTextPublished.style.display = 'none';

  //       areaForEdit.value = textReady;
  //     })
  //     .catch((error) => {
  //       console.log('Não foi', error);
  //     });
  // };

  // ;

  // const saveUpdatedPost = () => {
  //   const valueInput = document.querySelector('.area-edit').value;
  //   const divTextPublished = document.querySelector('.text-published');
  //   document.querySelector('.text-published');
  //   const containerEdit = document.querySelector('.edit-text');

  //   containerEdit.style.display = 'none';
  //   divTextPublished.style.display = 'block';

  //   divTextPublished.innerHTML = valueInput;
  // };

  // document.querySelector('.save-button').addEventListener('click', () => {
  //   saveUpdatedPost();
  // });
};
