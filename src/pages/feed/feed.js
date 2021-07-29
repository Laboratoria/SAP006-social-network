export default () => {
  const FeedContainer = document.createElement('div');
  const FeedContent = `
    <img class="logo" src="image/Logotipo(1).png">
    
    <p>feeeeeddd</p>
    `;

  FeedContainer.innerHTML = FeedContent;

  return FeedContainer;
};
