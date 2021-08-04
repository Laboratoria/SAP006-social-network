import { navigation } from '../../routes.js';

export const Comunique = () => {

  const template = `

  <section class="slider-content"> 
    <div class="slide">
      <header>
        Comunique-se...
      </header>
      <main class="content">
        <p>Compartilhe suas opiniões, vivências e o que mais der na telha, sem medo de ser julgada!</p> 
        <button class="btn-continue">Continuar</button>

      </main>
    </div>  

  </section>

`

  const rootElement = document.createElement('div')
  rootElement.setAttribute('class', 'container')
  rootElement.innerHTML = template;

  const continueBtn = rootElement.querySelector('.btn-continue')
  continueBtn.addEventListener('click', () => {
    navigation('/login');
  });  

  return rootElement;
} 