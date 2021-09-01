export default() => {
    const contrainer = document.createElement("div");

    const template = `
    <h2>petlove</h2>
    <p>um site para pets repleta de animais incriveis</p>
    <link rel= stylesheet" href="style.css">
    <div class=container">
    <div class="card">
        <h2>fazer login :</h2>
        <input type="text" id="usuário" placeholder="">
        <label for="usuário"</label>
        < form method='post'>
        <input required="" autocomplete="off" type='email' placeholder='Email'
        <input required="" autocomplete="off" type='password' placeholder='Senha'
        </form>
        <buton class='button-area sigIn' id='start'>Entrar</button>
        <p class="or-area"> ou </p>
        <button class= 'button-area btn btnGoogle'><img src='imagens/google_small_id</button>
        
    </div>  
        `;
    contrainer.innerHTML = template;

    return contrainer;
}