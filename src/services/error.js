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

export const handleError = (error) => {
  const errorEmailField = document.getElementById('textErrorEmail');
  const errorPasswordField = document.getElementById('textErrorPassword');
  let errorMessage = error.message;
  switch (errorMessage) {
    case 'The email address is badly formatted.':
      errorMessage = 'Por favor, insira um email válido.';
      errorEmailField.innerHTML = errorMessage;
      errorMessage = '';
      break;
    case 'The password must be 6 characters long or more.': // || 'Password should be at least 6 characters':
      errorMessage = 'A senha deve ter 6 caracteres ou mais.';
      errorPasswordField.innerHTML = errorMessage;
      errorMessage = '';
      break;
    case 'Password should be at least 6 characters.':
      errorMessage = 'A senha deve ter pelo menos 6 caracteres';
      errorPasswordField.innerHTML = errorMessage;
      errorMessage = '';
      break;
    case 'The email address is already in use by another account.':
      errorMessage = 'O email já está cadastrado.';
      errorEmailField.innerHTML = errorMessage;
      errorMessage = '';
      break;
    default:
      break;
  }
};

export const errorGoogle = (error) => {
  const errorField = document.getElementById('error-message');
  let errorMessage = error.message;
  switch (errorMessage) {
    case 'The popup has been closed by the user before finalizing the operation.':
      errorMessage = 'Login com Google cancelado, tente novamente.';
      errorField.innerHTML = errorMessage;
      errorMessage = '';
      break;
    default:
      break;
  }
};
