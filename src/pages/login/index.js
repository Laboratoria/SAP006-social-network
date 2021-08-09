export default () => {
  const container = document.createElement('div');

  const template = `
  <img src="" alt="" class="logo">
    <h2 class="title">Login</h2>
      <form class="form-login" action="">
        <label for="get-email" class="label-login">Email</label><br>
        <input type="text" name="email" id="email-user" class="input-login"><br>
        <label for="get-password" class="label-login">Senha</label><br>
        <input type="text" name="password" id="password-user">
      </form> 
      <div class="button">
        <input type='image'  src='img/google logo.png'><br>
        <button class="login-button">Login</button>  
      </div>
  `;

  container.innerHTML = template;

  return container;
};
