jest.mock("#/shared/api/api", () => ({
  __esModule: true,
  getMovies: jest.fn(),
}));

import { allSettled, fork } from "effector";

import deepmerge from "deepmerge";

import { $movies, INITIAL_DATA } from "#/entities/movies/model/movies";
import { MoviesStore } from "../types";
import { generateRandomMoviesStore } from "../lib/movies-utils";
import { getMovies } from "#/shared/api/api";
import { requestMoviesFx } from "./effects";
import { setMovies } from "./events";

describe("Movies Store", () => {
  const mockedMoviesStore: MoviesStore = generateRandomMoviesStore();

  it("should return the initial movies store state", () => {
    const scope = fork();
    const state = scope.getState($movies);
    expect(state).toEqual(INITIAL_DATA);
  });

  it("should update the movies store as expected", async () => {
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
    }

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
});
