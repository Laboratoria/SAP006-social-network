# GO VEG


## Índice

- [1. Sobre](#1-sobre)
- [2. Histórias de Usuário e Critérios de Aceitação](#2-histórias-de-usuário-e-critérios-de-aceitação)
- [3. Critérios de aceitação do projeto.](#3-critérios-de-aceitação-do-projeto.)
- [4. Interface](#4-interface)
- [5. Testes de usabilidade](#5-testes-de-usabilidade)
- [6. Linguagens e ferramentas utilizadas](#6-linguagens-e-ferramentas-utilizadas)


---

## 1. Sobre

Instagram, Snapchat, Twitter, Facebook, Twitch, Linkedin, etc. As redes sociais
invadiram nossas vidas. Nós as amamos ou odiamos, e muitas pessoas não conseguem
viver sem elas.

Há redes sociais de todo tipo para todos os tipos de interesse. Inspirada em nossas colegas veganas e vegetarianas, **Go Veg** é uma rede de compartilhamento de opções para a alimentação. Receitas, restaurantes e até mesmo mercados são compartilhados e avaliados, tornando a vida desse público mais leve e fácil.


## 2. Histórias de Usuário e Critérios de Aceitação

Para guiar o desenvolvimento, foram levantadas 3 histórias de usuários:

### 1. Primeira História

   Eu como vegetariana quero poder me cadastrar na rede social Goveg, e assim poder logar com email e senha ou entrar através do Google. 

**Critérios de aceitação:**
- ter uma página de cadastro para inserir suas informações, e salvar no banco de dados.
- ter uma página de login para entrar com email e senha ou entrar com o Google. 
- mostrar mensagens de erro:

    a) Página de cadastro: email inválido ou já cadastrado, senha menor que 6 caracteres; 

   b) Página de login: email e senha de login incorretos, não cadastrados, ou inválidos.

  c) Login através do Google: caso o popup seja fechado pelo usuário antes de completar a operação;


### 2. Segunda História
 Eu como vegetariana quero divulgar/compartilhar um post sobre receitas, mercados ou restaurantes e poder edita-lo ou deleta-lo. 

**Critérios de aceitação:**
- O usuário deve estar cadastrado na rede;
- A página de feed deve ter um botão de postar para poder criar o post.
- O usuário pode preencher todos os campos disponíveis como assunto, título, hashtags, valor, e mensagem e a seguir, postar.
- O usuário vê seu post na página de feed e pode edita-la ou deleta-la através dos botões.

### 3. Terceira História
Eu como usuário quero visualizar os posts de outros usuários e poder dar like ou dislike.

**Critérios de aceitação:**
- O usuário quando logado pode ver na página de feed os posts de outros usuários. 
- Em cada post deve haver um botão em forma de coração para o usuário dar like ou dislike nos posts.
- Cada post deverá exibir a contagem de likes.

## 3. Critérios de aceitação do projeto.
   - Ser uma SPA.
  - Ser _responsivo_.
  - Receber _code review_ de pelo menos uma parceira de outra equipe.
  - Fazer _tests_ unitários.
  - Fazer testes manuais buscando erros e imperfeições simples.
  - Fazer testes de usabilidade e incorporar o _feedback_ dos usuários como
    melhorias.
  - Fazer deploy do aplicativo e marcar a versão (git tag).

## 4. Interface
- Protótipo alta fidelidade
 _print figma_

- Layout Final
_prints ou gifs_


## 5. Testes de usabilidade

Durante o teste de usabilidade o usuário que deu like num post não soube dizer se o mesmo estava curtido ou não. Dessa maneira, foi feita uma mudança visual do botão de coração vazio para preenchido. Ao dar dislike, o coração volta a estar vazio.

Um segundo usuário ao clicar no botão para criar posts, começou a preencher os campos e quis desistir de publicar. Dessa forma, foi implementado um botão de cancelar na página de criar postagens. 

## 6. Linguagens e ferramentas utilizadas
- HTML5 e CSS: HTML semântico, flexbox.
- DOM e Web APIs: Manipulação do DOM, History API, localStorage.
- JavaScript: Uso de callbacks, consumo de promises, ES modules (import | export).
- Firebase: Firestore, Firebase Auth, Firebase Security Rules, Uso de OnSnapshot | OnAuthStateChanged.
-Testing: Testes unitários, testes assíncronos, mocking.

