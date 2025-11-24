//server side to main.js and search.js

const express = require("express");
const dotenv = require("dotenv");
const app = express();
const path = require("path");
const http = require("http");
dotenv.config();
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");
const roomState = {};
const server = http.createServer(app);

const io = socketio(server);

// set static folder
app.use(express.static(path.join(__dirname, "public")));

const botName = "Movie Night Bot";

//API conection
const tmdbKey = process.env.APIKEY;
const tmdbBaseUrl = "https://api.themoviedb.org/3";

async function getRandomMovieFromTMDB(genre) {
  const page = Math.floor(Math.random() * 200) + 1;

  const listUrl = `${tmdbBaseUrl}/discover/movie?api_key=${tmdbKey}&with_genres=${genre}&page=${page}`;
  const listRes = await fetch(listUrl);
  const listData = await listRes.json();

  const movies = listData.results;
  const randomMovie = movies[Math.floor(Math.random() * movies.length)];

  const infoUrl = `${tmdbBaseUrl}/movie/${randomMovie.id}?api_key=${tmdbKey}`;
  const infoRes = await fetch(infoUrl);

  return infoRes.json();
}
//run wen client connect
io.on("connection", (socket) => {
  socket.on("voteMovie", async ({ liked, genre }) => {
    const user = getCurentUser(socket.id);
    if (!user) return;

    const room = user.room;
    if (!roomState[room]) return;

    // Save vote
    roomState[room].votes[user.id] = liked;

    const usersInRoom = getRoomUsers(room).length;
    const voteCount = Object.keys(roomState[room].votes).length;

    // Check if all users voted
    if (voteCount === usersInRoom) {
      const allLiked = Object.values(roomState[room].votes).every(
        (v) => v === true
      );

      if (allLiked) {
        // Everyone liked
        io.to(room).emit("movieFinalChoice", {
          movie: roomState[room].currentMovie,
        });

        // Reset votes
        roomState[room].votes = {};
      } else {
        // Not everyone liked take a new random movie
        const newMovie = await getRandomMovieFromTMDB(genre);

        // Reset state
        roomState[room] = {
          currentMovie: newMovie,
          votes: {},
        };

        io.to(room).emit("sharedMovie", { movie: newMovie });
      }
    }
  });

  // genre selector at WS
  socket.on("genreSelected", async ({ genre }) => {
    const user = getCurentUser(socket.id);

    const movie = await getRandomMovieFromTMDB(genre);

    // initialize state
    roomState[user.room] = {
      currentMovie: movie,
      votes: {},
    };

    io.to(user.room).emit("sharedMovie", { movie, requestedBy: user.username });
  });

  socket.on("getRandomMovie", async ({ genre }) => {
    const user = getCurentUser(socket.id);

    const movieInfo = await getRandomMovieFromTMDB(genre);

    // broadcast to EVERYONE in the room
    io.to(user.room).emit("sharedMovie", {
      movie: movieInfo,
    });
  });

  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    //welcome to user
    //add instructions how work the dinamic of movie combination
    socket.emit("message", formatMessage(botName, "Welcome to Movie Night"));

    // broadcast when user connect
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} connect to the chat!`)
      );

    // curent users at room and curent room

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  //console.log('new WS connection ')
  //listen for chatmessage
  socket.on("chatMessage", (msg) => {
    const user = getCurentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  //runs when disconect
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} left the chat `)
      );

      // curent users at room and curent room

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

//API to search movies off WS

app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.q;
    const apiKey = process.env.APIKEY;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      query
    )}&page=1`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data.results || []);
  } catch (error) {
    console.error("TMDB server error:", error);
    res.status(500).json({ error: "TMDB error" });
  }
});

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`Server on at port ${PORT}`));
