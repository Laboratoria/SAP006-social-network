const firebaseErrors = {
  'auth/invalid-email': 'O endereço de e-mail está mal formatado.',
  'auth/email-already-in-use': 'O endereço de e-mail já está em uso por outra conta.',
  'auth/wrong-password': 'Senha incorreta.',
  'auth/weak-password': 'A senha deve ter 6 caracteres ou mais.',
  'auth/user-not-found': 'Não há nenhum registro de usuário correspondente a este identificador. O usuário pode ter sido excluído.',
  'auth/invalid-user-token': 'A credencial do usuário não é mais válida. O usuário deve entrar novamente',
  'auth/invalid-auth-event': 'Ocorreu um erro interno',
  'auth/cancelled-popup-request': 'Esta operação foi cancelada devido a outro popup conflitante sendo aberto.',
  'auth/network-request-failed': 'Ocorreu um erro na rede (como timeout, conexão interrompida ou host inalcançável).',
};

function printError(message) {
  const element = document.createElement('p');
  element.innerHTML = message;
  const errors = document.querySelector('.errors');
  errors.innerHTML = '';
  errors.appendChild(element);
}

export const getError = (errorCode) => {
  const error = errorCode.code;
  const errorMessage = firebaseErrors[error];
  if (errorMessage) {
    printError(errorMessage);
  } else {
    // eslint-disable-next-line no-alert
    window.alert('ocorreu um erro', error);
  }
};
