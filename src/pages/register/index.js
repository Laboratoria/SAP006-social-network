import { createUser } from '../../services/index.js';

export default () => {
  const container = document.createElement('div');

  const template = `
  <img src="" alt="" class="logo">
    <h2 class="title">Cadastrar</h2>
      <form class="form-register" action="">
        <label for="get-full-name" id="labelName" class="label-register">Nome completo</label><br>
        <input type="text" name="name" id="fullName" class="input-register"><br>
        <label for="get-email" id="labelEmail" class="label-register">Email</label><br>
        <input type="text" name="email" id="emailUser" class="input-register"><br>
        <label for="get-password" id="labelPassword" class="label-register">Senha</label><br>
        <input type="password" name="password" id="passwordUser">
        <i class="fa fa-eye" aria-hidden="true"></i><br>
          
      </form>

      <div id='msgError'></div>
      <div id='msgSuccess'></div>

      <div class="button">
        <a href="/#login">
          <button id="verSenha" class="register-button">Cadastrar</button>
        </a>  
      </div>
      
  `;

  container.innerHTML = template;

const btn = container.querySelector('#verSenha')

const fullName = container.querySelector('#fullName')
const labelName = container.querySelector('#labelName')
const validName = false

const emailUser = container.querySelector('#emailUser')
const labelEmail = container.querySelector('#labelEmail')
const validEmail = false

const passwordUser = container.querySelector('#passwordUser')
const labelPassword = container.querySelector('#labelPassword')
const validPassword = false


//let msgError = document.querySelector('#msgError')
//let msgSuccess = document.querySelector('#msgSuccess')

fullName.addEventListener('click', () => {
  if(fullName.value.length <= 2){
    labelName.setAttribute('style', 'color: red')
    labelName.innerHTML = 'Nome *Insira no minimo 3 caracteres'
    fullName.setAttribute('style', 'border-color: red')
    validName = false
  } else {
    labelName.setAttribute('style', 'color: green')
    labelName.innerHTML = 'Nome'
    fullName.setAttribute('style', 'border-color: green')
    validName = true
  }
})

emailUser.addEventListener('click', () => {
  if(emailUser.value.length <= 6){
    labelEmail.setAttribute('style', 'color: red')
    labelEmail.innerHTML = 'Email *Insira no minimo 5 caracteres'
    emailUser.setAttribute('style', 'border-color: red')
    validEmail = false
  } else {
    labelEmail.setAttribute('style', 'color: green')
    labelEmail.innerHTML = 'Email'
    emailUser.setAttribute('style', 'border-color: green')
    validEmail = true
  }
})

passwordUser.addEventListener('click', () => {
  if(passwordUser.value.length <= 5){
    labelPassword.setAttribute('style', 'color: red')
    labelPassword.innerHTML = 'Senha *Insira no minimo 6 caracteres'
    passwordUser.setAttribute('style', 'border-color: red')
    validSenha = false
  } else {
    labelPassword.setAttribute('style', 'color: green')
    labelPassword.innerHTML = 'Senha'
    passwordUser.setAttribute('style', 'border-color: green')
    validPassword = true
  }
})

/*function register(){
  if(validName && validEmail && validPassword){
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')
    
    listaUser.push(
    {
      nomeCad: fullName.value,
      emailCad: emailUser.value,
      senhaCad: passwordUser.value
    }
    )
    
    localStorage.setItem('listaUser', JSON.stringify(listaUser))
    
   
    msgSuccess.setAttribute('style', 'display: block')
    msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>'
    msgError.setAttribute('style', 'display: none')
    msgError.innerHTML = ''
    
    setTimeout(()=>{
        window.location.href = 'https://cdpn.io/Souto-Nogueira/debug/wvdVgdo/dGrXWjqLvKeM'
    }, 3000)
  
    
  } else {
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
    msgSuccess.innerHTML = ''
    msgSuccess.setAttribute('style', 'display: none')
  }
}*/

btn.addEventListener('click', (event) => {
  event.preventDefault();
  createUser(emailUser.value, passwordUser.value);
});
/*btn.addEventListener('click', ()=>{
  let inputSenha = document.querySelector('#passwordUser')
  
  if(inputSenha.getAttribute('type') == 'password'){
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})*/

  return container;
};

