export default () => {
    document.querySelector('#root').innerHTML = ' ';
    const container = document.createElement('div');
    const template = `
    <main class="box">

        <div id="login-container">

            <div class="banner">
                <img src="assets/logo.png" alt="Logo">
                <div class="title-container">
                    <h1 class="title">SeriesDay</h1>
                    <h3 class="subtitle">review de séries</h3>
                </div>
            </div>

            <section>
                <form class="form">
                <input class="input" id="email" type="email" autocomplete="on" placeholder="E-mail" required>
                <input class="input" id="password" type="password" autocomplete="on" placeholder="Senha" required>
                <p id= "nonUser"></p>
                </form>

                <div class="signin">
                <button id="signin-button" class="login-buttons">Entrar</button>
                <p> OU </p>
                </div>

            </section>

            <button id="signup-button" class="login-buttons"> Não possui cadastro? <span>Clique aqui</span> </button>

        </div>

    </main>
    `;

    container.innerHTML = template;
    return container;
};

