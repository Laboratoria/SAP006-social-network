export const postar = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = ` 
    <div class="containerPost">
    <header>
      <div class="menu">
      <input type="checkbox" id="checkbox-menu">
  
      <label for="checkbox-menu">
        <span></span>
        <span></span>
        <span></span>
      </label>
      </div>
    </div>
  `;
  return rootElement;
};
