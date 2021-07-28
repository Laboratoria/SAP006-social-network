export default () => {
    document.querySelector('#root').innerHTML = ' ';
    const container = document.createElement('div');
    const template = `
    <link rel="stylesheet" href="./pages/Login/style.css" />

    <main class="box">

        <div id="container" class="container">

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
                <button id="signin-button" class="signin-button buttons">Entrar</button>
                <p> OU </p>
                </div>

            </section>

            <div id="firebaseui-auth-container" class="firebaseui-auth-container"></div>

            <button id="signup-button" class="signup-button buttons"> Não possui cadastro? <span>Clique aqui</span> </button>

        </div>

    </main>
    
    `;

    container.innerHTML = template;
    return container;
};

