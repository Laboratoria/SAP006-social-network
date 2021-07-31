export default () => {
  const perfilContainer = document.createElement('div');
  const perfilContent = `
        <img class="logo" src="image/Logotipo(1).png">
        
        <p>perfilllll</p>
        `;
  perfilContainer.innerHTML = perfilContent;
  return perfilContainer;
};
