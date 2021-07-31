export default () => {
  const FeedContainer = document.createElement('div');
  const FeedContent = `
    <img class="logo" src="image/Logotipo(1).png">
    
    <p>feeeeeddd</p>
    <button id="perfilPage">Ir para perfil</button>
    `;

  FeedContainer.innerHTML = FeedContent;

  const perfilButton = FeedContainer.querySelector('#perfilPage');
  perfilButton.addEventListener('click', () => {
    window.location.hash = '#perfil';
  });
  return FeedContainer;
};
