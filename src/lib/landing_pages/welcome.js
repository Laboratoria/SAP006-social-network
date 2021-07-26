// aqui você exportará as funções que precisa
export const Welcome = () => {

  const template = `
<div class="esmaece">
  <section class="logotipo">
    <img src="./img/logo.png" alt="Logotipo do Fort" class="logoimg">
  </section>
</div>



  <section class="slider-content">
    <div class="slide">
      <header>
        Bem-vinda, mulher!
      </header>
      <section class="content">
        <p>Fort é uma rede social exclusiva para mulheres!</p> 
        <button class="btn-continue" id="btn-continue">Continuar</button>
        <button class="skip">Pular</button>
      </section>

    </div>   
  </section>

`
  const rootElement = document.createElement('div')
  rootElement.setAttribute('class', 'container')
  rootElement.innerHTML = template;

  const continueBtn = rootElement.querySelector('.btn-continue')
  continueBtn.addEventListener('click', () => {
    window.history.pushState({}, null, '/conecte')

    const popStateEvent = new PopStateEvent("popstate", {state:{}})
    dispatchEvent(popStateEvent)
  });

  const skipBtn = rootElement.querySelector('.skip')
  skipBtn.addEventListener('click', (event) => {
    event.preventDefault()
    window.history.pushState({}, null, '/login')

    const popStateEvent = new PopStateEvent("popstate", {state:{}})
    dispatchEvent(popStateEvent)
  })
  
  return rootElement;
} 