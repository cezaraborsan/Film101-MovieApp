const form = document.querySelector(".form");
const searchInput = document.querySelector(".search");
const popularMoviesContainer = document.querySelector(".popular-movies");
const searchedMoviesContainer = document.querySelector(".searched-movies");
const upcomingMoviesContainer = document.querySelector(".upcoming-movies");
const popularTVContainer = document.querySelector(".popular-tv");
const standardMovies = document.querySelector(".standard-movies");
const searchedMovies = document.querySelector(".searched");
const topNewsContainer = document.querySelector(".top-news");

// *********** API URL ***********

const MY_API_KEY = "494c8f2f1b18f570d713941a3eec2c7b";
const popularMovies_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${MY_API_KEY}&page=1`;
const popularTV_URL = `https://api.themoviedb.org/3/trending/tv/week?api_key=${MY_API_KEY}&page=1`;
const upcomingMovies_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${MY_API_KEY}&language=en-US&page=1`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/multi?api_key=${MY_API_KEY}&language=en-US&query=${search}&page=1`;
const topRatedMovies_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${MY_API_KEY}&language=en-US&page=1`;
const topRatedTV_URL = `https://api.themoviedb.org/3/tv/top_rated?api_key=${MY_API_KEY}&language=en-US&page=1`;
const tvOnTheAir_URL = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${MY_API_KEY}&language=en-US&page=1`;
const posterPath = "https://image.tmdb.org/t/p/w1280";
const genres_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${MY_API_KEY}&language=en-US`;
const popularPeople_URL = `https://api.themoviedb.org/3/person/popular?api_key=${MY_API_KEY}&language=en-US&page=1`;

// *********** Genres Lists MOVIEs & TV SHOWs ***********

const genresListMovies = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-fi" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const genresListTV = [
  { id: 10759, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
  { id: 37, name: "Western" },
];

// *********** FUNCTIONS ***********

getPopularMovies(popularMovies_URL);
getUpcomingMovies(upcomingMovies_URL);
getPopularTV(popularTV_URL);
getTopRatedMovies(topRatedMovies_URL);
getTVOnTheAir(tvOnTheAir_URL);
getTopRatedTV(topRatedTV_URL);
getTopPeople(popularPeople_URL);

//*********** EVENT LISTENERS ***********

//*********** GET POPULAR MOVIES AND ADD THEM TO THE PAGE ***********

async function getPopularMovies() {
  try {
    const response = await axios.get(popularMovies_URL);
    const data = response.data;
    const results = data.results.slice(0, 12);

    popularMoviesContainer.innerHTML = "";

    results.forEach((movie) => {
      const { title, poster_path, release_date, genre_ids, id } = movie;
      const movieRating = movie.vote_average.toFixed(1);

      const gen = genresListMovies.find((gen) => gen.id === genre_ids[0]);
      const gen1 = genresListMovies.find((gen1) => gen1.id === genre_ids[1]);

      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");
      movieEl.innerHTML = `
      
      <a onclick="movieSelected('${id}')"><img class="poster"src="${
        posterPath + poster_path
      }"/><a/>

      <div class="movie-details">
        <a onclick="movieSelected('${id}')"><h3 class="movie-title">${title}</h3><a/>
        <div class="rating">
          <span class='${getClassByRate(
            movieRating
          )} rating'>${movieRating}</span>
        </div>
      </div>

      <p class="genre">
          ${gen ? `<span> ${gen.name}</span>` : ``}
          ${gen1 ? `<span> ${gen1.name}</span>` : ``}
      </p>`;

      popularMoviesContainer.appendChild(movieEl);
    });
  } catch (err) {
    console.log("ERROR!!" + err);
  }
}

//*********** GET POPULAR TV SHOWS AND ADD THEM TO THE PAGE ***********

