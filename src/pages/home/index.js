export default () => {
  const container = document.createElement('div');

  const template = `

  <div class= "container">
    <img src="" alt="" class="logo">
    <div class= "card">
      <a href="/#home"> 
        <img src="" alt="" class="logo">
        <h2>SO.MU.S</h2> </a>
        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et ante 
          id risus semper sollicitudin ut non odio. Sed dignissim, diam quis sagittis congue,
          elit lectus facilisis lacus, a congue ex eros ac nulla. Nunc at enim id sapien 
          lacinia scelerisque. Vivamus a dictum ligula. Sed convallis consectetur massa at 
          mollis. Maecenas eget lacus non leo ornare tincidunt. Nam ut placerat mauris. 
        </p>
        <div class="btn-box">
          <a href="/#login">
            <button class="login-button">Login</button>
          </a>
          <a href="/#register">
            <button class="login-button">Cadastro</button>
          </a>
        </div>
    </div>
  </div> 
  `;

  container.innerHTML = template;

  return container;
};
