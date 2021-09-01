export const navigation = (path, state = {}) => {
  window.history.pushState(state, null, path);

  const popStateEvent = new PopStateEvent('popstate', { state });
  dispatchEvent(popStateEvent);
};
