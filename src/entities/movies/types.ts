import { MovieData, MovieDetailsResponse, MovieVideo } from "./model/apiSchema";

export interface MoviesStore {
  movies: MovieData[];
  selectedMovieID: number | null;
  currentPage: number;
  totalPages: number;
  currentMovieDetails: MovieDetailsResponse | null;
  currentMovieVideos: MovieVideo[];
  favoriteMovies: string[];
}
