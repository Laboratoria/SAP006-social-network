import profile from './index.js';

export default () => {
  const myRecipesContainer = document.createElement('div');
  const myRecipesSection = document.createElement('section');
  myRecipesContainer.append(profile());
  const myRecipesContent = `
            <aside>
              <div>
                <form>
    
                </form>
              </div>
            <aside>
    
            `;
  myRecipesSection.innerHTML = myRecipesContent;
  myRecipesContainer.append(myRecipesSection);
  return myRecipesContainer;
};
