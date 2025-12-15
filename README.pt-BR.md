# Movie Night

**Movie Night** é um aplicativo que tem como objetivo ajudar pessoas a escolherem filmes, oferecendo duas funcionalidades principais.

A primeira funciona como uma biblioteca de filmes acessível, conectada às APIs **TMDB** e **VIDSRC**. A página inicial possui uma barra de busca que exibe os primeiros 20 resultados relacionados, mostrando a capa do filme, uma visão geral (overview) e a avaliação. Para acessar um filme, basta clicar em sua capa, o que abrirá uma nova aba onde o filme pode ser assistido.  
Ao lado da barra de busca, há um menu suspenso com **7 servidores diferentes**. Caso você clique na capa e seja redirecionado para uma página de erro, tente selecionar outro servidor e realizar a busca novamente. O clique irá redirecionar para outro servidor que pode conter o filme.

A outra grande funcionalidade também começa na página inicial, onde existem dois campos: um para **username** (nome de usuário) e outro para **room** (sala). Ambos devem ser preenchidos: o username com seu nome ou apelido, e a room com um código (que pode conter números ou letras) que deve ser compartilhado apenas com as pessoas com quem você deseja escolher o filme da noite.  
Ao entrar em uma sala onde você e outros usuários utilizaram o mesmo código, será possível interagir por meio de um **chat em tempo real**. Na parte inferior da tela, há uma lista suspensa de gêneros de filmes para ajudar a filtrar a busca, além de dois botões: **LIKE** e **SKIP**.  
Quando um gênero é selecionado, um filme será exibido com os mesmos requisitos da página inicial, junto a um botão que direciona para uma busca no YouTube pelo trailer do filme. Após decidir se deseja ou não assistir ao filme, clique em **LIKE** caso queira assistir ou em **SKIP** caso não seja uma opção.  
Quando todos os usuários da sala votarem, duas ações podem ocorrer:  
- Se alguém votar **SKIP**, outro título de filme será selecionado aleatoriamente com base no gênero escolhido.  
- Se todos os membros da sala votarem **LIKE**, uma mensagem será enviada no chat com o filme escolhido e um botão que redireciona para o filme.

---

## Funcionalidades

### Página Inicial
- Busca de filmes utilizando a API do TMDB.
- Visualização do pôster, avaliação e descrição do filme.
- Clique em um resultado para abrir um servidor de streaming.
- Escolha entre 7 servidores de streaming por meio de um menu suspenso.
- Entrada com nome de usuário e código da sala.

### Salas de Chat em Tempo Real e Votação de Filmes
- Entrada com nome de usuário e código da sala.
- Chat com todos os usuários da mesma sala.
- Votação em filmes com **LIKE** ou **SKIP**.
- Votos sincronizados instantaneamente com **Socket.io**.
- O servidor busca filmes aleatórios no TMDB.
- Todos os usuários veem o mesmo filme ao mesmo tempo.
- Em caso de **LIKE unânime**, o filme é enviado para o chat.
- Em caso de votos mistos, um novo filme aleatório é exibido.

---

## Tecnologias Utilizadas
- **Node.js** 
- **Express.js**  
- **Socket.io**  
- **Moment**  
- **Dotenv**  
- **TMDB API**  
- **VIDSRC API**  
- **HTML5 / CSS3 / JavaScript Vanilla**  

---

## Instalação e Configuração

Siga os passos abaixo para rodar o **Movie Night** localmente:

1. Clone este repositório  
2. Instale as dependências:
   ```bash
   npm install
   ```

3. Adicione sua chave da API do TMDB e a porta  
   Crie um arquivo `.env`

   Adicione ao `.env`:
   ```env
   APIKEY=your_tmdb_api_key_here
   PORT=port_to_run
   ```

   Porta sugerida: **3000**

4. Inicie o servidor:
   ```bash
   npm run dev
   ```

5. Abra o aplicativo:
   ```
   http://localhost:your_port
   ```

   Exemplo:
   ```
   http://localhost:3000
   ```

---

## Licença
Licença MIT

---

## Contribuindo
Pull requests são bem-vindas!
