"use client";

import { useCallback, useEffect, useState } from "react";

import Image from "next/image";

import { selectors as moviesSelectors } from "#/entities/movies";
import Loading from "#/shared/ui/Loading/Loading";
import { createImageUrl } from "#/shared/lib/utils/createImageUrl";
import Header from "#/shared/ui/Header/Header";
import { VideoPlayer } from "#/shared/ui/VideoPlayer/VideoPlayer";
import { VideoCard } from "../VideoCard/VideoCard";

interface MovieDetailsProps {
  id: number;
}
export const MovieDetails = ({ id }: MovieDetailsProps) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const movie = moviesSelectors.useGetCurrentMovieDetails();
  const movieVideos = moviesSelectors.useGetCurrentMovieVideos();
  const movieDetailsRequested = moviesSelectors.useMovieDetailsRequested();
  const movieVideosRequested =
    moviesSelectors.useSelectedMovieVideosRequested();

  const addFavoriteMovie = moviesSelectors.useAddFavoriteMovie();
  const removeFavoriteMovie = moviesSelectors.useRemoveFavoriteMovie();
  const isMovieFavorite = moviesSelectors.useIsMovieFavorite(String(id));

  const onVideoCardClick = useCallback((videoKey: string) => {
    setSelectedVideo(videoKey);
  }, []);

  const onCloseVideo = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  useEffect(() => {
    movieVideosRequested(id);
  }, [id, movieVideosRequested]);

  useEffect(() => {
    movieDetailsRequested(id);
  }, [id, movieDetailsRequested]);

  if (movie) {
    return (
      <>
        {/** movie title */}
        <Header
          goBackButton={false}
          defaultBackgroundColor="secondary"
          title={movie.title}
        />

        <section className="flex items-center justify-center py-6 px-6">
          <main className="flex flex-col gap-6 w-full items-start">
            {/** movie main info container */}
            <section className="flex flex-row gap-4 max-h-42.5 md:max-w-2xl">
              {/** movie poster */}
              <Image
                src={createImageUrl(movie.poster_path, "w185")}
                alt={movie.title}
                className="shadow-lg rounded-xs w-28.75 h-auto"
                loading="lazy"
                width={0}
                height={0}
              />

              <div className="flex flex-col justify-between">
                <div className="flex flex-col">
                  {/** movie year */}
                  <span className="font-[Roboto] text-xl font-normal leading-6 text-[#212121]">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                  {/** movie duration */}
                  <span className="font-[Roboto] text-sm font-normal leading-6 text-[#212121]">
                    {`${movie.runtime} mins`}
                  </span>
                  {/** movie rating */}
                  <span className="font-[Roboto] text-sm font-bold leading-6 text-[#212121]">
                    {`${Number(movie.vote_average).toFixed(1)}/10`}
                  </span>
                </div>

                {/** add to favorites button */}
                <button
                  type="button"
                  className="mt-4 inline-flex items-center rounded-xs bg-[#746A64] px-6 py-4 text-base leading-6 font-medium text-white hover:text-[#DEDEDE] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#746A64] w-full h-14 cursor-pointer"
                  aria-label={
                    isMovieFavorite ? "Remove from Favorite" : "Add to Favorite"
                  }
                  onClick={() => {
                    if (isMovieFavorite) {
                      removeFavoriteMovie(String(id));
                    } else {
                      addFavoriteMovie(String(id));
                    }
                  }}
                >
                  {isMovieFavorite ? "Remove from Favorite" : "Add to Favorite"}
                </button>
              </div>
            </section>
            {/** movie overview container */}
            <h2 className="mt-4 max-w-2xl text-left font-[Roboto] text-sm font-medium leading-6 text-[#757575]">
              {movie.overview}
            </h2>
            {/** movie trailers container */}
            <section className="flex flex-col gap-4 w-full">
              <h3 className="font-[Roboto] text-sm font-medium leading-6 tracking-[2%] text-[#757575] border-b border-[#DEDEDE]">
                TRAILERS
              </h3>
              {/** trailers videos */}
              <div className="flex flex-col gap-2 overflow-x-auto w-full">
                {movieVideos.length > 0 ? (
                  <>
                    {movieVideos.map((video, index) => (
                      <VideoCard
                        key={video.id}
                        onClick={() => onVideoCardClick(video.key)}
                        index={index}
                      />
                    ))}
                  </>
                ) : (
                  <Loading />
                )}
              </div>
            </section>
          </main>
        </section>

        {selectedVideo && (
          <VideoPlayer
            selectedVideo={selectedVideo}
            onCloseVideo={onCloseVideo}
          />
        )}
      </>
    );
  }

  return <Loading />;
};
