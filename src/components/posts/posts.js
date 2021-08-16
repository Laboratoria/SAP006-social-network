export const Post = (post) => {
  const template = `
  <main class='feedPost postContainer'>
    <header id='postHeader' class='post-header'>Usuário</header> 
      <form class='formContainer'>
        <p class='postText postContent' placeholder='Sua Mensagem'>${post}</p>      
        <section class='postBtnContainer'>
          <button type='button' class='publishBtn'>Like</button>
        </section>  
      </form>    
  </main>
  `;
  return template;
};
