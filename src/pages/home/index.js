export default () => {
  const container = document.createElement("div");

  const template = `
    <body>
    <header>
      <nav>
        <h1>Ellas</h1>
      </nav>
      <div>
        <h2>
          Aqui você encontra uma filmografia repleta de mulheres incríveis para
          te inspirar!
        </h2>
      </div>
    </header>
    <div>
      <nav>
        <ul>
          <li>
            <a href="/#login">Login</a>
          </li>
          <li>
            <a href="/#cadastre-se">Cadastre-se</a>
          </li>
        </ul>
      </nav>
    </div>
  </body>
    
  
    `;

  container.innerHTML = template;

  return container;
};
