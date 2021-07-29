export const home = () => {
    const container = document.createElement('div');
    const template = `
        <h2>Página inicial</h2>
        `;
    container.innerHTML = template;
    return container;
};
