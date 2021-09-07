/* eslint-disable arrow-body-style */
import { cadastrarComEmailSenha, atualizarUsuario } from '../../services/firebaseAuth.js';
import { handleError } from '../../services/error.js';
import { route } from '../../routes/navigator.js';
import { uploadImage } from '../../services/firebaseData.js';

export const cadastro = () => {
  let urlImage = null;
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `<fieldset class="box">
    <legend class="titleCads"><img src="./img/cadastro.png" alt="Título: Cadastro"></legend>
    <form class="forms">
      
        <input type="text" id="nameUser" class="nameUser" placeholder="Nome">
        <p id="textErrorName"></p>
        <input type="email" id="emailUser" class="emailUser" placeholder="seuemail@dominio.com">
        <p id="textErrorEmail"></p>
      <section class="inputPhoto">
        <input class="addImgReg" id="addImg" type="file" alt="Adicionar imagem de perfil"/>
        <button class="upload" type="button" name="upload" id="upload">Salvar</button>
        <p id="textErrorImg" class="textErrorImg"></p>
        <div id="loadedImg" class="loadedImg">
        </div>
      </section>
      <section class="inputPass">
        <div class="eyeGroupPass">
          <input type="password" id="passwordRegister" class="passwordRegister" placeholder="Senha: mín. 6 carac. alfanuméricos">
          <img src="./img/eyesOpen.svg" class="seePass" id="seePass" aria-hidden="true">
          <p id="textErrorPassword" class="textErrorPassoword"></p>
        </div>
        <div class="eyeGroupPass">
          <input type="password" class="confPass" id="confPass" placeholder="Confirme sua senha">
          <img src="./img/eyesOpen.svg" id="seeConfPass" class="seeConfPass">
          <p id="textErrorConfPassword" class="textErrorConfPassoword"></p>
        </div>
      </section>
      <button class="register" type="button" name="botao" id="enter">ENTRAR</button>
    </form>
    
     
  
    <a id="buttonLogin" class="buttonLogin" href="#"> <img src="./img/login.png" alt="Entrar - Página de Login" </a>
  </fieldset>`;
  // olho para mostrar/ocultar senha
  const btnEye = rootElement.querySelector('#seePass');
  const btnConfirmEye = rootElement.querySelector('#seeConfPass');
  btnEye.addEventListener('click', () => {
    const inputSenha = rootElement.querySelector('#passwordRegister');
    inputSenha.classList.toggle('visible');
    if (inputSenha.classList.contains('visible')) {
      btnEye.src = './img/eyesClose.svg';
      inputSenha.type = 'text';
    } else {
      btnEye.src = './img/eyesOpen.svg';
      inputSenha.type = 'password';
    }
  });
  btnConfirmEye.addEventListener('click', () => {
    const inputConfirmSenha = rootElement.querySelector('#confPass');
    inputConfirmSenha.classList.toggle('visible');
    if (inputConfirmSenha.classList.contains('visible')) {
      btnConfirmEye.src = './img/eyesClose.svg';
      inputConfirmSenha.type = 'text';
    } else {
      btnConfirmEye.src = './img/eyesOpen.svg';
      inputConfirmSenha.type = 'password';
    }
  });

  // função para carregar a foto do perfil//
  const btnUploadImg = rootElement.querySelector('#upload');
  btnUploadImg.addEventListener('click', () => {
    const file = rootElement.querySelector('#addImg').files[0];
    uploadImage('profileImg', file).then((userPhoto) => {
      userPhoto.ref.getDownloadURL().then((url) => {
        urlImage = url;
        const loadedImg = rootElement.querySelector('#loadedImg');
        const img = document.createElement('img');
        img.src = urlImage;
        loadedImg.appendChild(img);
        return urlImage;
      });
    });
  });

  // funções para receber os dados de cadastro//
  const pageLogin = rootElement.querySelector('#buttonLogin');
  const enterButton = rootElement.querySelector('#enter');
  enterButton.addEventListener('click', (e) => {
    e.preventDefault();

    const nameUser = rootElement.querySelector('#nameUser').value;
    if (nameUser === '' || nameUser.length < 3) {
      const errorNameField = document.getElementById('textErrorName');
      errorNameField.innerHTML = 'Preencha campo NOME corretamente';
      nameUser.focus();
      return false;
    }

    const emailUser = rootElement.querySelector('#emailUser').value;
    if (emailUser === '' || emailUser.indexOf('@') === -1 || emailUser.indexOf('.') === -1) {
      const errorEmailField = document.getElementById('textErrorEmail');
      errorEmailField.innerHTML = 'Preencha campo E-MAIL corretamente';
      emailUser.focus();
      return false;
    }

    // if (urlImage === null) {
    //   const errorImgField = document.getElementById('textErrorImg');
    //   errorImgField.innerHTML = 'Precisamos da sua foto.';
    // }

    const passwordRegister = rootElement.querySelector('#passwordRegister').value;
    const passwordConfirm = rootElement.querySelector('#confPass').value;
    if (passwordRegister.length < 6 || passwordRegister.match(/[0-9]/g) == null) {
      const errorPasswordField = document.getElementById('textErrorPassword');
      errorPasswordField.innerHTML = 'A senha precisa ter pelo menos 6 dígitos, com pelo menos um número';
    }
    if (passwordRegister !== passwordConfirm) {
      document.getElementById('textErrorConfPassword').innerHTML = 'Senha não confere';
    }

    cadastrarComEmailSenha(emailUser, passwordRegister)
      .then(() => {
        // const user = userCredential.user;
        atualizarUsuario(nameUser, urlImage)
          .then(() => {
            route('/home');
          });
      })

      .catch((handleError));
    return false;
  });
  pageLogin.addEventListener('click', (e) => {
    e.preventDefault();
    route('/login');
  });
  return rootElement;
};
