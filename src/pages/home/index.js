export default () => {
    const container = document.createElement("div");
  
    const template = `
    <center>
    <h1>Ellas</h1>
    <p>Aqui você encontra uma filmografia repleta de mulheres incríveis para te inspirar!</p>
    
    <img src="imagens/wonder.jpg"
    widht="450px">
    </center>
    `;
  
    container.innerHTML = template;
  
    return container;
  }