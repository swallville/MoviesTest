import { createStore } from "effector";

import { MoviesStore } from "../types";
import {
  addMovieToFavorites,
  removeMovieFromFavorites,
  setMovies,
  setSelectedMovieDetails,
  setSelectedMovieVideos,
} from "./events";

const INITIAL_DATA: MoviesStore = {
  movies: [],
  selectedMovieID: null,
  currentPage: 0,
  totalPages: 0,
  currentMovieDetails: null,
  currentMovieVideos: [],
  favoriteMovies: [],
};

export const $movies = createStore<MoviesStore>(INITIAL_DATA, {
  name: "movies",
});

$movies.on(setMovies, (_, payload) => payload);

$movies.on(setSelectedMovieDetails, (state, payload) => ({
  ...state,
  currentMovieDetails: payload,
}));

$movies.on(setSelectedMovieVideos, (state, payload) => ({
  ...state,
  currentMovieVideos: payload,
}));

$movies.on(addMovieToFavorites, (state, movieId) => ({
  ...state,
  favoriteMovies: state.favoriteMovies.includes(movieId)
    ? state.favoriteMovies
    : [...state.favoriteMovies, movieId],
}));

$movies.on(removeMovieFromFavorites, (state, movieId) => ({
  ...state,
  favoriteMovies: state.favoriteMovies.filter((id) => id !== movieId),
}));
