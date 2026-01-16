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

describe("Movies Store", () => {
  const mockedMoviesStore: MoviesStore = generateRandomMoviesStore();

  it("should return the initial movies store state", () => {
    const scope = fork();
    const state = scope.getState($movies);
    expect(state).toEqual(INITIAL_DATA);
  });

  it("should return a valid movies API instance", async () => {
    const mockMoviesInstance = deepmerge(INITIAL_DATA, mockedMoviesStore);
    const returnValue = {
      results: mockMoviesInstance.movies,
      page: mockMoviesInstance.currentPage,
      total_pages: mockMoviesInstance.totalPages,
    };

    (getMovies as jest.Mock).mockResolvedValue(returnValue);

    const scope = fork();

    const result = await allSettled(requestMoviesFx, {
      params: {
        url: `http://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PRIVATE_MOVIES_TOKEN}&page=1`,
      },
      scope,
    });

    expect(result.status).toBe("done");
    expect(result.value).toEqual(returnValue);
    const moviesState = scope.getState($movies);

    expect(moviesState).not.toBeNull();
  });

  it("should handle the error thrown by loadCartApi", async () => {
    const errorMessage = "Failed to load cart API";
    const returnValue = { error: errorMessage };
    (getMovies as jest.Mock).mockResolvedValue(returnValue);

    const scope = fork();

    const result = await allSettled(requestMoviesFx, {
      params: {
        url: `http://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PRIVATE_MOVIES_TOKEN}&page=1`,
      },
      scope,
    });

    expect(result.status).toBe("done");
    expect(result.value).toBe(returnValue);
  });
});
