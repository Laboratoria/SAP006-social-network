export const getError = (error) => {
  const errors = [
    { code: 'auth/email-already-exists', message: 'Este e-mail já existe.' },
    { code: 'auth/email-already-in-use', message: 'Este email já está em uso.' },
    { code: 'auth/credential-already-in-use', message: 'Esta credencial já está em uso.' },
    { code: 'auth/wrong-password', message: 'Senha incorreta.' },
    { code: 'auth/invalid-email', message: 'Email inválido.' },
    { code: 'auth/user-not-found', message: 'Usuário não encontrado.' },
    { code: 'auth/user-disabled', message: 'Esta conta foi desativada.' },
    { code: 'auth/weak-password', message: 'Senha fraca!' },
    { code: 'auth/network-request-failed', message: 'Falha na conexão' },
    { code: 'auth/operation-not-allowed', message: 'Operação não permitida.' },
    { code: 'auth/operation-not-supported-in-this-environment', message: 'Operação não suportada.' },
    { code: 'auth/popup-blocked', message: 'A tela de popup está bloqueada.' },
  ];

  const errorResulted = errors.filter((er) => er.code.includes(error.code));
  const errorDiv = document.querySelector('#print-error-here');
  errorDiv.innerHTML = '';
  if (errorResulted.length !== 0) {
    const errorMessage = errorResulted[0].message;
    const printError = `<p class="login-error"> ${errorMessage} </p>`;
    errorDiv.innerHTML = printError;
    const containerEmail = document.querySelector('#input-email');
    const containerPassword = document.querySelector('#input-password');

    switch (true) {
      case errorResulted[0].code.includes('email'):
        containerEmail.classList.add('login-input-has-an-error');
        containerPassword.classList.remove('login-input-has-an-error');
        break;
      case errorResulted[0].code.includes('password'):
        containerPassword.classList.add('login-input-has-an-error');
        containerEmail.classList.remove('login-input-has-an-error');
        break;
      default:
        containerPassword.classList.remove('login-input-has-an-error');
        containerEmail.classList.remove('login-input-has-an-error');
        break;
    }
  } else {
    errorDiv.innerHTML = '<p> Um erro ocorreu. Tente novamente mais tarde.</p>';
  }
};
