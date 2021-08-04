<<<<<<< HEAD
import { navigation } from "../../routes.js";

=======
import { navigation } from "../../navigation.js";
>>>>>>> acbd7da473a454dce98a36c5cc7fc294841dc131
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
