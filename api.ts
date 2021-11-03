const API_KEY = "36e03cb014020e57d1cae244d54455cd";
const BASE_URL = "https://api.themoviedb.org/3";
const OPTIONS = "&language=ko-kr&page=1&region=kr";

export const MOVIES_API = {
  GET_TRENDING: () =>
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}${OPTIONS}`).then(
      (res) => res.json()
    ),
  GET_UPCOMING: () =>
    fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}${OPTIONS}`).then(
      (res) => res.json()
    ),
  GET_NOW_MOVIES: () =>
    fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}${OPTIONS}`).then(
      (res) => res.json()
    ),
};

export const TV_API = {
  GET_TRENDING: () =>
    fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}${OPTIONS}`).then(
      (res) => res.json()
    ),
  GET_POPULAR: () =>
    fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}${OPTIONS}`).then((res) =>
      res.json()
    ),
  GET_TOP_RATED: () =>
    fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}${OPTIONS}`).then((res) =>
      res.json()
    ),
};
