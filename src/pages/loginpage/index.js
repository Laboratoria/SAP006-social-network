export default () => {
    const container = document.createElement('form')
    container.className = "login"

    const template = `
        <div class="logo"></div>
        <p class="text">Uma rede desenvolvida para donos e amantes de animais</p>
        <input type="email" class="email" id="emailogin" placeholder="Email" autocomplete="off">
        <input type="password" class="password" id="passlogin" placeholder="Senha" autocomplete="off">
        
    `;

    container.innerHTML = template;

    return container;
}

