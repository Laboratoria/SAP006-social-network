// Configurando as autenticações
function uiConfig() {
  return {
    signInFlow: "popup",
    signInSuccessUrl: "#timeline",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
  };
}

// Boas vindas para o usuário logado
export const removeLogin = () => {
  console.log(`Que bom ver você ${firebase.auth().currentUser.displayName}`);
  document.querySelector("#firebaseui-auth-container").innerHTML = " ";
};

export const configureLogin = () => {
  const ui =
    firebaseui.auth.AuthUI.getInstance() ||
    new firebaseui.auth.AuthUI(firebase.auth());
  ui.start("#firebaseui-auth-container", uiConfig());
};
