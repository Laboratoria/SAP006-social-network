export const navigateTo = (url, page) => {
  history.pushState(null, null, url);
  const main = document.getElementById('root');
  main.innerHTML=""
  main.appendChild(page)
}
