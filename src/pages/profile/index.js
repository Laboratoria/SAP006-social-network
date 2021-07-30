export default () => {
  const profileScreenContainer = document.createElement('div');

  const profile = `
    
  <form id="signUp-form" action="/">
    <h4 class="title-createAcc">NOME</h4>
    
    <button type="submit" class="btn-login" id="btn-signUp">Cadastrar</button>
    <p id="notice"></p>
  </form>

  <span class="divider"> ou entre com </span>
  <button type="button" class="btn-google"> <span class="google-icon"></span> Google</button>
  `;
  console.log('profile');
  profileScreenContainer.innerHTML = profile;
  return profileScreenContainer;
};
