import profile from './index.js';

export default () => {
  const myRecipesContainer = document.createElement('div');
  myRecipesContainer.append(profile());
  const myRecipesContent = `
            <aside>
              <div>
                <form>
    
                </form>
              </div>
            <aside>
    
            `;
  myRecipesContainer.innerHTML += myRecipesContent;
  return myRecipesContainer;
};
