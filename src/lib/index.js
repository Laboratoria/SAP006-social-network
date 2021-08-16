// aqui você exportará as funções que precisa

export const myFunction = () => {
  const container = document.createElement("div");

  const template = `
  <h2>Ellas</h2>
  <p>Aqui você encontra uma filmografia repleta de mulheres incríveis para te inspirar!</p>

  `;

  container.innerHTML = template;

  return container;
}