// aqui você exportará as funções que precisa
export const landingPage = () => {
  const container = document.createElement('div');

  const template = `
    <div class="container">

      <div class="logo">
        <img src="./img" alt="Logotipo do Fort" class="logo">
      </div>

      <section class="welcome">
        <header class="title">
          Bem-vinda, mulher!
        </header>
        <main class="content">
          <div class="phrase">
            <p>Fort é uma rede social exclusiva para mulheres!</p> 
          </div>
          <button class="continue">Continuar</button>
        </main>
        <button class="skip">PULAR</button>
      </section>

  </div>
`
  container.innerHTML = template;

  return container;
} 

// export const myFunction = () => {
//   // aqui vai seu código
//   console.log('Olá mundo!');
// };