async function getPopularTV() {
  try {
    const response = await axios.get(popularTV_URL);
    const data = response.data;
    const results = data.results.slice(0, 12);

    popularTVContainer.innerHTML = "";

    results.forEach((movie) => {
      const { name, poster_path, first_air_date, genre_ids, id } = movie;
      const movieRating = movie.vote_average.toFixed(1);

      const gen = genresListTV.find((gen) => gen.id === genre_ids[0]);
      const gen1 = genresListTV.find((gen1) => gen1.id === genre_ids[1]);

      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");
      movieEl.innerHTML = `
      <a onclick="movieSelected('${id}')"><img class="poster"src="${
        posterPath + poster_path
      }"/><a/>
      <div class="movie-details">
      <a onclick="movieSelected('${id}')"><h3 class="movie-title">${name}</h3><a/>
        <div class="rating">
          <span class='${getClassByRate(
            movieRating
          )} rating'>${movieRating}</span>
        </div>
      </div>
      <p class="genre">
          ${gen ? `<span> ${gen.name}</span>` : ``}
          ${gen1 ? `<span> ${gen1.name}</span>` : ``}
      </p>`;

      popularTVContainer.appendChild(movieEl);
    });
  } catch (err) {
    console.log("ERROR!!" + err);
  }
}

// *********** GET UPCOMING MOVIES AND ADD THEM TO THE PAGE ***********

async function getUpcomingMovies() {
  try {
    const response = await axios.get(upcomingMovies_URL);
    const data = response.data;
    const results = data.results.slice(0, 12);

    upcomingMoviesContainer.innerHTML = "";

    results.forEach((movie) => {
      const { title, poster_path, release_date, id } = movie;
      const movieRating = movie.vote_average.toFixed(1);

      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");
      movieEl.innerHTML = `
      <a onclick="movieSelected('${id}')"><img class="poster"src="${
        posterPath + poster_path
      }"/><a/>
    <div class="movie-details">
    <a onclick="movieSelected('${id}')"><h3 class="movie-title">${title}</h3><a/>
      <div class="rating">
        <span class='${getClassByRate(
          movieRating
        )} rating'>${movieRating}</span>
      </div>
    </div>
    <p class="release">
    Release date:
        <span>${release_date}</span>  
    </p>`;

      upcomingMoviesContainer.appendChild(movieEl);
    });
  } catch (err) {
    console.log("ERROR!" + err);
  }
}

// *********** GET UPCOMING MOVIES AND ADD THEM TO THE PAGE AND HIDE THE OTHER SECTIONS ***********

const reload = document.querySelector("#loader");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchMovie();
});

form.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchMovie();
  }
});

