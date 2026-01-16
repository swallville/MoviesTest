import { createEvent } from "effector";
import { MoviesStore } from "../types";
import { MovieDetailsResponse, MovieVideo } from "./apiSchema";

export const moviesRequested = createEvent<number>("moviesRequested");
export const selectedMovieRequested = createEvent<number>(
  "selectedMovieRequested",
);
export const selectedMovieVideosRequested = createEvent<number>(
  "selectedMovieVideosRequested",
);

export const setMovies = createEvent<MoviesStore>("setMovies");
export const setSelectedMovieDetails = createEvent<MovieDetailsResponse | null>(
  "setSelectedMovieDetails",
);
export const setSelectedMovieVideos = createEvent<MovieVideo[]>(
  "setSelectedMovieVideos",
);
export const addMovieToFavorites = createEvent<string>("addMovieToFavorites");
export const removeMovieFromFavorites = createEvent<string>(
  "removeMovieFromFavorites",
);
