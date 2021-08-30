export default () => {
  const container = document.createElement('div');

  const template = `
    <header>
      <nav class="menu">
      </nav> 
      <a href="/#feed">
        <img src="img/google-logo.png" alt="" class="logo">
      </a>
    </header>
    <h5>Post</h5>
      <form action=".">
        <textarea name="post-feed" id="post" class="post-text" cols="30" rows="5" maxlength="500" placeholder="Escreva sua experiência aqui"></textarea>
      </form>
  `;

  container.innerHTML = template;

  return container;
};
