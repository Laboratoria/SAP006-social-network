import { navigation } from '../../routes.js';

export const Conecte = () => {

  const template = `

  <section class="sidebar">
    <div class="content">
      <header>
        Conecte-se...
      </header>
      <section class="sidebar-paragraph">
        <p>Acompanhe mulheres incríveis e tudo o que elas têm a dizer!</p> 
      </section>

      <section class="continuebutton">
        <button class="btn-continue" id="btn-continue">Continuar</button>
      </section>

      <section class="skipbutton">
       <button class="skip">Pular</button>
      </section>
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
