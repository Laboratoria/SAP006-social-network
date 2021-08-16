export const onNavigate = (routeRender) => {
    window.history.pushState(null, null, routeRender);
    const popStateEvent = new PopStateEvent('popstate', {});
    dispatchEvent(popStateEvent);
};