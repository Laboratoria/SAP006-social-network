export const handleError = () => {
  //   if (error.code) {
  //     switch (error.code) {
  //       default 'auth/account-exists-with-different-credential':
  //         alert('Você já possui uma conta!');
  //         break;
  // :
  //       case 'auth/credential-already-in-use'
  //                 || errorCode === 'auth/account-exists-with-different-credential'
  //                 || email === 'auth/credential-already-in-use'
  //                 || email === 'auth/email-already-in-use'
  //                 || credential === 'auth/credential-already-in-use'
  //                 || credential === 'auth/email-already-in-use'

  //     }
  //   }
};

export const errorPassword = (error) => {
  const errorEmailPasswordField = document.getElementById('textErrorEmailPassword');
  let errorMessage = error.message;
  switch (errorMessage) {
    case 'There is no user record corresponding to this identifier. The user may have been deleted.':
      errorMessage = 'Usuário não encontrado. Verifique seus dados.';
      errorEmailPasswordField.innerHTML = errorMessage;
      errorMessage = '';
      break;
    case 'The email address is badly formatted.':
      errorMessage = 'Insira um email válido.';
      errorEmailPasswordField.innerHTML = errorMessage;
      errorMessage = '';
      break;
    case 'The password is invalid or the user does not have a password.':
      errorMessage = 'E-mail ou senha inválidos. Verifique-os.';
      errorEmailPasswordField.innerHTML = errorMessage;
      // errorMessage = '';
      break;
    default:
      break;
  }
};