function searchMovie() {
  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    standardMovies.style.display = "none";
    searchedMovies.style.display = "block";
    topNewsContainer.style.display = "none";
    getMoviesBySearch(searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
}

async function getMoviesBySearch(searchInput) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${MY_API_KEY}&language=en-US&query=${searchInput}&page=1`
    );
    const data = response.data;
    const results = data.results.slice(0, 25);
    const searchItems = results.filter(
      (result) =>
        result.known_for_department !== "Directing" &&
        result.known_for_department !== "Acting"
    );

    searchedMoviesContainer.innerHTML = "";

    searchItems.forEach((movie) => {
      const {
        title,
        poster_path,
        vote_average,
        genre_ids,
        name,
        id,
        media_type,
      } = movie;

      const gen = genresListMovies.find((gen) => gen.id === genre_ids[0]);
      const gen1 = genresListMovies.find((gen1) => gen1.id === genre_ids[1]);

      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");
      movieEl.innerHTML = `
    ${
      poster_path
        ? `<a onclick="movieSelected('${id}')"><img class="poster" src="${
            posterPath + poster_path
          }" /> <span class='media-type'>${media_type}</span> <a/>`
        : `<a onclick="movieSelected('${id}')"><img class="poster" src="./imgs/blank.jpg" alt="blank page"> <span class='media-type'>${media_type}</span><a/>`
    }
   
    <div class="movie-details">
    ${
      title
        ? `<a onclick="movieSelected('${id}')"><h3 class="movie-title">${title}</h3> <span class='media-type'>${media_type}</span><a/>`
        : `<a onclick="movieSelected('${id}')"><h3 class="movie-title">${name}</h3> <span class='media-type'>${media_type}</span><a/>`
    } 
      <div class="rating ${getClassByRate(vote_average)}" >
        ${
          vote_average
            ? `<span class = ' rating ${getClassByRate(
                vote_average
              )}'>${vote_average.toFixed(1)}</span>`
            : `<span class = '${getClassByRate(
                vote_average
              )} rating'>0.0</span>`
        }
      </div>
    </div>
    <p class="genre">
      ${gen ? `<span> ${gen.name}</span>` : ``}
      ${gen1 ? `<span> ${gen1.name}</span>` : ``}
    </p>
    `;
      searchedMoviesContainer.appendChild(movieEl);
    });
  } catch (err) {
    console.log("ERROR!" + err);
  }
}

//********** GET ACTION MOVIES *******************

const actionBtn = document.querySelector(".action-button");
const actionMovies = document.querySelector(".action-movies");
const actionMoviesContainer = document.querySelector(".action");

const romanceBtn = document.querySelector(".romance-button");
const romanceMovies = document.querySelector(".romance-movies");
const romanceMoviesContainer = document.querySelector(".romance");

const documentaryBtn = document.querySelector(".documentary-button");
const documentaryMovies = document.querySelector(".documentary-movies");
const documentaryMoviesContainer = document.querySelector(".documentary");

actionBtn.addEventListener("click", () => {
  getActionMovies();
  standardMovies.style.display = "none";
  topNewsContainer.style.display = "none";
  romanceMoviesContainer.style.display = "none";
  documentaryMoviesContainer.style.display = "none";
  actionMoviesContainer.style.display = "block";
});

romanceBtn.addEventListener("click", () => {
  getRomanceMovies();
  standardMovies.style.display = "none";
  topNewsContainer.style.display = "none";
  romanceMoviesContainer.style.display = "block";
  actionMoviesContainer.style.display = "none";
  documentaryMoviesContainer.style.display = "none";
});

documentaryBtn.addEventListener("click", () => {
  getDocumentaryMovies();
  standardMovies.style.display = "none";
  topNewsContainer.style.display = "none";
  romanceMoviesContainer.style.display = "none";
  actionMoviesContainer.style.display = "none";
  documentaryMoviesContainer.style.display = "block";
});

async function getActionMovies() {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${MY_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page1&with_genres=28&without_genres=35%2C99%2C10751%2C27%2C10402%2C10749&with_watch_monetization_types=flatrate`
    );
    const data = response.data;
    const results = data.results.slice(0, 20);
    const actionItems = results.filter(
      (result) =>
        result.known_for_department !== "Directing" &&
        result.known_for_department !== "Acting"
    );

    actionMovies.innerHTML = "";

    actionItems.forEach((movie) => {
      const {
        title,
        poster_path,
        vote_average,
        genre_ids,
        name,
        id,
        media_type,
      } = movie;

      const gen = genresListMovies.find((gen) => gen.id === genre_ids[0]);
      const gen1 = genresListMovies.find((gen1) => gen1.id === genre_ids[1]);

      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");
      movieEl.innerHTML = `
    ${
      poster_path
        ? `<a onclick="movieSelected('${id}')"><img class="poster" src="${
            posterPath + poster_path
          }" /> <span class='media-type'>${media_type}</span> <a/>`
        : `<a onclick="movieSelected('${id}')"><img class="poster" src="./imgs/blank.jpg" alt="blank page"> <span class='media-type'>${media_type}</span><a/>`
    }
   
    <div class="movie-details">
    ${
      title
        ? `<a onclick="movieSelected('${id}')"><h3 class="movie-title">${title}</h3> <span class='media-type'>${media_type}</span><a/>`
        : `<a onclick="movieSelected('${id}')"><h3 class="movie-title">${name}</h3> <span class='media-type'>${media_type}</span><a/>`
    } 
      <div class="rating ${getClassByRate(vote_average)}" >
        ${
          vote_average
            ? `<span class = ' rating ${getClassByRate(
                vote_average
              )}'>${vote_average.toFixed(1)}</span>`
            : `<span class = '${getClassByRate(
                vote_average
              )} rating'>0.0</span>`
        }
      </div>
    </div>
    <p class="genre">
      ${gen ? `<span> ${gen.name}</span>` : ``}
      ${gen1 ? `<span> ${gen1.name}</span>` : ``}
    </p>
    `;
      actionMovies.appendChild(movieEl);
    });
  } catch (err) {
    console.log("ERROR!" + err);
  }
}

async function getRomanceMovies() {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${MY_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page1&with_genres=10749&without_genres=80%2C99%2C36%2C27&with_watch_monetization_types=flatrate`
    );
    const data = response.data;
    const results = data.results.slice(0, 20);
    const romanceItems = results.filter(
      (result) =>
        result.known_for_department !== "Directing" &&
        result.known_for_department !== "Acting"
    );

    romanceMovies.innerHTML = "";

    romanceItems.forEach((movie) => {
      const {
        title,
        poster_path,
        vote_average,
        genre_ids,
        name,
        id,
        media_type,
      } = movie;

      const gen = genresListMovies.find((gen) => gen.id === genre_ids[0]);
      const gen1 = genresListMovies.find((gen1) => gen1.id === genre_ids[1]);

      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");
      movieEl.innerHTML = `
    ${
      poster_path
        ? `<a onclick="movieSelected('${id}')"><img class="poster" src="${
            posterPath + poster_path
          }" /> <span class='media-type'>${media_type}</span> <a/>`
        : `<a onclick="movieSelected('${id}')"><img class="poster" src="./imgs/blank.jpg" alt="blank page"> <span class='media-type'>${media_type}</span><a/>`
    }
   
    <div class="movie-details">
    ${
      title
        ? `<a onclick="movieSelected('${id}')"><h3 class="movie-title">${title}</h3> <span class='media-type'>${media_type}</span><a/>`
        : `<a onclick="movieSelected('${id}')"><h3 class="movie-title">${name}</h3> <span class='media-type'>${media_type}</span><a/>`
    } 
      <div class="rating ${getClassByRate(vote_average)}" >
        ${
          vote_average
            ? `<span class = ' rating ${getClassByRate(
                vote_average
              )}'>${vote_average.toFixed(1)}</span>`
            : `<span class = '${getClassByRate(
                vote_average
              )} rating'>0.0</span>`
        }
      </div>
    </div>
    <p class="genre">
      ${gen ? `<span> ${gen.name}</span>` : ``}
      ${gen1 ? `<span> ${gen1.name}</span>` : ``}
    </p>
    `;
      romanceMovies.appendChild(movieEl);
    });
  } catch (err) {
    console.log("ERROR!" + err);
  }
}

async function getDocumentaryMovies() {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${MY_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page1&with_genres=99&without_genres=878%2C27%2C14&with_watch_monetization_types=flatrate`
    );
    const data = response.data;
    const results = data.results.slice(0, 20);
    const documentaryItems = results.filter(
      (result) =>
        result.known_for_department !== "Directing" &&
        result.known_for_department !== "Acting"
    );

    documentaryMovies.innerHTML = "";

    documentaryItems.forEach((movie) => {
      const {
        title,
        poster_path,
        vote_average,
        genre_ids,
        name,
        id,
        media_type,
      } = movie;

      const gen = genresListMovies.find((gen) => gen.id === genre_ids[0]);
      const gen1 = genresListMovies.find((gen1) => gen1.id === genre_ids[1]);

      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");
      movieEl.innerHTML = `
    ${
      poster_path
        ? `<a onclick="movieSelected('${id}')"><img class="poster" src="${
            posterPath + poster_path
          }" /> <span class='media-type'>${media_type}</span> <a/>`
        : `<a onclick="movieSelected('${id}')"><img class="poster" src="./imgs/blank.jpg" alt="blank page"> <span class='media-type'>${media_type}</span><a/>`
    }
   
    <div class="movie-details">
    ${
      title
        ? `<a onclick="movieSelected('${id}')"><h3 class="movie-title">${title}</h3> <span class='media-type'>${media_type}</span><a/>`
        : `<a onclick="movieSelected('${id}')"><h3 class="movie-title">${name}</h3> <span class='media-type'>${media_type}</span><a/>`
    } 
      <div class="rating ${getClassByRate(vote_average)}" >
        ${
          vote_average
            ? `<span class = ' rating ${getClassByRate(
                vote_average
              )}'>${vote_average.toFixed(1)}</span>`
            : `<span class = '${getClassByRate(
                vote_average
              )} rating'>0.0</span>`
        }
      </div>
    </div>
    <p class="genre">
      ${gen ? `<span> ${gen.name}</span>` : ``}
      ${gen1 ? `<span> ${gen1.name}</span>` : ``}
    </p>
    `;
      documentaryMovies.appendChild(movieEl);
    });
  } catch (err) {
    console.log("ERROR!" + err);
  }
}

// *********** TOP RATED MOVIES AND TV SHOWS SECTIONS ***********

const topRatedMoviesList = document.querySelector(".top-rated-movies");
const topRatedTVList = document.querySelector(".top-rated-tv-shows");
const tvOnTheAir = document.querySelector(".tv-on-the-air");

// *********** GET TOP RATED MOVIES AND ADD THEM TO THE PAGE ***********

async function getTopRatedMovies() {
  try {
    const response = await axios.get(topRatedMovies_URL);
    const data = response.data;
    const results = data.results.slice(0, 10);
    topRatedMoviesList.innerHTML = "";

    results.forEach((movie) => {
      const { title, vote_average, release_date, id } = movie;
      const movieRating = movie.vote_average.toFixed(1);
      const releaseDate = movie.release_date.slice(0, 4);

      const movieEl = document.createElement("li");
      movieEl.classList.add("top-rated-item");
      movieEl.innerHTML = `
        <a class='item-title' onclick="movieSelected('${id}')">${title}
        <span class="top-rated-release-date">${releaseDate}</span></a>
        <span class="score ${getClassByRate(
          movieRating
        )}">${movieRating}</span>`;
      topRatedMoviesList.appendChild(movieEl);
    });
  } catch (err) {
    console.log("ERROR!" + err);
  }
}

