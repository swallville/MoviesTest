import { useUnit } from "effector-react";

import { $movies } from "./movies";
import { addMovieToFavorites, moviesRequested, removeMovieFromFavorites, selectedMovieRequested, selectedMovieVideosRequested, setSelectedMovieDetails, setSelectedMovieVideos } from "./events";
import { moviesQuery } from "./effects";


export const selectors = {
    useMovies: () => useUnit($movies.map((store) => store.movies)),
    useMoviesCurrentPage: () => useUnit($movies.map((store) => store.currentPage)),
    useMoviesRequested: () => useUnit(moviesRequested),
    useMovieDetailsRequested: () => useUnit(selectedMovieRequested),
    useMoviesRequestIsPending: () => useUnit(moviesQuery.$status.map((status) => status === "pending")),
    useGetCurrentMovieDetails: () => useUnit($movies.map((store) => store.currentMovieDetails)),
    useSetSelectedMovieDetails: () => useUnit(setSelectedMovieDetails),
    useSelectedMovieVideosRequested: () => useUnit(selectedMovieVideosRequested),
    useGetCurrentMovieVideos: () => useUnit($movies.map((store) => store.currentMovieVideos)),
    useSetSelectedMovieVideos: () => useUnit(setSelectedMovieVideos),
    useIsMovieFavorite: (movieId: string) => useUnit($movies.map((store) => store.favoriteMovies.includes(movieId))),
    useAddFavoriteMovie: () => useUnit(addMovieToFavorites),
    useRemoveFavoriteMovie: () => useUnit(removeMovieFromFavorites),
};