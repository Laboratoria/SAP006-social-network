export default () => {
  const container = document.createElement("div");

  const template = `
    <h1> Postar nova mensagem</h1>
    <form>
    <input type="text" name="mensagem" id="mensagem" placeholder="Digite seu Email"> 
    <button id="btn-postar" type="button">Publicar</button>
    </form>
    `;
  container.innerHTML = template;

  return container;
};
