export const Feed = () => {
  const rootElement = document.createElement("div");
  const container = `
    <div>
      <img id="background" src="./pages/login/img/paleta3.jpg" alt="">
      <div class="esmaeceHeader logotipo-text">
        <section>
          <h2>FORT FEED</h2>
        </section>
      </div> 
    </div> 
  `;
  
  rootElement.innerHTML = container;

  return rootElement;

}