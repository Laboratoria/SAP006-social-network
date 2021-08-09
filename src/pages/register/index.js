export default () => {
  const container = document.createElement('div');

  const template = `
  <img src="" alt="" class="logo">
    <h2 class="title">Cadastrar</h2>
      <form class="form-register" action="">
        <label for="get-full-name" class="label-register">Nome completo</label><br>
        <input type="text" name="name" id="full-name" class="input-register"><br>
        <label for="get-email" class="label-register">Email</label><br>
        <input type="text" name="email" id="email-user" class="input-register"><br>
        <label for="get-password" class="label-register">Senha</label><br>
        <input type="text" name="password" id="password-user">
      </form> 
      <div class="button">
        <input type="image"  src="img/google logo.png"><br>
        <button class="register-button">Cadastrar</button>  
      </div>
  `;

  container.innerHTML = template;

  return container;
};
