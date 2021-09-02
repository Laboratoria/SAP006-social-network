export default () => {
  const footerContainer = document.createElement('footer');

  const footerContent = `
  <p>Desenvolvido por:</p>
  <a href="https://github.com/Tauana-Pacheco" target="_blank">Tauana<i class="fab fa-github"></i></a>
  <a href="https://github.com/Thais-F" target="_blank">Thaís<i class="fab fa-github"></i></a>
  <a href="https://github.com/yukaum" target="_blank">Yuki<i class="fab fa-github"></i></a>
  `;
  footerContainer.innerHTML += footerContent;
  return footerContainer;
};
