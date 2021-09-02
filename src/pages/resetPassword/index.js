import { resetPassword } from '../../services/index.js';
import errorModal from '../../components/error/index.js';

export default () => {
  const resetPasswordContainer = document.createElement('div');
  resetPasswordContainer.setAttribute('class', 'screenContainerBody');

  const resetPasswordContent = `
  <div class="div-width90 flexRowReverse">
    <img class="logo" src="image/logotipo.png">
    
    <form id="forgotPassword-form" class="initialForm">
      <h1 class="title resetPassword-title">Redefinir Senha</h1>
      
      <label for="resetPassword-email"> Email </label>      
      <input id="resetPassword-email" type="email" class="signIn-input" placeholder="your@email.com" required>
      
      <button type="button" id="btn-resetPassword" class="btn-login">Enviar e-mail</button>
      <div class="notice"></div>
      
    </form>

    <div class="overlay"></div>
  </div>
  `;

  resetPasswordContainer.innerHTML = resetPasswordContent;
  const notice = resetPasswordContainer.querySelector('.notice');
  const overlay = resetPasswordContainer.querySelector('.overlay');
  const mailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  function sendResetPasswordEmail() {
    const resetPasswordEmail = resetPasswordContainer.querySelector('#resetPassword-email').value;

    if (resetPasswordEmail === '' || mailFormat.test(resetPasswordEmail) === false) {
      notice.innerHTML = `
      <span class="material-icons">error</span>
      <p>Escreva um email válido</p>
      `;
    } else {
      resetPassword(resetPasswordEmail)
        .then(() => {
          notice.innerHTML = `
          <span class="material-icons"> email </span>
          <p> Verifique sua caixa de entrada </p>
          <a href="#" class="ancor"> Fazer Login </a>
          `;
        })
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            notice.innerHTML = `
            <span class="material-icons">error</span>
            <p> Usuário não encontrado! </p>
            <a href="#signUp" class="ancor"> Cadastre-se aqui </a>
            `;
          } else {
            overlay.classList.add('active');
            resetPasswordContainer.append(errorModal());
            throw new Error(error);
          }
        });
    }
  }
  const sendEmailBtn = resetPasswordContainer.querySelector('#btn-resetPassword');
  sendEmailBtn.addEventListener('click', sendResetPasswordEmail);

  return resetPasswordContainer;
};
