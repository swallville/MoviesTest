jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn().mockReturnValue("/movies"),
}));

import deepmerge from "deepmerge";

import { render, screen } from "#/shared/lib/test/test-utils";
import { INITIAL_DATA } from "#/entities/movies";
import { generateRandomMoviesStore } from "#/entities/movies/lib/movies-utils";
import { MoviesStore } from "#/entities/movies/types";
import { selectors as moviesSelectors } from "#/entities/movies";

import { MovieDetails } from "./MovieDetails";

describe("MovieDetails", () => {
  const mockedMoviesStore: MoviesStore = generateRandomMoviesStore();
  const mockMoviesInstance = deepmerge(INITIAL_DATA, mockedMoviesStore);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the MovieDetails content and elements", () => {
    jest
      .spyOn(moviesSelectors, "useGetCurrentMovieDetails")
      .mockReturnValue(mockMoviesInstance.currentMovieDetails);
    jest
      .spyOn(moviesSelectors, "useGetCurrentMovieVideos")
      .mockReturnValue(mockMoviesInstance.currentMovieVideos);

    render(
      <MovieDetails id={mockMoviesInstance.currentMovieDetails?.id ?? 0} />,
    );

    expect(screen.queryByTestId("movie-year")).toBeInTheDocument();
    expect(screen.getByTestId("movie-year")).toHaveTextContent(
      new Date(mockMoviesInstance.currentMovieDetails?.release_date || "")
        .getFullYear()
        .toString(),
    );
    expect(screen.queryByTestId("movie-duration")).toBeInTheDocument();
    expect(screen.getByTestId("movie-duration")).toHaveTextContent(
      `${mockMoviesInstance.currentMovieDetails?.runtime} mins`,
    );
    expect(screen.queryByTestId("movie-rating")).toBeInTheDocument();
    expect(screen.getByTestId("movie-rating")).toHaveTextContent(
      `${Number(mockMoviesInstance.currentMovieDetails?.vote_average).toFixed(1)}/10`,
    );
    expect(screen.queryByTestId("header-title-secondary")).toBeInTheDocument();
    expect(screen.getByTestId("header-title-secondary")).toHaveTextContent(
      mockMoviesInstance.currentMovieDetails?.title || "",
    );
    expect(screen.queryByTestId("movie-poster")).toBeInTheDocument();
    expect(screen.queryByTestId("movie-overview")).toBeInTheDocument();
    expect(screen.getByTestId("movie-overview")).toHaveTextContent(
      mockMoviesInstance.currentMovieDetails?.overview || "",
    );
    expect(screen.queryByTestId("trailers-heading")).toBeInTheDocument();
    expect(
      screen.queryByTestId("trailers-videos-container"),
    ).toBeInTheDocument();
    mockMoviesInstance.currentMovieVideos.forEach((_, index) => {
      expect(screen.queryByTestId(`video-card-${index}`)).toBeInTheDocument();
      expect(
        screen.queryByTestId(`video-card-image-${index}`),
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId(`video-card-text-${index}`),
      ).toHaveTextContent(`Play trailer ${index + 1}`);
    });
  });
});
