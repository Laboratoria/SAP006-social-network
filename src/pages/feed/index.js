export default () => {
  const container = document.createElement('div');

  const template = `
  <img src="" alt="" class="logo">
  
  <p>feed</p>
  `;

  container.innerHTML = template;

  return container;
};
