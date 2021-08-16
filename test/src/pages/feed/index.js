import { onNavigate } from '../../navigate.js';

export const signUp = () => {
    const rootTemplate = document.createElement('section');

    const container = `
    <section class="container">
    </section>
    `;

    rootTemplate.innerHTML = container;

    return rootTemplate;

};

