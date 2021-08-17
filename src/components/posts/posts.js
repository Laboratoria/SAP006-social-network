export const Post = (nameUserPost, text, idUserPost, idPost, photoPost, dateP) => {
  const template = `
  <main class='postContainer' id=${idUserPost}>
    <header class='post-header' id=${idPost}>      
      <section class='userInfo'>
        <img id='${photoPost}' src='../../img/profileImg.png' height="40px" width="40px">
        <p class='username'>${nameUserPost}</p> 
      </section>
      <p id='postDate' class='postDate'>${dateP}</p> 
    </header> 
    <form class='formContainer'>
      <p class='postInput' placeholder='Sua Mensagem'>${text}</p>      
        <section class='postBtnContainer'>       
          <button type='button' class='publishBtn'>Like</button>
        </section>  
      </form>    
  </main>
  `;
  return template;
};
