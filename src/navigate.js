
export const onNavigate = (route) => {
    window.history.pushState(null, null, route);
    const popStateEvent = new PopStateEvent('popstate', {});
    dispatchEvent(popStateEvent);
  };