// *********** GET TOP RATED TV SHOWS AND ADD THEM TO THE PAGE ***********

async function getTopRatedTV() {
  try {
    const response = await axios.get(topRatedTV_URL);
    const data = response.data;
    const results = data.results.slice(0, 10);

    topRatedTVList.innerHTML = "";

    results.forEach((movie) => {
      const { name, overview, vote_average, first_air_date, id } = movie;
      const movieRating = movie.vote_average.toFixed(1);
      const airDate = movie.first_air_date.slice(0, 4);

      const movieEl = document.createElement("li");
      movieEl.classList.add("top-rated-item");
      movieEl.innerHTML = `
        <a class='item-title' onclick="movieSelected('${id}')">${name}
        <span class="top-rated-release-date">${airDate}</span></a>
        <span class="score ${getClassByRate(
          movieRating
        )}">${movieRating}</span>`;
      topRatedTVList.appendChild(movieEl);
    });
  } catch (err) {
    console.log("ERROR!" + err);
  }
}

//*********** GET THE TV THAT ARE ON THE AIR IN THE MOMENT AND ADD THEM TO THE PAGE ***********

async function getTVOnTheAir() {
  try {
    const response = await axios.get(tvOnTheAir_URL);
    const data = response.data;
    const results = data.results.slice(0, 10);

    topRatedTVList.innerHTML = "";

    results.forEach((movie) => {
      const { name, overview, vote_average, first_air_date, id } = movie;
      const movieRating = movie.vote_average.toFixed(1);
      const airDate = movie.first_air_date.slice(0, 4);

      const movieEl = document.createElement("li");
      movieEl.classList.add("top-rated-item");
      movieEl.innerHTML = `
        <a class='item-title' onclick="movieSelected('${id}')">${name}
        <span class="top-rated-release-date">${airDate}</span></a>
        <span class="score ${getClassByRate(movieRating)}">${movieRating}</span>
        `;
      tvOnTheAir.appendChild(movieEl);
    });
  } catch (err) {
    console.log("ERROR!" + err);
  }
}

