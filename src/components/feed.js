export const printPost = (post) => {
  const postStructure = `
  <section>
    <p id='${post.id}'>${post.data().text} ❤️ ${post.data().likes}</p> 
    <button id="btnDelete" value="${post.id}">Excluir</button>
  </section>
  `;

  document.getElementById('postTemplate').innerHTML += postStructure;
}

