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

export const configureLogin = () => {
  const ui =
    firebaseui.auth.AuthUI.getInstance() ||
    new firebaseui.auth.AuthUI(firebase.auth());
  ui.start("#firebaseui-auth-container", uiConfig());
};

