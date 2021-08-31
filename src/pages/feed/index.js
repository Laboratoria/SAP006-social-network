export default () => {
  const container = document.createElement('div');

  const template = `
  <a href="/#feed">
    <img src="img/google-logo.png" alt="" class="logo">
  </a>
  <nav class="menu">
  </nav> 

  <div class= "container">
    <div class= "card">
      <h2 class="title">Feed</h2>
    </div> 
  </div>

  `;

  container.innerHTML = template;

  return container;
};
