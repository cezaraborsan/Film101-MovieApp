const MY_API_KEY = "494c8f2f1b18f570d713941a3eec2c7b";

const popularMovies_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${MY_API_KEY}&page=1`;

const popularTV_URL = `https://api.themoviedb.org/3/trending/tv/week?api_key=${MY_API_KEY}&page=1`;

const upcomingMovies_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${MY_API_KEY}&language=en-US&page=1`;
const SERACH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${MY_API_KEY}&query="`;

const topRatedMovies_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${MY_API_KEY}&language=en-US&page=1`;
const topRatedTV_URL = `https://api.themoviedb.org/3/tv/top_rated?api_key=${MY_API_KEY}&language=en-US&page=1`;
const posterPath = "https://image.tmdb.org/t/p/w1280";
const genres_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${MY_API_KEY}&language=en-US`;

const form = document.querySelector(".form");
const search = document.querySelector(".search");
const popularMoviesContainer = document.querySelector(".popular-movies");
const searchedMoviesContainer = document.querySelector(".searched-movies");
const upcomingMoviesContainer = document.querySelector(".upcoming-movies");
const popularTVContainer = document.querySelector(".popular-tv");
const standardMovies = document.querySelector(".standard-movies");
const searchedMovies = document.querySelector(".searched");

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

//Popular Movies

getPopularMovies(popularMovies_URL);
getUpcomingMovies(upcomingMovies_URL);
getPopularTV(popularTV_URL);
getTopRatedMovies(topRatedMovies_URL);
getTopRatedTV(topRatedTV_URL);

async function getPopularMovies() {
  const response = await fetch(popularMovies_URL);
  const data = await response.json();
  const results = data.results.slice(0, 12);

  popularMoviesContainer.innerHTML = "";

  results.forEach((movie) => {
    const { title, poster_path, release_date, genre_ids } = movie;
    const movieRating = movie.vote_average.toFixed(1);

    const gen = genresListMovies.find((gen) => gen.id === genre_ids[0]);
    const gen1 = genresListMovies.find((gen1) => gen1.id === genre_ids[1]);

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <img class="poster" src="${posterPath + poster_path}" />
    <div class="movie-details">
      <h3 class="movie-title">${title}</h3>
      <div class="rating">
        <img src="../imgs/star.png" alt="rating star" />
        <span>${movieRating}</span>
      </div>
    </div>
    <p class="release">
        <span>${gen.name}</span>
        <span>${gen1.name}</span>
        
    </p>`;

    popularMoviesContainer.appendChild(movieEl);
  });
}

// Popular TV shows

async function getPopularTV() {
  const response = await fetch(popularTV_URL);
  const data = await response.json();
  const results = data.results.slice(0, 12);

  popularTVContainer.innerHTML = "";

  results.forEach((movie) => {
    const { name, poster_path, first_air_date, genre_ids } = movie;
    const movieRating = movie.vote_average.toFixed(1);

    const gen = genresListTV.find((gen) => gen.id === genre_ids[0]);
    const gen1 = genresListTV.find((gen1) => gen1.id === genre_ids[1]);

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <img class="poster" src="${posterPath + poster_path}" />
    <div class="movie-details">
      <h3 class="movie-title">${name}</h3>
      <div class="rating">
        <img src="../imgs/star.png" alt="rating star" />
        <span>${movieRating}</span>
      </div>
    </div>
    <p class="release">
        <span>${gen.name}</span>
        <span>${gen1.name}</span>
       
    </p>`;

    popularTVContainer.appendChild(movieEl);
  });
}

// Coming up in theaters

async function getUpcomingMovies() {
  const response = await fetch(upcomingMovies_URL);
  const data = await response.json();
  const results = data.results.slice(0, 12);

  upcomingMoviesContainer.innerHTML = "";

  results.forEach((movie) => {
    const { title, poster_path, vote_average, release_date } = movie;
    const movieRating = movie.vote_average.toFixed(1);

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <img class="poster" src="${posterPath + poster_path}" />
    <div class="movie-details">
      <h3 class="movie-title">${title}</h3>
      <div class="rating">
        <img src="../imgs/star.png" alt="rating star" />
        <span>${movieRating}</span>
      </div>
    </div>
    <p class="release">
    Release date:
        <span>${release_date}</span>  
    </p>`;

    upcomingMoviesContainer.appendChild(movieEl);
  });
}

async function getMoviesBySearch(url) {
  const response = await fetch(url);
  const data = await response.json();
  const results = data.results.slice(0, 21);

  searchedMoviesContainer.innerHTML = "";

  results.forEach((movie) => {
    const { title, poster_path, vote_average, release_date, genre_ids } = movie;
    const movieRating = movie.vote_average.toFixed(1);

    const gen = genresListMovies.find((gen) => gen.id === genre_ids[0]);
    const gen1 = genresListMovies.find((gen1) => gen1.id === genre_ids[1]);

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <img class="poster" src="${posterPath + poster_path}" />
    <div class="movie-details">
      <h3 class="movie-title">${title}</h3>
      <div class="rating">
        <img src="../imgs/star.png" alt="rating star" />
        <span>${movieRating}</span>
      </div>
    </div>
    <p class="release">
      <span>${gen.name}</span>
      <span>${gen1.name}</span>
    </p>`;

    searchedMoviesContainer.appendChild(movieEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    standardMovies.style.display = "none";
    searchedMovies.style.display = "block";
    getMoviesBySearch(SERACH_URL + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});

const topRatedMoviesList = document.querySelector(".top-rated-movies");
const topRatedTVList = document.querySelector(".top-rated-tv-shows");

async function getTopRatedMovies() {
  const response = await fetch(topRatedMovies_URL);
  const data = await response.json();
  const results = data.results.slice(0, 10);

  topRatedMoviesList.innerHTML = "";

  results.forEach((movie) => {
    const { title, vote_average, release_date } = movie;
    const movieRating = movie.vote_average.toFixed(1);

    const movieEl = document.createElement("li");
    movieEl.classList.add("top-rated-item");
    movieEl.innerHTML = `<span class="top-rated-info">
    ${title}<span class="score">${movieRating}</span>
  </span>
  <span class="top-rated-release-date">${release_date}</span>`;

    topRatedMoviesList.appendChild(movieEl);
  });
}

async function getTopRatedTV() {
  const response = await fetch(topRatedTV_URL);
  const data = await response.json();
  const results = data.results.slice(0, 10);

  topRatedTVList.innerHTML = "";

  results.forEach((movie) => {
    const { name, overview, vote_average, first_air_date } = movie;
    const movieRating = movie.vote_average.toFixed(1);

    const movieEl = document.createElement("li");
    movieEl.classList.add("top-rated-item");
    movieEl.innerHTML = `
    <span class="top-rated-info"> ${name}<span class="score">${movieRating}</span></span>
  <span class="top-rated-release-date">${first_air_date}</span>`;

    topRatedTVList.appendChild(movieEl);
  });
}

//Slider

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
