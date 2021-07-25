export default () => {
    const container = document.createElement('div')
    container.className = "telainicial"

    const template = `
        <p class="text">Hello World!</p>
    `;

    container.innerHTML = template;

    return container;
}