// //GET POPULAR PEOPLE AND ADD THEM TO THE PAGE

const topPeopleContainer = document.querySelector(".top-people");
const topPeopleList = document.querySelector(".top-people-list");

async function getTopPeople() {
  try {
    const response = await axios.get(popularPeople_URL);
    const data = response.data;
    const results = data.results.slice(0, 20);

    topPeopleList.innerHTML = "";

    results.forEach((person) => {
      const { name, profile_path } = person;

      const peopleEl = document.createElement("li");
      peopleEl.classList.add("top-people-item");
      peopleEl.innerHTML = `
        <img class="profile-pic" src="${posterPath + profile_path}"/>
        <span class="movie-title">${name}</span>`;
      topPeopleList.appendChild(peopleEl);
    });
  } catch (err) {
    console.log("ERROR!" + err);
  }
}

// ***************** MODAL WINDOW ******************

const movieWindowContainer = document.querySelector(".modal-window-container");
const topMoviesModalOpen = document.querySelector(".popular-movies");
const topTVModalOpen = document.querySelector(".popular-tv");
const upcomingMoviesModalOpen = document.querySelector(".upcoming-movies");
const searchedItemModalOpen = document.querySelector(".searched-movies");
const overlay = document.getElementById("overlay");
const loader = document.getElementById("loader");
const modalWindow = document.querySelector(".modal-window");
const topRatedMoviesOpenModal = document.querySelector(".top-rated-movies");
const topRatedTVOpenModal = document.querySelector(".top-rated-tv-shows");
const tvOnAirOpenModal = document.querySelector(".tv-on-the-air");

