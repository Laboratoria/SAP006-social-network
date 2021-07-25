export default () => {
    const container = document.createElement('form')
    container.className = "register"

    const template = `
        <input type="email" class="email" placeholder="Email" autocomplete="off">
        <input type="email" class="email" id="newemail" placeholder="Confirmar email" autocomplete="off">
        <input type="password" class="password" placeholder="Senha" autocomplete="off">
        <input type="password" class="password" id="newpass" placeholder="Confirmar senha" autocomplete="off">
    `;

    container.innerHTML = template;

    return container;
}