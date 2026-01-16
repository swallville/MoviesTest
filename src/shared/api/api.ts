import { isEmpty } from "rambdax";

import { ApiClientProps } from "./types";
import apiClient from "./client";
import { MoviesResponse, MovieDetailsResponse, MovieVideosResponse } from "#/entities/movies/model/apiSchema";


/**
 * Fetch movies from API
 */
export const getMovies = async (params: ApiClientProps): Promise<MoviesResponse | { error: unknown }> => {
  if (isEmpty(params)) {
    return {
        error: "No parameters provided",
    };
  }

  const response = await apiClient<MoviesResponse>({
    ...params,
  })

  return response
};

/**
 * Fetch movie details from API
 */
export const getMovieDetails = async (params: ApiClientProps): Promise<MovieDetailsResponse | { error: unknown }> => {
  if (isEmpty(params)) {
    return {
        error: "No parameters provided",
    };
  }

  const response = await apiClient<MovieDetailsResponse>({
    ...params,
  })

  return response
};

/**
 * Fetch movie videos from API
 */
export const getMovieVideos = async (params: ApiClientProps): Promise<MovieVideosResponse | { error: unknown }> => {
  if (isEmpty(params)) {
    return {
        error: "No parameters provided",
    };
  }

  const response = await apiClient<MovieVideosResponse>({
    ...params,
  })

  return response
};