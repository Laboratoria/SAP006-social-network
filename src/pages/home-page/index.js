export default () => {
  const container = document.createElement('div');

  const template = `
  <img src="" alt="" class="logo">
  <a href="/#home-page"><button class="login-button">Iniciar</button></a>
   
  `;

  container.innerHTML = template;

  return container;
};
