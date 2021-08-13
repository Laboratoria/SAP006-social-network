export default () => {
  const footerContainer = document.createElement('div');

  const footerContent = `
  <footer></footer>
  `;
  footerContainer.innerHTML += footerContent;
  return footerContainer;
};
