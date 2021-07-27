export default () => {
    document.querySelector('#root').innerHTML = ' ';
    const container = document.createElement('div');
    const template = `
      <main id="box">
          <div class="divlogo">
              <img src="assets/logo.png" alt="Logo">
              <h1>SeriesDay</h1>
              <h3>review de séries</h3>
          </div>
          <section>
              <form class="form-log">
                  <input class="input" id="name" type="name" autocomplete="on" placeholder="Nome Completo" required>
                  <input class="input" id="email" type="email" autocomplete="on" placeholder="E-mail" required>
                  <input class="input" id="password" type="password" autocomplete="on" placeholder="Senha" required>
                  <input class="input" id="password-Confirm" type="password-Confirm" autocomplete="on" placeholder="Confirmar Senha" required>
                  <p id= "nonUser"></p>
              </form>
              <div>
                  <button id="signup-button-register" class="login-buttons-register button">Cadastrar-se</button>
              </div>
              <input id="gobackButton" type="image" class="goback-button" src="./assets/seta.png" />
          </section>
      </main>
    `;
    
    container.innerHTML = template;
    return container;
  };