export default () => {
  const container = document.createElement('div');

  const template = `
    <header>
     <h1>Error 404</h1>
    </header>
    <p>Essa pagina não pode ser encontrada tente novamente ou <a href="/#home">Clique aqui</a> para ir para a tela inicial</p>
  `;

  container.innerHTML = template;

  return container;
};
