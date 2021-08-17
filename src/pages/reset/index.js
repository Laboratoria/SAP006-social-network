import { headerMenu } from '../../components/header/index.js';
import { resetPassword } from '../../services/index.js';

export const Reset = () => {
  headerMenu();
  const root = document.createElement('div');
  root.innerHTML = `
  <header class='logo'>
    <h1>>A Bordo</h1>
    <h2>A Rede Social dos Velejadores</h2>
  </header>
  <main class='container'>  
    <section class='img-container'>
    </section>    
    <section id='login' class='login-container'>
      <header class='form-options'>
        Recuperação de Senha
      </header>
      <section class='form-container'>
        <form>
          <div class='form-fields'>
            <label for='email'>E-mail</label>
            <input id='email' type='e-mail' class='input-email'>
              
            <button type='button' id='buttonReset' class='btn-login btn form-item'>Enviar</button>
          </div>  
        </form>
      </section>
    </section>
  </main>
  `;

  const btnReset = root.querySelector('#buttonReset');
  btnReset.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    resetPassword(email);
  });

  return root;
};
