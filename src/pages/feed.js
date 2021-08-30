export const feed = () => {
  const div = document.createElement('div');
  const content = `
        <h1> Feed </h1>
        
      `;

  div.innerHTML = content;
  return div;
};
