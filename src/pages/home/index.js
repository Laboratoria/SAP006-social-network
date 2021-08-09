export default () => {
  const container = document.createElement('div');

  const template = `
  <a href="/#home">
    <img src="" alt="" class="logo">
    <p>texto teste</p>
    <a href="/#login">
      <button class="login-button">Login</button>
    </a>
    <a href="/#register">
      <button class="login-button">Cadastro</button>
    </a>
  </a>
  `;

  container.innerHTML = template;

  return container;
};
