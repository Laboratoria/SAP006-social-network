export const navigation = (path) => {
  window.history.pushState({}, null, path);

  const popStateEvent = new PopStateEvent('popstate', { state: {} });
  dispatchEvent(popStateEvent);
};

const validateIfUserIsLogged = () => {
  const userId = localStorage.getItem('uid');
  if (userId !== null) {
    navigation('/feed');
  } else {
    navigation('/welcome');
  }
};

validateIfUserIsLogged();
