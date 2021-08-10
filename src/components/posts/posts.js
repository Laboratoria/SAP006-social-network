export const Post = (post) => {
  const template = `
  <main class='feed-postContainer'>
    <header id='postHeader' class='feed-postHeader'>Usuário</header> 
      <form class='formContainer'>
        <p class='postText' placeholder='Sua Mensagem'>${post}</p>      
        <section class='btnContainer'>
          <button type='button' class='publishBtn'>Like</button>
        </section>  
      </form>    
  </main>
  `;
  return template;
};
