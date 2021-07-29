export const home = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `<link rel="stylesheet" href="./css/style.css"/>
<fieldset>
<legend>Cadastro</legend>

<input type="text" id="name" placeholder="feed">
<input type="email" id="username" placeholder="feed">
<input type="email" id="email" placeholder="feed">
<input type="tel" id="tel" placeholder="feed">
<input type="password" id="password" placeholder="feed">
<input type="password" id="confPass" placeholder="feed">
<input type="submit" id="btnRegister" value="feed">

<button type="submit" name="botao" id="entrar">feed</button>   
<h1> deu certooooooooooooo home rotas! </h1>

</fieldset>`;

  return rootElement;
}