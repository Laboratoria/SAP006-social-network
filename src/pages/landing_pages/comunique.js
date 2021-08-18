import { navigation } from '../../navigation.js';

export const Comunique = () => {
  const template = `

  <section class="sidebar"> 
    <div class="content">
      <header>
        Comunique-se...
      </header>
      <section class="sidebar-paragraph">
        <p>Compartilhe suas opiniões, vivências e o que mais der na telha, sem medo de ser julgada!</p> 
      </section>

      <section class="continuebutton">
        <button class="btn-continue" id="btn-continue">Continuar</button>
      </section>

      <section class="skipbutton">
       <button class="skip">Pular</button>
      </section>
    </div>  

  </section>
`;

  const rootElement = document.createElement('div');
  rootElement.setAttribute('class', 'container');
  rootElement.innerHTML = template;

  const continueBtn = rootElement.querySelector('.btn-continue');
  continueBtn.addEventListener('click', () => {
    navigation('/login');
  });

  return rootElement;
};