
export const home = () => {
    const container = document.createElement('div');
    container.className = 'container';
    const template = `
      <h2>Página inicial</h2>
   `;
    container.innerHTML = template;
    return container;
  };
