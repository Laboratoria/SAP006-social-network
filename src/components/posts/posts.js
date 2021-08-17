export const Post = (nameUserPost, text, idUserPost, idPost, datePost, photoPost) => {
  const template = `
  <main class='feed-postContainer' id=${idUserPost}>
    <header class='feed-postHeader'
      id=${idPost}>
      ${nameUserPost}
      <figure>
        <img src='./img' alt='Foto Perfil' class='foto-postHeader' id='${photoPost}'/>
      </figure>
    </header> 
    <form class='formContainer'>
      <p class='postText' placeholder='Sua Mensagem'>${text}</p>      
        <section class='btnContainer'>
        <p class='dataText'>${datePost}</p> 
          <button type='button' class='publishBtn'>Like</button>
        </section>  
      </form>    
  </main>
  `;
  return template;
};
