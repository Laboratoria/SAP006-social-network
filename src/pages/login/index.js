// import { loginWithEmailAndPassword, loginWithGoogleAccount } from '../../lib/authentication.js';
import { onNavigate } from '../../navigate.js';

export const login = () => {
    const roottemplate = document.createElement('section');

    const container = `
   
<section class="container">
    <section class="box">
        
    <figure class="logo">
    <img src="./img/ellas-dev-logo.png">

    </figure>
        <h3 class="">Login</h3>

        <section class="box-input">
            <input type="email" id="user-email" name="usuario" placeholder="e-mail">
        </section>

        <section class="box-input">
            <input type="password" id="user-password" placeholder="senha">
        </section>
        <!--     <a href=''>Esqueci minha senha</a> -->
        <section class="justify-center">
          <button id="login-btn">Entrar</button>
          <p>OU</p>
          <button id="google-btn">Entrar com Google</button>
          <hr>
        </section>

        <p> Não tem uma conta?
            <a href=""> Cadastre-se </a>
        </p>
    </section>
</section>

`;
    roottemplate.innerHTML = container;

   


roottemplate.querySelector('#login-btn')
    .addEventListener('click', (event) => {
        event.preventDefault();
        const inputEmail = document.querySelector('user-email');
        const inputPassword = document.querySelector('user-password');
        loginWithEmailAndPassword(inputEmail.value, inputPassword.value);
    });

// roottemplate.querySelector('#google-btn')
//     .addEventListener('click', (event) => {
//         event.preventDefault();
//         loginWithGoogleAccount();
//     });

// roottemplate.querySelector('#btn-signup')
//     .addEventListener('click', (event) => {
//         event.preventDefault();
//         onNavigate('/signup');
//     });

return roottemplate;
};