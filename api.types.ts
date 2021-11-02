export interface IMovie {
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

interface IBaseResponse {
  page: number;
  total_pages: number;
  total_results: number;
}

export interface IMoviesResponse extends IBaseResponse {
  results: IMovie[];
  dates: { maximum: string; minimum: string };
}
