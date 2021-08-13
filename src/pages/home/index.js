export default () => {
  const container = document.createElement('div');

  const template = `
  <div class="background-purple">
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
  </div> 
  
  `;

  container.innerHTML = template;

  return container;
};
