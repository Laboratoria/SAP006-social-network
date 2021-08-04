export const navigation = (path) => {
    window.history.pushState({}, null, path);
  
    const popStateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popStateEvent);
  };