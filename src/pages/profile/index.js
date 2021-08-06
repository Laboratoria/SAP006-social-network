import header from '../../components/header/index.js';

export default () => {
  const perfilContainer = document.createElement('div');
  perfilContainer.append(header());
  const perfilContent = `
    <img class="logo" src="image/Logotipo(1).png">
    
    <p>perfilllll</p>
    `;
  perfilContainer.innerHTML += perfilContent;
  return perfilContainer;
};
