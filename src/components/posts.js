export const Post = (post) => {
  const template = ` <main class='feedContainer'>
  <section class='postContainer'>
    <header id='postHeader' class='postHeader'>Usuário</header>
      <form class='formContainer'>
        <span class='postText'>${post}</span>      
          <section class='btnContainer'>
            <button type='button' class='publishBtn'>Publicar</button>
          </section> 
        </form>   
    </section>   
    `;
  return template;
};
