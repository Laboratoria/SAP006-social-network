export const feed = () => {
  const div = document.createElement('div');
  const content = `
        <h1> Feed </h1>
        
      `;

  div.innerHTML = content;
  return div;
};

/* firebase.auth().signOut().then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
}); */
