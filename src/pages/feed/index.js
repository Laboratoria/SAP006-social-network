export const Feed = () => {
    const rootElement = document.createElement("div");
    const container = `
        <div>
            <img id="background" src="./pages/login/img/paleta3.jpg" alt="">
            <div class="esmaeceHeader logotipo-text">
                <section>
                <h2>FORT FEED</h2>
            </div> 

            <section class="post">
                <form action="" id="published-form">
                <input type="text" id="text-post" placeholder="Mana, o que você quer compatilhar?">
                <button id="send-post">Enviar</button>
                </form>
            </section>
        </div> 
    `;

    rootElement.innerHTML = container;

    rootElement.querySelector('#published-form').addEventListener('submit', event => {
        event.preventDefault();
        const text = rootElement.querySelector('#text-post').value; 
        console.log(text);
    })



    rootElement.querySelector('send-post')

    return rootElement;


    const dataPost = () => {
        
    }
}