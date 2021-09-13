export default () => {
  const container = document.createElement('div');

  const template = `

  <div class= "container">
    <div class= "card">
       <header class="header-home">
        <img class="header-image" src="img/logo-somus.png">
       </header>
        <h4 class="title title-home">É uma rede social para mulheres que viajam, sozinhas ou não.</h4>
        <p class="text-home">
        Aqui você pode compartilhar o que viveu, quer viver ou pode acompanhar o que outras viajantes viveram.
        Entre agora e encontre um espaço seguro para trocar experiências, dicas de viagens e muito mais!
        </p>
        <div class="btn-box">
          <a href="/#login">
            <button class="btn login-button">Login</button>
          </a>
          <a href="/#register">
            <button class="btn login-button">Cadastro</button>
          </a>
        </div>
    </div>
  </div> 
  `;

  container.innerHTML = template;

  return container;
};
