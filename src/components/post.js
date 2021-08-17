import { currentUser } from "../services/index.js";

export const addPost = (post) => {
  const postDiv = document.createElement('div');
  postDiv.setAttribute('id', post.id);
  const postTemplate = `
    <div id="${post.data().createdAt}" class="post">
      <div class="user-perfil">
        <img src="./img/Perfil.png" alt="user-photo" class="user-photo">
        <h4 class="user-name">@${post.data().userName}</h4>
      </div>
      <article class="post-field">
        <p class="user-post">${post.data().text}</p>
      </article>
    </div>
  `;
  postDiv.innerHTML = postTemplate;
  const postId = post.id
  const userId = currentUser().uid

  const getUserPosts = () => {
    firebase.firestore().collection('posts')
      .where("userId", "==", userId).get()
      .then((firestorePost) => {
        firestorePost.forEach((doc) => {
          addButtons(doc.id)
        })
      })
  }

  const addButtons = (firestorePostId) => {
    if (postId === firestorePostId) {
      postDiv.querySelector('.user-perfil').innerHTML +=
        `<img src="./img/pencil-icon.png" alt="edit-icon" id="editButton" class="icon">`
      const editButton = postDiv.querySelector('#editButton')
      editPost(editButton)
    }
  }
  getUserPosts()

  const getPostText = (newText) => {
    firebase.firestore().collection('posts').doc(postId)
      .update({
        text: newText
      })
    console.log("ok")
  }

  const editPost = (editButton) => {
    editButton.addEventListener('click', () => {
      const post = postDiv.querySelector('.user-post')
      const postField = postDiv.querySelector('.post-field')
      const postText = post.textContent
      const editArea = document.createElement('textarea')
      const confirmEdit = document.createElement('button')
      editArea.setAttribute('id', 'edit-area')
      editArea.textContent = postText
      confirmEdit.setAttribute('id', 'confirm-edit')
      confirmEdit.textContent = 'Confirmar'

      postField.appendChild(editArea)
      postField.replaceChild(editArea, post)
      postField.appendChild(confirmEdit)

      postField.querySelector('#confirm-edit')
        .addEventListener('click', () => {
          const newText = editArea.value
          console.log(newText)
          getPostText(newText)
        })
    })
  }


  return postDiv;
};
