import { navigation } from '../../routes.js';

export const Conecte = () => {

  const template = `

  <section class="slider-content">
    <div class="slide">
      <header>
        Conecte-se...
      </header>
      <main class="content">
        <p>Acompanhe mulheres incríveis e tudo o que elas têm a dizer!</p> 
        <button class="btn-continue">Continuar</button>
        <button class="skip">PULAR</button>
      </main>
    </div>
  </section>

`

const rootElement = document.createElement('div')
rootElement.setAttribute('class', 'container')
rootElement.innerHTML = template;

const continueBtn = rootElement.querySelector('.btn-continue')
continueBtn.addEventListener('click', (event) => {
  event.preventDefault()
  navigation('/comunique');
});

const skipBtn = rootElement.querySelector('.skip')
skipBtn.addEventListener('click', () => {
  navigation('/login');
})

  return rootElement;
} 
