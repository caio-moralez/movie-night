# Movie Night

**Movie Night** This app aims to help people with movie suggestions, offering two main functionalities.

The first serves as an accessible movie library connected to TMDB and VIDSRC. Its homepage features a search bar that displays the first 20 related results, showing the movie cover, an overview, and a rating. To access a movie, click on its cover, which will take you to a new tab where the movie can be viewed. Next to the search bar, there's a dropdown menu with 7 different servers. If you click on the cover and are redirected to an error page, try selecting a different server and searching again. Clicking will redirect you to another server that might have the movie.

Its other great feature starts on the homepage where we have two fields, one for username and one for room. Both must be filled in: the username with your name or nickname, and the room with a code (which can be numbers or letters) that should only be shared with those you would like to choose your movie for the evening. When you enter a room where you and other users have used the same code, you'll have an interactive chat where you can communicate. At the bottom of the screen, there's a dropdown list of movie genres to help filter your search, and two buttons labeled LIKE and SKIP. When you select a genre, a movie will appear with the same requirements as on the homepage, along with a button that directs you to a YouTube search for the movie's trailer. When you decide whether or not you'd like to watch the movie, click LIKE if you want to see that movie and SKIP if it's not an option. When all users in the room vote, two actions can occur: if someone votes SKIP, another movie title will be randomly selected based on the selected genre; if all members of the room vote LIKE, a message will be sent to the chat with your selected movie and a button that redirects you to the movie.

## Features

### Index 

- Search for movies using the TMDB API.
- View poster, rating, and overview.
- Click a result to open a streaming server.
- Choose between 7 streaming servers via dropdown.
- Join with a username and room code.

### Real-Time chat Rooms and Movie Voting

- Join with a username and room code.
- Chat with everyone in the same room.
- Vote LIKE or SKIP on movies.
- Votes sync instantly with Socket.io.
- Server fetches random movies from TMDB.
- Everyone sees the same movie simultaneously.
- if unanimous LIKE the movie is posted in chat.
- if mixed votes next random movie appears.


## Technologies Used

- **Node.js**
- **Express.js**
- **Socket.io**
- **Moment**
- **Dotenv**
- **TMDB API**
- **VIDSRC API**
- **HTML5 / CSS3 / Vanilla JavaScript**



## Installation & Setup

Follow the steps below to run **Movie Night** locally:

### 1. Clone this repository

### 2. Install dependencies
 
 npm install

 ### 3. Add your TMDB API key and PORT
 - create a .env file

 - add to your .env:
 *APIKEY* =your_tmdb_api_key_here
 *PORT=* port_to_run  
 sugest port number 3000;

 ### 4. Start the server

 npm run dev

### 5.Open the app

http://localhost:your_port
*example:* http://localhost:3000


## License

*MIT License*

## Contributing

Pull requests welcome!



