jest.mock("#/shared/api/api", () => ({
  __esModule: true,
  getMovies: jest.fn(),
  getMovieDetails: jest.fn(),
  getMovieVideos: jest.fn(),
}));

import { faker } from "@faker-js/faker";
import { allSettled, fork } from "effector";

import deepmerge from "deepmerge";

import { $movies, INITIAL_DATA } from "#/entities/movies/model/movies";
import { MoviesStore } from "../types";
import { generateRandomMoviesStore } from "../lib/movies-utils";
import { getMovies, getMovieDetails, getMovieVideos } from "#/shared/api/api";
import {
  fetchMovieVideosFx,
  requestMovieDetailsFx,
  requestMoviesFx,
} from "./effects";
import {
  setMovies,
  setSelectedMovieDetails,
  setSelectedMovieVideos,
} from "./events";

describe("Movies Store", () => {
  const mockedMoviesStore: MoviesStore = generateRandomMoviesStore();

  it("should return the initial movies store state", () => {
    const scope = fork();
    const state = scope.getState($movies);
    expect(state).toEqual(INITIAL_DATA);
  });

  it("should update the movies store as expected when requestMoviesFx is successful", async () => {
    const mockMoviesInstance = deepmerge(INITIAL_DATA, mockedMoviesStore);
    const returnValue = {
      results: mockMoviesInstance.movies,
      page: mockMoviesInstance.currentPage,
      total_pages: mockMoviesInstance.totalPages,
    };

    (getMovies as jest.Mock).mockResolvedValue(returnValue);

    const scope = fork();

    // Trigger requestMoviesFx directly to ensure the mock is used
    const result = await allSettled(requestMoviesFx, {
      params: {
        url: `http://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PRIVATE_MOVIES_TOKEN}&page=1`,
      },
      scope,
    });

    expect(result.status).toBe("done");
    expect(result.value).not.toHaveProperty("error");
    expect(result.value).toHaveProperty("results");

    if (!("error" in result.value) && result.status === "done") {
      expect(result.value.results).toHaveLength(
        mockMoviesInstance.movies.length,
      );
      expect(result.value.results.at(0)?.id).toBe(
        mockMoviesInstance.movies.at(0)?.id,
      );

      await allSettled(setMovies, {
        params:
          result.status === "done" && !("error" in result.value)
            ? {
                ...mockMoviesInstance,
              }
            : INITIAL_DATA,
        scope,
      });

      const moviesState = scope.getState($movies);

      expect(moviesState.movies.length).toBe(mockMoviesInstance.movies.length);
      expect(moviesState.currentPage).toBe(mockMoviesInstance.currentPage);
      expect(moviesState.totalPages).toBe(mockMoviesInstance.totalPages);
    }
  });

  it("should handle the error thrown by requestMoviesFx", async () => {
    const errorMessage = "Failed to load requestMoviesFx";
    const returnValue = { error: errorMessage };
    (getMovies as jest.Mock).mockResolvedValue(returnValue);

    const scope = fork();

    // Calls the provided unit within the current scope and wait for all triggered effects to complete.
    const result = await allSettled(requestMoviesFx, {
      params: {
        url: `http://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PRIVATE_MOVIES_TOKEN}&page=1`,
      },
      scope,
    });

    expect(result.status).toBe("done");
    expect(result.value).toHaveProperty("error");
    expect(result.value).toBe(returnValue);
  });

  it("should update the movies store as expected when requestMovieDetailsFx is successful", async () => {
    const mockMoviesInstance = deepmerge(INITIAL_DATA, mockedMoviesStore);
    const returnValue = mockMoviesInstance.currentMovieDetails;

    (getMovieDetails as jest.Mock).mockResolvedValue(returnValue);

    const scope = fork();

    // Trigger requestMovieDetailsFx directly to ensure the mock is used
    const result = await allSettled(requestMovieDetailsFx, {
      params: {
        url: `https://api.themoviedb.org/3/movie/${returnValue?.id}?language=en-US&api_key=${process.env.NEXT_PRIVATE_MOVIES_TOKEN}`,
      },
      scope,
    });

    expect(result.status).toBe("done");
    expect(result.value).not.toHaveProperty("error");

    if (!("error" in result.value) && result.status === "done") {
      expect(result.value).toHaveProperty("poster_path");
      expect(result.value.poster_path).toBe(
        mockMoviesInstance.currentMovieDetails?.poster_path,
      );

      await allSettled(setSelectedMovieDetails, {
        params:
          result.status === "done" && !("error" in result.value)
            ? result.value
            : INITIAL_DATA.currentMovieDetails,
        scope,
      });

      const moviesState = scope.getState($movies);

      expect(moviesState.currentMovieDetails?.id).toBe(
        mockMoviesInstance.currentMovieDetails?.id,
      );
    }
  });

  it("should handle the error thrown by requestMovieDetailsFx", async () => {
    const errorMessage = "Failed to load requestMovieDetailsFx";
    const returnValue = { error: errorMessage };
    (getMovieDetails as jest.Mock).mockResolvedValue(returnValue);

    const scope = fork();

    // Calls the provided unit within the current scope and wait for all triggered effects to complete.
    const result = await allSettled(requestMovieDetailsFx, {
      params: {
        url: `https://api.themoviedb.org/3/movie/${faker.number.int()}?language=en-US&api_key=${process.env.NEXT_PRIVATE_MOVIES_TOKEN}`,
      },
      scope,
    });

    expect(result.status).toBe("done");
    expect(result.value).toHaveProperty("error");
    expect(result.value).toBe(returnValue);
  });

  it("should update the movies store as expected when fetchMovieVideosFx is successful", async () => {
    const mockMoviesInstance = deepmerge(INITIAL_DATA, mockedMoviesStore);
    const returnValue = mockMoviesInstance.currentMovieVideos;

    (getMovieVideos as jest.Mock).mockResolvedValue(returnValue);

    const scope = fork();

    // Trigger requestMovieDetailsFx directly to ensure the mock is used
    const result = await allSettled(fetchMovieVideosFx, {
      params: {
        url: `https://api.themoviedb.org/3/movie/${mockMoviesInstance.currentMovieDetails?.id}/videos?language=en-US&api_key=${process.env.NEXT_PRIVATE_MOVIES_TOKEN}`,
      },
      scope,
    });

    expect(result.status).toBe("done");
    expect(result.value).not.toHaveProperty("error");

    if (!("error" in result.value) && result.status === "done") {
      await allSettled(setSelectedMovieVideos, {
        params:
          result.status === "done" && !("error" in result.value)
            ? result.value
            : INITIAL_DATA.currentMovieVideos,
        scope,
      });

      const moviesState = scope.getState($movies);

      expect(moviesState.currentMovieVideos.length).toBe(
        mockMoviesInstance.currentMovieVideos?.length,
      );
    }
  });

  it("should handle the error thrown by fetchMovieVideosFx", async () => {
    const errorMessage = "Failed to load fetchMovieVideosFx";
    const returnValue = { error: errorMessage };
    (getMovieVideos as jest.Mock).mockResolvedValue(returnValue);

    const scope = fork();

    // Calls the provided unit within the current scope and wait for all triggered effects to complete.
    const result = await allSettled(fetchMovieVideosFx, {
      params: {
        url: `https://api.themoviedb.org/3/movie/${faker.number.int()}/videos?language=en-US&api_key=${process.env.NEXT_PRIVATE_MOVIES_TOKEN}`,
      },
      scope,
    });

    expect(result.status).toBe("done");
    expect(result.value).toHaveProperty("error");
    expect(result.value).toBe(returnValue);
  });
});
