<img src="./src/img/logo.png">

# Fort - Uma rede social tão segura quanto um forte!

## Índice

- [Fort - Uma rede social tão segura quanto um forte!](#fort---uma-rede-social-tão-segura-quanto-um-forte)
  - [Índice](#índice)
  - [1. Sobre o projeto 💻](#1-sobre-o-projeto-)
  - [2. Histórias de usuário 📃](#2-histórias-de-usuário-)
    - [**História de Usuário 1**](#história-de-usuário-1)
    - [**História de usuário 2**](#história-de-usuário-2)
    - [**História de usuário 3**](#história-de-usuário-3)
  - [3. A aplicação 📱 🧵](#3-a-aplicação--)
  - [4. Critérios de aceitação do projeto 🏆](#4-critérios-de-aceitação-do-projeto-)
  - [5. Conteúdos e ferramentas utilizados 📚](#5-conteúdos-e-ferramentas-utilizados-)
    - [HTML e CSS](#html-e-css)
    - [DOM e Web APIs](#dom-e-web-apis)
    - [Javascript](#javascript)
    - [Firebase](#firebase)
    - [Testing](#testing)
    - [Git e Github](#git-e-github)
    - [Boas práticas de programação](#boas-práticas-de-programação)
  - [6. Desenvolvedoras 👩‍💻](#6-desenvolvedoras-)
    - [**Bruna Calixto**](#bruna-calixto)
    - [**Camila Conte**](#camila-conte)
    - [**Letícia Aniceto**](#letícia-aniceto)
  
---

## 1. Sobre o projeto 💻

O Fort surgiu da necessidade de mulheres possuírem um espaço virtual seguro, 
amigável e empático para trocarem abertamente sobre diversos temas, como saúde 
mental, lifehacks, experiências de vida, maternidade e até educação financeira.
Essa nova rede social veio para conectar mulheres que querem e precisam de uma
rede de apoio inserida em seu cotidiano e com conexões importantes na palma da
mão.

Companheira me ajude que eu não posso andar só, 
Eu sozinha ando bem, mas com você ando melhor. 
:fist_raised: :fist_raised:

Este projeto foi realizado para o _bootcamp_ da [LABORATÓRIA](https://www.laboratoria.la/br).


## 2. Histórias de usuário 📃
Para nos guiarmos durante o desenvolvimento da aplicação e suas funcionalidades,
trabalhamos com três histórias de usuário.

### **História de Usuário 1**

Eu, como usuária, quero acessar a aplicação e receber informações sobre o que é a 
aplicação. Em seguida, quero ser direcionada a uma página de cadastro e/ou login 
(em caso de usuárias que já possuem acesso).

**Critérios de Aceitação**
- Visualizar a landing page com informações sobre a aplicação
- Fazer cadastro com e-mail/senha ou google
- Fazer login


### **História de usuário 2**

Eu, como usuária já cadastrada, desejo abrir a aplicação e visualizar uma página de 
_feed_, com menu que direcionará para o  _feed_, criação de post e perfil. E, ao 
clicar no botão de criação de post, desejo escrever posts de texto. Desejo editar 
e excluir (receber um aviso de confirmação de exclusão) meus posts e visualizar os
 posts das outras usuárias. 

**Critérios de Aceitação**
- Visualizar o feed
- Input pra digitar o texto a ser postado
- Editar e excluir somente o meu próprio post


### **História de usuário 3**

No _feed_, desejo curtir e descurtir os posts, visualizar quantidade de likes. 
Ao clicar em "voltar", visualizar a home.

**Critérios de Aceitação**
- Visualizar o feed
- Visualizar, curtir, descurtir posts de outras pessoas
- Visualizar quantidade de likes dos posts
- Responsividade
- Tratamento de erros
- Pop Up de confirmação
- Botão de voltar



## 3. A aplicação 📱 🧵

🪡 **Onboarding pages**
_Versão mobile_
_Versão desktop_

🪡 **Login**
_Versão mobile_
_Versão desktop_


🪡 **Cadastro**
_Versão mobile_
_Versão desktop_


🪡 **Recuperar Senha** 
_Versão mobile_
_Versão desktop_

🪡 **Feed** 
_Versão mobile_
_Versão desktop_


🪡 **Criação de post**



🪡 **Edição e exclusão de post**


🪡 **Curtir e descurtir post**


🪡 **Perfil**
_Versão mobile_
_Versão desktop_


## 4. Critérios de aceitação do projeto 🏆

- Ser uma SPA.
- Ser responsivo.
- Receber code review de pelo menos uma parceira de outra equipe.
- Fazer testes unitários.
- Fazer testes manuais buscando erros e imperfeições simples.
- Fazer testes de usabilidade e incorporar o feedback dos usuários como melhorias.
- Fazer deploy do aplicativo e marcar a versão (git tag).
  

## 5. Conteúdos e ferramentas utilizados 📚

### HTML e CSS

- [ ] [HTML
      semântico](https://developer.mozilla.org/pt-BR/docs/Glossario/Semantica)
- [ ] [CSS `flexbox`](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### DOM e Web APIs

- [ ] [Manipulação do
      DOM](https://developer.mozilla.org/pt-BR/docs/DOM/Referencia_do_DOM/Introdu%C3%A7%C3%A3o)
- [ ] [History
      API](https://developer.mozilla.org/pt-BR/docs/Web/API/History_API)
- [ ]
  [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

### Javascript

- [ ] [Uso de
      callbacks](https://developer.mozilla.org/pt-BR/docs/Glossario/Callback_function)
- [ ] [Consumo de
      Promises](https://scotch.io/tutorials/javascript-promises-for-dummies#toc-consuming-promises)
- [ ] Uso de ES modules
      ([`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
      |
      [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export))

### Firebase

- [ ] [Firestore](https://firebase.google.com/docs/firestore)
- [ ] [Firebase Auth](https://firebase.google.com/docs/auth/web/start)
- [ ] [Firebase security rules](https://firebase.google.com/docs/rules)
- [ ] [Uso de
      onSnapshot](https://firebase.google.com/docs/firestore/query-data/listen) |
      [onAuthStateChanged](https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_user_data)

### Testing

- [ ] [Teste unitários](https://jestjs.io/docs/pt-BR/getting-started)
- [ ] [Testes assíncronos](https://jestjs.io/docs/pt-BR/asynchronous)
- [ ] [Mocking](https://jestjs.io/docs/pt-BR/manual-mocks)

### Git e Github

- [ ] [Colaboração pelo Github](https://docs.github.com/pt/github/setting-up-and-managing-your-github-user-account/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository)
- [ ] [Organização pelo Github](https://docs.github.com/en/issues/organizing-your-work-with-project-boards/managing-project-boards/about-project-boards)

### Boas práticas de programação

- [ ] Modularização
- [ ] Nomenclatura / Semântica
- [ ] Linting

---


## 6. Desenvolvedoras 👩‍💻

### **Bruna Calixto**
[GitHub] (https://github.com/bruna-devbio/)
[LinkedIn] (https://www.linkedin.com/in/brunacalixtodevjunior/)

### **Camila Conte**
[GitHub] (https://github.com/caxconte/)
[LinkedIn] (https://www.linkedin.com/in/camila-conte/)

### **Letícia Aniceto**
[GitHub] (https://github.com/leticia-aniceto/)
[LinkedIn] (https://www.linkedin.com/in/leticia-braga-aniceto/)