export default () => {
  const feedConteiner = document.createElement('div');
  const feedContent = `
    <img class="logo" src="image/Logotipo(1).png">
    
    <p>feeeeeddd</p>
    <button id="perfilPage">Ir para perfil</button>
    `;

  feedConteiner.innerHTML = feedContent;

  const perfilButton = feedConteiner.querySelector('#perfilPage');
  perfilButton.addEventListener('click', () => {
    window.location.hash = '#profile';
  });
  return feedConteiner;
};
