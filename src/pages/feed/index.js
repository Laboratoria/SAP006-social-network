export default () => {
  const container = document.createElement('div');

  const template = `
  <a href="/#feed">
    <img src="img/google-logo.png" alt="" class="logo">
  </a>
  <nav class="menu">
  </nav> 
  <p>Feed</p>
  `;

  container.innerHTML = template;

  return container;
};
