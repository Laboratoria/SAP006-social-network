export const route = (state) => {
  window.history.pushState({}, '', state);
  const popstateEvent = new PopStateEvent('popstate', { state: {} });
  dispatchEvent(popstateEvent);
};

export const handleError = (error) => {
  // const errorEmailCadastroField = document.getElementById('textErrorEmail');
  // const errorPasswordCadastroField = document.getElementById('textErrorPassword');
  // let errorMessage = error.message;
  // switch (errorMessage) {
  //   case 'The email address is badly formatted.':
  //     errorMessage = 'Por favor, insira um email válido.';
  //     errorEmailCadastroField.innerHTML = errorMessage;
  //     break;
  //   case 'The email address is already in use by another account.':
  //     errorMessage = 'O email já está em uso por outra conta.';
  //     errorEmailCadastroField.innerHTML = errorMessage;
  //     break;
  //   case 'The password must be 6 characters long or more.':
  //     errorMessage = 'A senha deve ter 6 caracteres ou mais.';
  //     errorPasswordCadastroField.innerHTML = errorMessage;
  //     break;
  //   case 'Password should be at least 6 characters':
  //     errorMessage = 'A senha deve ter pelo menos 6 caracteres';
  //     errorPasswordCadastroField.innerHTML = errorMessage;
  //     break;

  //   default:
  //     break;
  // }
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
      errorMessage = 'Senha inválida.';
      errorEmailPasswordField.innerHTML = errorMessage;
      errorMessage = '';
      break;
    default:
      break;
  }
};
