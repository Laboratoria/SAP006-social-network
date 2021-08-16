export const Post = (name, text, idUser, idPost, date) => {
  const template = `
  <main class='feed-postContainer' id=${idUser}>
    <header class='feed-postHeader'
      id=${idPost}>
      ${name}
      <figure>
        <img src='./img' alt='Foto Perfil' class='foto-postHeader'/>
      </figure>
    </header> 
    <form class='formContainer'>
      <p class='postText' placeholder='Sua Mensagem'>${text}</p>      
        <section class='btnContainer'>
        <p class='dataText'>${date}</p> 
          <button type='button' class='publishBtn'>Like</button>
        </section>  
      </form>    
  </main>
  `;
  return template;
};
