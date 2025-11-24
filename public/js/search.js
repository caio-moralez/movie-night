document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.trim();
  const selectedNumber = document.getElementById("searchSelect").value;
  const server = getServerFromNumber(selectedNumber);

  window.selectedServer = server; // store globally
  searchMovies(query);
});

function getServerFromNumber(num) {
  const servers = {
    1: "vidsrcme.ru",
    2: "vidsrcme.su",
    3: "vidsrc-me.ru",
    4: "vidsrc-me.su",
    5: "vidsrc-embed.ru",
    6: "vidsrc-embed.su",
    7: "vsrc.su",
  };

  return servers[num] || "vidsrc-me.su";
}

async function searchMovies(query) {
  const url = `/api/search?q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const results = await response.json();

    if (results.length === 0) {
      document.getElementById("searchResults").innerHTML =
        "<p>No results found.</p>";
      return;
    }

    displaySearchResults(results.slice(0, 20));
  } catch (error) {
    console.error("Search error:", error);
  }
}

function displaySearchResults(results) {
  const container = document.getElementById("searchResults");
  container.innerHTML = "";

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("search-item");

    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : "https://i.pinimg.com/736x/d0/94/75/d094753a0f4fe6fb4118633529b200de.jpg";
    //console.log(movie.id)
    const server = window.selectedServer;
    div.innerHTML = `
      <div class="search-content">
       <a href="https://${server}/embed/movie?tmdb=${
      movie.id
    }&sub_url=https%3A%2F%2Fvidsrc.me%2Fsample.srt&autoplay=1" target="_blank">
       <img src="${poster}" class="search-poster" alt="${movie.title}"></a>
        
      
        <div class="search-text">
          <h3>${movie.title}</h3>
          <p><strong>Rating:</strong> ${
            movie.vote_average?.toFixed?.(1) || "N/A"
          }/10</p>
          <p class="overview">${movie.overview || "No overview available."}</p>
        </div>
      </div>
    `;

    container.appendChild(div);
  });
}
