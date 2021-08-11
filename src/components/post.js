export const addPost = (post) => {
  const postDiv = document.createElement('div');
  postDiv.setAttribute('id', post.id);
  const postTemplate = `
      <div id="${post.data().createdAt}" class="post">
        <div class= "user-perfil">
          <img src="./img/Perfil.png" alt="user-photo" class="user-photo">
          <h4 class="user-name">@${post.data().userName}</h4>
        </div>
        <article class="post-field">
          <p class="user-post">${post.data().text}</p>
        </article>   
      </div>
  `;
  postDiv.innerHTML = postTemplate;
  return postDiv;
};
