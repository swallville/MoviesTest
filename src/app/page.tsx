"use client";
import { useCallback, useEffect } from "react";
import { isEmpty } from "rambdax";

import Image from "next/image";
import Link from "next/link";

import { selectors as moviesSelectors } from "#/entities/movies";
import Carrousel from "#/shared/ui/Carrousel/Carrousel";
import { createImageUrl } from "#/shared/lib/utils/createImageUrl";

export default function Home() {
  const movies = moviesSelectors.useMovies();
  const moviesRequested = moviesSelectors.useMoviesRequested();
  const moviesRequestIsPending = moviesSelectors.useMoviesRequestIsPending();
  const moviesCurrentPage = moviesSelectors.useMoviesCurrentPage();
  const movie = moviesSelectors.useGetCurrentMovieDetails();
  const updatedSelectedMovieDetails = moviesSelectors.useSetSelectedMovieDetails();
  const updatedSelectedMovieVideos = moviesSelectors.useSetSelectedMovieVideos();

  const onLoadMore = useCallback(() => {
    moviesRequested(moviesCurrentPage + 1);
  }, [moviesCurrentPage, moviesRequested]);

  useEffect(() => {
    if (isEmpty(movies)) {
      moviesRequested(1);
    }

    if (movie) {
      updatedSelectedMovieDetails(null);
      updatedSelectedMovieVideos([]);
    }
  }, [movie, movies, moviesRequested, updatedSelectedMovieDetails, updatedSelectedMovieVideos]);

  return (
    <section className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full flex-col items-center">
        <Carrousel loadMore={onLoadMore} loading={moviesRequestIsPending || movies.length === 0}>
          {movies.map((movie) => (
            <Link key={movie.id} href={`/movies/${movie.id}`}>
              <Image
                src={createImageUrl(movie.poster_path, "w185")}
                alt={movie.title}
                className="shadow-lg"
                loading="lazy"
                width={0}
                height={0}
                style={{ width: '50vw', height: 'auto' }}
              />
            </Link>
          ))}
        </Carrousel>
      </main>
    </section>
  );
}
