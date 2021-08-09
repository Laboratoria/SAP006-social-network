export const printPost = (post) => {
  const postStructure = `
  <section data-container>
    <p id='${post.id}'>${post.data().text} ❤️ ${post.data().likes}</p> 
    <button class="delete-button" value="${post.id}">Excluir</button>
  </section>
  `;

  document.getElementById('postTemplate').innerHTML += postStructure;
}