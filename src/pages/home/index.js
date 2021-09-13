export default () => {
  const container = document.createElement('div');

  const template = `

  <div class= "container">
    <div class= "card">
      <a href="/#home">
       <header>
        <img  class="header-image" src="img/logo-somus.png">
       </header>
      </a>
        <p> É uma rede social para mulheres que viajam, sozinhas ou não.
        Aqui você pode compartilhar o que viveu, quer viver ou pode acompanhar o que outras viajantes viveram.
        Entre agora e encontre um espaço seguro para trocar experiências, dicas de viagens e muito mais!
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
