import { sample } from "effector";

import { moviesRequested, selectedMovieRequested, selectedMovieVideosRequested, setMovies, setSelectedMovieDetails, setSelectedMovieVideos } from "./events";
import { fetchMovieVideosFx, movieDetailsQuery, moviesQuery, movieVideosQuery, requestMovieDetailsFx, requestMoviesFx } from "./effects";
import { $movies } from "./movies";
import { MovieDetailsResponse, MovieVideo } from "./apiSchema";

/**
 * When movies are requested call side effect
 * to request movies from the API
 */
sample({
  clock: moviesRequested,
  fn: (page) => ({ url: `http://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PRIVATE_MOVIES_TOKEN}&page=${page}` }),
  target: moviesQuery.start,
});

/**
 * When the side effect for requesting movies
 * completes successfully assign data to store.
 */
sample({
  clock: requestMoviesFx.doneData,
  filter: (_, resp) => !('error' in resp),
  fn: ({ movies }, resp) =>  {
    if ('results' in resp) {
        return {
            ...movies,
            movies: [
                ...movies.movies,
                ...resp.results,
            ],
            currentPage: resp.page,
            totalPages: resp.total_pages,
        };
    }

    return movies;
  },
  source: {
    movies: $movies,
  },
  target: setMovies,
});

sample({
  clock: selectedMovieRequested,
  fn: (id) => ({ url: `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${process.env.NEXT_PRIVATE_MOVIES_TOKEN}` }),
  target: movieDetailsQuery.start,
});

/**
 * When the side effect for requesting the movie details
 * completes successfully assign data to store.
 */
sample({
  clock: requestMovieDetailsFx.doneData,
  filter: (_, resp) => !('error' in resp),
  fn: ({ movies }, resp) =>  {
    if (!('error' in resp)) {
      const result: MovieDetailsResponse = resp;
      return result;
    }

    return movies.currentMovieDetails;
  },
  source: {
    movies: $movies,
  },
  target: setSelectedMovieDetails,
});

sample({
  clock: selectedMovieVideosRequested,
  fn: (id) => ({ url: `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${process.env.NEXT_PRIVATE_MOVIES_TOKEN}` }),
  target: movieVideosQuery.start,
});

/**
 * When the side effect for requesting the movie videos
 * completes successfully assign data to store.
 */
sample({
  clock: fetchMovieVideosFx.doneData,
  filter: (_, resp) => !('error' in resp),
  fn: ({ movies }, resp) =>  {
    if (!('error' in resp)) {
      const result: MovieVideo[] = resp.results;
      return result;
    }

    return movies.currentMovieVideos;
  },
  source: {
    movies: $movies,
  },
  target: setSelectedMovieVideos,
});