export const signup = () => {
    const container = document.createElement('div');
    const template = `
        <div class="signUp-container">
        <h2>Crie sua conta</h2>
        <input type="text" placeholder="Nome" id="name">
        <input type="text" placeholder="Email" id="email">
        <input type="text" placeholder="Senha"id="new-password">
        <input type="text" placeholder="Confirmar Senha"id="password">
        <a class="button" id="login" href="/home" >Cadastrar</a>
        <span>ou</span>
        <a class="google-btn" id="google-btn" href="/googlelogin">Continuar com o Google</a>
        <p class="text">Já tem uma conta?</p>
        <a class="button" id="login" href="/">Entrar</a>
        </div>
        `;
    container.innerHTML = template;
    return container;
};
