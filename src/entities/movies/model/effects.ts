import { attach, createEffect, Effect } from "effector";
import { createQuery } from "@farfetched/core";

import {
  MovieDetailsResponse,
  MovieDetailsResponseContract,
  MoviesResponse,
  MoviesResponseContract,
  MovieVideosResponse,
  MovieVideosResponseContract,
} from "./apiSchema";
import { getMovieDetails, getMovies, getMovieVideos } from "#/shared/api/api";
import { $movies } from "./movies";
import { ApiClientProps } from "#/shared/api/types";

export const requestMoviesFx = createEffect(getMovies);

export const fetchMoviesFx: Effect<
  ApiClientProps,
  MoviesResponse | { error: unknown },
  Error
> = attach({
  effect: requestMoviesFx,
  mapParams: (params) => ({
    ...params,
  }),
  source: {
    movies: $movies,
  },
});

export const moviesQuery = createQuery({
  effect: fetchMoviesFx,
  name: "moviesQuery",
  contract: MoviesResponseContract,
});

export const requestMovieDetailsFx = createEffect(getMovieDetails);

export const fetchMovieDetailsFx: Effect<
  ApiClientProps,
  MovieDetailsResponse | { error: unknown },
  Error
> = attach({
  effect: requestMovieDetailsFx,
  mapParams: (params) => ({
    ...params,
  }),
  source: {
    movies: $movies,
  },
});

export const movieDetailsQuery = createQuery({
  effect: fetchMovieDetailsFx,
  name: "movieDetailsQuery",
  contract: MovieDetailsResponseContract,
});

export const requestMovieVideosFx = createEffect(getMovieVideos);

export const fetchMovieVideosFx: Effect<
  ApiClientProps,
  MovieVideosResponse | { error: unknown },
  Error
> = attach({
  effect: requestMovieVideosFx,
  mapParams: (params) => ({
    ...params,
  }),
  source: {
    movies: $movies,
  },
});

export const movieVideosQuery = createQuery({
  effect: fetchMovieVideosFx,
  name: "movieVideosQuery",
  contract: MovieVideosResponseContract,
});
