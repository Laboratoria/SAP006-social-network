export const cadastro = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `<link rel="stylesheet" href="./css/styleCadastro.css"/>
<fieldset>
<legend>Cadastro</legend>

<input type="text" id="name" placeholder="Nome">
<input type="email" id="username" placeholder="User(@maria)">
<input type="email" id="email" placeholder="seuemail@dominio.com">
<input type="tel" id="tel" placeholder="(XX)XXXXX-XXXX">
<input type="password" id="password" placeholder="Senha: mín. 6 carac. alfanuméricos">
<input type="password" id="confPass" placeholder="Confirme sua senha">
<input type="submit" id="btnRegister" value="Cadastrar">

<button type="submit" name="botao" id="entrar">ENTRAR</button>   

</fieldset>`;

  return rootElement;
}