// ***************** OPEN MODAL WINDOW ******************
topRatedMoviesOpenModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("item-title")) {
    getMovie();
  }
});

topRatedTVOpenModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("item-title")) {
    getTVShow();
  }
});

tvOnAirOpenModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("item-title")) {
    getTVShow();
  }
});

topMoviesModalOpen.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("movie-title") ||
    e.target.classList.contains("poster")
  )
    getMovie();
});

topTVModalOpen.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("movie-title") ||
    e.target.classList.contains("poster")
  )
    getTVShow();
});

upcomingMoviesModalOpen.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("movie-title") ||
    e.target.classList.contains("poster")
  )
    getMovie();
});

searchedItemModalOpen.addEventListener("click", (e) => {
  if (
    e.target.nextElementSibling.innerHTML === "tv" &&
    (e.target.classList.contains("movie-title") ||
      e.target.classList.contains("poster"))
  ) {
    getTVShow();
  } else {
    getMovie();
  }
});

// ***************** MODAL MOVIE FUNCTION ******************

function movieSelected(id) {
  sessionStorage.setItem("movieID", id);
}

async function getMovie() {
  movieWindowContainer.classList.add("show");
  overlay.style.display = "block";
  let movieID = sessionStorage.getItem("movieID");

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=${MY_API_KEY}`
    );
    let results = response.data;

    const rating = results.vote_average.toFixed(1);
    const gen = results.genres.splice(0, 2);

    movieWindowContainer.innerHTML = "";

    const movieEl = document.createElement("div");
    movieEl.classList.add("modal-window");
    movieEl.innerHTML = `
      <h2>${results.title}</h2>
      <button class='close-modal' onclick='closeModalWindow()'><img src='./imgs/close.svg' alt='close' /></button>
      <p class='release'>
        <span> Release date: ${results.release_date} </span>
        <span> ${results.runtime} min </span>
      </p>
      <div class='movie-info'>
        <img src="${posterPath + results.poster_path}" alt="" />
        <div class='info'>
          <h3>Movie Info</h3>
          <p>Summary:  <span>${results.overview}</span></p>
          <p class='genre'>
          Genre(s): 
            ${gen[0] ? `<span> ${gen[0].name}</span>` : ``}
            ${gen[1] ? `<span> ${gen[1].name}</span>` : ``}
          </p>
          <p class='rating'>
          Raiting: 
            ${
              rating
                ? `<span> ${rating} / 10</span>`
                : `<span> ${0.0} / 10</span>`
            }
          </p>
        </div>
      </div>
      <div class='cast'>
        <h3>Cast & Crew</h3>
        <div class='actors'></div>
      </div> 
      `;

    movieWindowContainer.appendChild(movieEl);

    try {
      const response2 = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${MY_API_KEY}`
      );

      let results2 = response2.data;
      const cast = results2.cast.slice(0, 8);
      const castContainer = document.querySelector(".actors");

      cast.forEach((actor) => {
        const castEl = document.createElement("span");
        castEl.classList.add("actor");

        castEl.innerHTML = `
        ${
          actor.profile_path
            ? `<img class="poster" src="${posterPath + actor.profile_path}" />`
            : `<img class="poster" src="./imgs/blank.jpg" alt="blank page">`
        }
        <h4>${actor.name}<span> ${actor.character}</span></h4>`;
        castContainer.appendChild(castEl);
      });
    } catch (err) {
      console.log("ERROR!" + err);
    }
  } catch (err) {
    console.log("ERROR!" + err);
  }
}

//**************** MODAL WINDOW FOR TV SHOW ******************/

