export const Post = (name, text, idUser, idPost, date) => {
  const template = `
  <main class='postContainer' id=${idUser}>
    <header class='post-header'id=${idPost}>
      <section class='userInfo'>
        <img src='../../img/profileImg.png' height="40px" width="40px">
        <p class='username'>${name}</p> 
      </section>
      <p id='postDate' class='postDate'>${date}</p> 
    </header> 
    <form class='formContainer'>
      <p class='postContent' placeholder='Sua Mensagem'>${text}</p>      
      <section class='postBtnContainer'>        
        <button type='button' class='publishBtn'>Like</button>
      </section>  
    </form>    
  </main>
  `;
  return template;
};
