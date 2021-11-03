export interface IMovieProps {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  string: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface ITvProps {
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: string[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
}

interface IBaseResponse {
  page: number;
  total_pages: number;
  total_results: number;
}

export interface IMoviesResponse extends IBaseResponse {
  results: IMovieProps[];
  dates: { maximum: string; minimum: string };
}

export interface ITvResponse extends IBaseResponse {
  results: ITvProps[];
}
