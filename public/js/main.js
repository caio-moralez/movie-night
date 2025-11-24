//browser side
const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

//get room
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

//join chatroom
socket.emit("joinRoom", { username, room });

//get room and users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUser(users);
});

//message from server
socket.on("message", (message) => {
//console.log(message);
  outputMessage(message);

  //scroll down on chat
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//message submit

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get message
  const msg = e.target.elements.msg.value;

  //emit message to server
  socket.emit("chatMessage", msg);

  // clear input box
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus;
});

//output message to DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
						<p class="text">
							${message.text}
						</p>`;
  document.querySelector(".chat-messages").appendChild(div);
}

//output room name to DOM

function outputRoomName(room) {
  roomName.innerText = room;
}

//output users to DOM

function outputUser(users) {
  userList.innerHTML = `
 ${users.map((user) => `<li>${user.username}</li>`).join("")}
 `;
}

// display movie by API
function displayMovie(movie) {
  const poster = document.getElementById("moviePoster");
  const title = document.getElementById("movieTitle");
  const overview = document.getElementById("movieOverview");
  const rating = document.getElementById("movieRating");
  const trailer = document.getElementById("trailer");

  function formatMovieTitle2(title) {
    return title.toLowerCase().replace(/\s+/g, "+");
  }

  // Set poster image
  //test ternary ? have poster set the poster : not set adam sandler the best actor
  poster.src = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://i.pinimg.com/736x/d0/94/75/d094753a0f4fe6fb4118633529b200de.jpg";

  // Text fields title-overview-rating+trailer
  title.innerText = movie.title;
  overview.innerText = movie.overview;
  rating.innerHTML = ` <p><strong>Rating:</strong> ${movie.vote_average.toFixed(
    1
  )}/10</p>`;
  trailer.innerHTML = `<a href="https://www.youtube.com/results?search_query=trailer+${formatMovieTitle2(
    movie.title
  )}"  target="_blank" rel="noopener noreferrer" ><p id="ytblogo"> <i  class="fa fa-play"></i>trailer</p></a>`;
}

//  buttoms logic
document.getElementById("genreSelect").addEventListener("change", () => {
  const genre = document.getElementById("genreSelect").value;
  socket.emit("genreSelected", { genre });
});

document.getElementById("likeBtn").addEventListener("click", () => {
  const genre = document.getElementById("genreSelect").value;
  socket.emit("voteMovie", { liked: true, genre });
});

document.getElementById("skipBtn").addEventListener("click", () => {
  const genre = document.getElementById("genreSelect").value;
  socket.emit("voteMovie", { liked: false, genre });
});

//  server sends a new movie for everyone
socket.on("sharedMovie", ({ movie }) => {
  displayMovie(movie);
});

// When everyone liked the movie show in the caht with title + poster + link to see the movie
// remember add optional servers to the link
socket.on("movieFinalChoice", ({ movie }) => {
  const div = document.createElement("div");
  div.classList.add("message");

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : "https://i.pinimg.com/736x/d0/94/75/d094753a0f4fe6fb4118633529b200de.jpg";

  div.innerHTML = `
    <p class="meta"> time to see your movie!</p>
    <p class="text"><strong>${movie.title}</strong> is the movie for the night! </p>
    <img src="${posterUrl}" class="movie-poster">
    

   <a 
  href="https://vidsrcme.su//embed/movie?tmdb=${movie.id}&sub_url=https%3A%2F%2Fvidsrc.me%2Fsample.srt&autoplay=1" target="_blank"
  ><p> <i class="fa fa-play" >click here to watch your!</i></p></a>


  `;
  // aply the message on chat-messages and scroll the chat to the bottom
  const chatMessages = document.querySelector(".chat-messages");
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
