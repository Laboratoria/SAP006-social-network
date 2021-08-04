export const route = (state) => {
  window.history.pushState({}, '', state);
  const popstateEvent = new PopStateEvent('popstate', { state: { } });
  dispatchEvent(popstateEvent);
};

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