async function getTVShow() {
  movieWindowContainer.classList.add("show");
  overlay.style.display = "block";
  let tvShowID = sessionStorage.getItem("movieID");

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${tvShowID}?api_key=${MY_API_KEY}&language=en-US`
    );
    let results = response.data;
    console.log(results);

    const rating = results.vote_average.toFixed(1);
    const gen = results.genres.splice(0, 2);

    movieWindowContainer.innerHTML = "";

    const tvShowEl = document.createElement("div");
    tvShowEl.classList.add("modal-window");
    tvShowEl.innerHTML = `
      ${
        results.name
          ? `
      <h2>${results.name}</h2>`
          : `<h2>${results.title}</h2>`
      }
      <button class='close-modal' onclick='closeModalWindow()'> <img src='./imgs/close.svg' alt='close' /> </button>
      <p class='release'>
        <span> Release date: ${results.first_air_date} </span>
        <span> ${results.episode_run_time} min </span>
      </p>
      <div class='movie-info'>
        <img src="${posterPath + results.poster_path}" alt="" />
        <div class='info'>
          <h3>TV Show Info</h3>
          <p>Summary:  <span>${results.overview}</span></p>
          <p class='genre'>
          Genre(s): 
            ${gen[0] ? `<span> ${gen[0].name}</span>` : ``}
            ${gen[1] ? `<span> ${gen[1].name}</span>` : ``}
          </p>
          <p class='rating'>
          Raiting: 
            ${
              rating
                ? `<span> ${rating} / 10</span>`
                : `<span> ${0.0} / 10</span>`
            }     
          </p>
          <p class='seasons'>
          Season(s): 
            ${
              results.number_of_seasons
                ? `<span> ${results.number_of_seasons} </span>`
                : ``
            } 
          </p>
        </div>
      </div>
      <div class='cast'>
        <h3>Cast & Crew</h3>
        <div class='actors'></div>
      </div> 
      `;

    movieWindowContainer.appendChild(tvShowEl);

    try {
      const response2 = await axios.get(
        `https://api.themoviedb.org/3/tv/${tvShowID}/credits?api_key=${MY_API_KEY}&language=en-US`
      );

      let results2 = response2.data;
      const cast = results2.cast.slice(0, 8);
      const crew = results2.crew.slice(0, 8);
      const castContainer = document.querySelector(".actors");

      if (cast.length != 0) {
        cast.forEach((actor) => {
          const castEl = document.createElement("span");
          castEl.classList.add("actor");

          castEl.innerHTML = `
          ${
            actor.profile_path
              ? `<img class="poster" src="${
                  posterPath + actor.profile_path
                }" />`
              : `<img class="poster" src="./imgs/blank.jpg" alt="blank page">`
          }
           <h4> ${actor.name} <span> ${actor.character} </span> </h4>
          `;
          castContainer.appendChild(castEl);
        });
      } else {
        crew.forEach((actor) => {
          const crewEl = document.createElement("span");
          crewEl.classList.add("actor");

          crewEl.innerHTML = `
          ${
            actor.profile_path
              ? `<img class="poster" src="${
                  posterPath + actor.profile_path
                }" />`
              : `<img class="poster" src="./imgs/blank.jpg" alt="blank page">`
          }
          <h4>${actor.name}<span>${actor.known_for_department}</span></h4>`;
          castContainer.appendChild(crewEl);
        });
      }
    } catch (err) {
      console.log("ERROR!" + err);
    }
  } catch (err) {
    console.log("ERROR!" + err);
  }
}

//  ***************** CLOSE MODAL  *****************

const closeModal = document.querySelector(".close-modal");

function closeModalWindow() {
  movieWindowContainer.classList.remove("show");
  overlay.style.display = "none";
}

function hideModal() {
  movieWindowContainer.classList.remove("show");
  overlay.style.display = "none";
}

// *********** SLIDER WHEN DRAG ***********

const sliders = document.querySelectorAll(".slider");
let isDown = false;
let startX;
let scrollLeft;

sliders.forEach((slider) => {
  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener("mouseleave", () => {
    isDown = false;
  });
  slider.addEventListener("mouseup", () => {
    isDown = false;
  });
  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
  });
});

function getClassByRate(movieRating) {
  if (movieRating >= 8) {
    return "green";
  } else if (movieRating >= 5) {
    return "yellow";
  } else {
    return "red";
  }
}
