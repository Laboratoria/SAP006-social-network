
export const signUp = () => {
    const divRoot = document.createElement('div');
    //divRoot.className = 'area-signup'

    const container = `
    <div>
    <form class="form-register">
    <label class="value-register" for="name"></label>
    <input class="value-register" type="text" name="user-name" id="username">

    <label class="value-register" for="email"></label>
    <input class="value-register" type="text" name="adress-email" id="useremail">

    <label class="value-register" for="password"></label>
    <input class="value-register" type="text" name="user-password" id="userpassword">

    <label class="value-register" for="confirm-password"></label>
    <input class="value-register" type="text" name="confirm-user-password" id="user-confirm-password">

    <label class="value-register" for="telephone"></label>
    <input class="value-register" type="text" name="user-telephone" id="usertelephone">

    <button id="btn-signup">Cadastrar</button>
    </form>

    <p>Já tem uma conta? Faça seu login aqui</p>

    </div>
    `


    divRoot.innerHTML = container;
/*






    const nameUser = document.querySelector('#username');
    const emailUser = document.querySelector('#useremail');
    const passwordUser = document.querySelector('#userpassword');
    const confirmpassword = document.querySelector('#user-confirm-password');
    const telephoneUser = document.querySelector('#usertelephone');

    btn-signup.addEventListener('click', (event) => {
        event.preventDefault();
        const valueName = nameUser.value;
        const valueEmail = emailUser.value;
        const valuePassword = passwordUser.value;
        const valueConfirm = confirmpassword.value;
        const valueTel = telephoneUser.value;
        
        // aqui vem a função que vai criar a conta do usuário
    })
*/
return divRoot
}