import { onNavigate } from '../../navigate.js';

export const signUp = () => {
    const roottemplate = document.createElement('section');

    const container = `
   
<section class="container">
    <form class="box">
        <h1 class="">Cadastre-se</h1>

        <section class="box-input">
            <input type="email" id="user-email" name="usuario" placeholder="e-mail">
        </section>
<section class="box-input">
            <input type="email" id="user-email-confirma" name="confirmaUsuario" placeholder="confirme seu e-mail">
        </section>
        <section class="box-input">
            <input type="password" id="user-password" placeholder="senha">
        </section>
        <section class="box-input">
            <input type="password" id="user-password-confirma" placeholder="confirme sua senha">
        </section>
        <section class="justify-center">
      <button id="btn-signup">Enviar</button>
            <hr>
        </section>
        <p> Já tem uma conta?
            <a id="login-btn" href="">  Login  </a>
        </p>
    </form>
</section>

`;

    roottemplate.innerHTML = container;

    roottemplate.querySelector('#btn-signup')
        .addEventListener('click', (event) => {
            event.preventDefault();
            onNavigate(signUp);
        });


    roottemplate.querySelector('#login-btn')
        .addEventListener('click', (event) => {
            event.preventDefault();
            const inputEmail = document.querySelector('user-email');
            const inputPassword = document.querySelector('user-password');
            loginWithEmailAndPassword(inputEmail.value, inputPassword.value);
        });

    const loginButton = roottemplate.querySelector('#login-btn');
    loginButton.addEventListener('click', () => onNavigate('login'));
    
    return roottemplate;

};

