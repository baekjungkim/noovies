const API_KEY = "36e03cb014020e57d1cae244d54455cd";
const BASE_URL = "https://api.themoviedb.org/3";

const GET_TRENDING = () =>
  fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
  ).then((res) => res.json());

const GET_UPCOMING = () =>
  fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
  ).then((res) => res.json());

const GET_NOW_MOVIES = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
  ).then((res) => res.json());

export const MOVIES = { GET_TRENDING, GET_UPCOMING, GET_NOW_MOVIES };
