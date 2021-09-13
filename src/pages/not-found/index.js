export default () => {
  const container = document.createElement('div');

  const template = `
    <header class="header-pages">
      <img class="header-img" src="img/logo-somus.png">
     <h1>Error 404</h1>
    </header>
    <p class="text-pages" >Essa pagina não pode ser encontrada tente novamente ou <a href="/#home">Clique aqui</a> para ir para a tela inicial</p>
  `;

  container.innerHTML = template;

  return container;
};
