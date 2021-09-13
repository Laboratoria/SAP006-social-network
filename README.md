# Criando uma Rede Social

## Índice

- [1. Sobre o projeto](#1-sobre-o-projeto)
- [2. Resumo do projeto](#2-resumo-do-projeto)
- [3. Pesquisa de usuário](#4-pesquisa-de-usuário)
- [4. Histórias de usuário](#5-histórias-de-usuários)
- [5. Objetivos de aprendizagem](#3-objetivos-de-aprendizagem)
- [7. Entrega](#7-entrega)
- [8. Guias, dicas e leituras complementares](#8-guias-dicas-e-leituras-complementares)

---

## 1. Sobre o projeto

Viajar é sempre uma experiência incrível e especial para todes. E essa experiência fica melhor ainda quando podemos receber informações detalhadas sobre o lugar que vamos visitar. 

Para nós mulheres essa experiência pode ser bem desafiadora por motivos diversos. Dentre eles estão a falta de segurança, o julgamento social negativo, o machismo e patriarcado enraizado, por exemplo.

Pensando nisso, a Rede Social SO.MU.S. (Rede social para mulheres que viajam, sozinhas ou não) foi criada para que todas possam trocar dicas, dificuldades, dúvidas, experiências e informações diversas sobre suas viagens. Tudo isso dentro de um ambiente seguro e acolhedor para que todas se sintam a vontade para compartilhar suas experiências.

## 2. Resumo do projeto

Fizemos um "brainstorm" e conseguimos levantar algumas ideias para nossa rede social.

![Brainstorm](.src/img/brainstorm.jpg)

Baseando-se nisso, foi realizada uma pesquisa com usuários para que mapeassemos as necessidades que precisariam ser atendidas em nossa aplicação.


## 3. Pesquisa de usuários




## 4. Histórias de usuário

### 4.1 Histórias de usuário 1

"Eu como usuário quero me cadastrar, para ter acesso á rede social"

### 4.2 Histórias de usuário 2

"Eu como usuário quero fazer login na página, para ter acesso às informações "

### 4.3 Histórias de usuário 3

"Eu como usuário quero poder postar relatos das minhas experiências de viagem para que outros usuários leiam."

### 4.4 Histórias de usuário 4

"Eu como usuário quero editar e excluir meus antigos posts."

### 4.5 Histórias de usuário 5

"Eu como usuário quero ler depoimentos de outros usuários em um feed organizado por ordem de data de postagem."

### 4.6 Histórias de usuário 6

"Eu como usuário quero poder curtir e descurtir os posts de outros usuários da rede social."

## 5. Objetivos de aprendizagem

O objetivo principal de aprendizagem deste projeto é construir uma [Single-page
Application
(SPA)](https://pt.wikipedia.org/wiki/Aplicativo_de_p%C3%A1gina_%C3%BAnica)
[_responsiva_](../../topics/css/02-responsive) (com mais de uma tela/ página) na
qual seja possível **ler e escrever dados.**

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

## 7. Entrega

O projeto será entregue subindo seu código no GitHub (`commit` /`push`) e a
interface será hospedada usando o [Firebase Hosting](https://firebase.google.com/docs/hosting) pages ou outro serviço de hospedagem
que você pode ter encontrado ao longo do caminho.

---

## 8. Guias, dicas e leituras complementares

### 8.1. Primeiros passos

#### 8.1.1. Fork e clone

Como este projeto deve ser desenvolvido em trios, **apenas uma integrante** do trio precisará fazer o [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) e [adicionar as colaboradoras](https://docs.github.com/pt/github/setting-up-and-managing-your-github-user-account/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository) ao repositório. Após as demais integrantes terem recebido e aceito o convite de colaboração do repositório _forkado_, **todas as integrantes** poderão fazer o [clone](https://docs.github.com/pt/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository).

#### 8.1.2. Inicialização de um projeto no Console do Firebase

Esta etapa de configuração do projeto no [Firebase Console](https://console.firebase.google.com/) deverá ser realizada por apenas **UMA integrante** do trio.

Inicie um novo projeto no [console do Firebase](https://console.firebase.google.com/) `Adicionar projeto`

- Insira o nome do seu projeto e clique em `Continuar`
- Pode deixar desativada a opção `Ativar o Google Analytics neste projeto`, pois não usaremos essa funcionalidade
- Clicar em `Criar projeto`

Adicionar as colaboradoras ao projeto Firebase

- No Dashboard do projeto criado, há no menu lateral uma engrenagem em `Visão geral do projeto`, selecionar `Usuários e permissões` para adicionar suas colegas como membro no projeto
- Utilizar os e-mails `Gmail` das colegas e configurar os papéis como `Proprietário`

Adicionar o Firebase ao seu aplicativo

- Adicione um Web app para começar
- Registre o `Apelido do app`
- Selecione para `Também configure o Firebase Hosting para este app`
- `Registrar app`
- `Adicionar o SDK do Firebase` no o arquivo `src/index.html` do projeto

#### 8.1.3. Instalação global de Firebase em sua máquina

Esta etapa deve ser realizada por **TODAS integrantes**.

Este projeto está configurado para rodar por meio do servidor do Firebase. Para isso, será necessário possuir o [Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli) instalado globalmente em sua máquina. Utilize o comando a seguir no seu terminal:

```bash
npm install -g firebase-tools
```

Verifique se foi instalado corretamente, realizando o [login](https://firebase.google.com/docs/cli#sign-in-test-cli):

```bash
firebase login
```

O login é feito por meio de uma conta Google, portanto, deve abrir uma janela em um navegador automaticamente para realizar o login. Se não abrir, pode clicar no link que vai aparecer no terminal.

#### 8.1.4. Configuração do projeto Firebase no repositório

Esta etapa deverá ser realizada por apenas **UMA integrante** do trio.

**IMPORTANTE** rodar todos comandos do Firebase a seguir no terminal a partir da pasta raiz do projeto.

- Executar o comando para realizar o [login](https://firebase.google.com/docs/cli#sign-in-test-cli)
  ```bash
  firebase login
  ```
- Executar o comando para iniciar o setup do projeto
  ```bash
  firebase init
  ```
- Selecionar _Hosting_ (aperte `Espaço` do teclado para selecionar essa opção e depois `Enter`)
- Selecionar `Use an existing project`. No terminal vai aparecer o nome do projeto que você acabou de criar no site do Firebase Console, selecionar e dar `Enter`
- Escrever `src` para definir como `public directory`
- Escrever `y` para selecionar como SPA (Single Page Application)
- Escrever `N` para não fazer builds e deploys automáticos com GitHub
- O Firebase vai dizer que `src/index.html` já existe e pergunta se quer sobrescrever. Sugerimos dar `N`, para não sobrescrever o `index.html`
- Se der tudo certo, o Firebase vai criar o arquivo `.firebaserc` de configuração na pasta do projeto e estamos prontas pra continuar
- Faça o `commit` com a adição dessa configuração para o repositório do seu grupo. Dessa forma, todas terão acesso às configurações do Firebase

#### 8.1.5. Rodando a aplicação

Após atualização de seu repositório contendo a configuração inicial do projeto Firebase (item 8.1.4. acima), você deve abrir o terminal na raiz do projeto para rodar o comando de instalação de dependências:

```bash
npm i
```

E para rodar o projeto, use o comando:

```bash
npm start
```

Você verá que o servidor do Firebase está configurado para rodar seu projeto em [http://localhost:5000](http://localhost:5000).

Segue um 🎥 [vídeo](https://youtu.be/fTH-CUeuOc8) tutorial das etapas 8.1.2 até 8.1.5.

#### 8.1.6. Firebase Authentication

Os principais métodos de autenticação a serem usados neste projeto são:

- [Autenticação com e-mail e senha](https://firebase.google.com/docs/auth/web/password-auth?authuser=0)
- [Login com Google](https://firebase.google.com/docs/auth/web/google-signin?authuser=0)

A configuração deve ser feita no [console do Firebase](https://console.firebase.google.com/):

- Clique no menu lateral `Authentication` e em `Primeiros passos`
- Na aba `Sign-in method`, escolher os métodos, `Ativar` e `Salvar`

Segue um [vídeo](https://youtu.be/gvOjISEbOr8) tutorial.

Documentação: [Authentication](https://firebase.google.com/docs/auth/web/start)

#### 8.1.7. Configuração de base de dados Firestore Database

No [console do Firebase](https://console.firebase.google.com/), adicionar Firestore Database ao projeto Firebase.

- Clique no menu lateral `Firestore Database` e em `Criar banco de dados`
- Selecionar `Iniciar no modo de produção`, clicar em `Avançar`
- Escolher a região `us-east1` e clicar em `Ativar`
- Na tela de `Cloud Firestore`, ir na aba de `Regras` e editar para `true` e `Publicar`
  ```
  rules_version = ‘2’;
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if true;
      }
    }
  }
  ```

Documentação: [Cloud Firestore](https://firebase.google.com/docs/firestore)

### 8.2. Mobile first

O conceito de [_mobile
first_](https://tableless.com.br/mobile-first-a-arte-de-pensar-com-foco/) faz
referência a um processo de desenho e desenvolvimento que parte de como se vê e
como funciona uma aplicação primeiro em um dispositivo móvel e mais adiante se
analisa como adaptar a aplicação à telas progressivamente maiores. Esta é uma
contraposição ao modelo tradicional, no qual primeiro se desenha os websites (ou
webapps) para desktops e depois os adaptam para telas menores.

A motivação aqui é se assegurar que desde o começo sejam desenhadas telas
_responsivas_. Dessa forma, começamos com a aparência e o comportamento do
aplicativo em uma tela e ambiente móvel.

### 8.3. Múltiplas telas

Em projetos anteriores, nossas aplicações eram compostas de apenas uma tela
_principal_ (uma só _página_). Neste projeto, precisaremos dividir nossa
interface em várias _views_ ou _pages_ e oferecer uma maneira de navegar entre
essas telas. Esse problema pode ser resolvido de várias maneiras: com arquivos
HTML independentes (cada um com seu próprio URL) e links tradicionais; mantendo
na memória e renderizando condicionalmente (sem atualizar a página);
[manipulando o histórico do
navegador](https://developer.mozilla.org/es/docs/DOM/Manipulando_el_historial_del_na_gador)
com
[`window.history`](https://developer.mozilla.org/es/docs/Web/API/Window/history).
Neste projeto, convidamos você a explorar opções e decidir sobre uma opção de
implementação.

O [vídeo](https://youtu.be/hf8x3A1e57Y) da Paloma pode ajudar nessa etapa.

### 8.4. Gravação de dados

Nos projetos anteriores, consumimos dados, mas ainda não tínhamos escrito dados
(salvar alterações, criar dados, excluir, etc). Neste projeto, você precisará
criar (salvar) novos dados, além de ler, atualizar e modificar os dados
existentes. Esses dados podem ser salvos remotamente usando o
[Firebase](https://firebase.google.com/).

Outras:

- [Mobile
  First](https://tableless.com.br/mobile-first-a-arte-de-pensar-com-foco/)
- [Mobile First Is NOT Mobile Only - Nielsen Norman
  Group](https://www.nngroup.com/articles/mobile-first-not-mobile-only/)
- [Flexbox - CSS
  Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Módulos:
  Export](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/export)
- [Módulos:
  Import](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import)
