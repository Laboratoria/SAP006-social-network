export const navagation = (route) => {
  window.history.pushState({}, "", route);
  const popState = new PopStateEvent("popState", { state: {} });
  dispatchEvent(popState);
};
