import { z } from "zod";
import { zodContract } from "@farfetched/zod";

const MovieDataSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string().nullable(),
  popularity: z.number(),
  poster_path: z.string(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const MoviesResponseSchema = z.object({
  page: z.number(),
  results: z.array(MovieDataSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export const MoviesResponseContract = zodContract(MoviesResponseSchema);

export type MovieData = z.infer<typeof MovieDataSchema>;
export type MoviesResponse = z.infer<typeof MoviesResponseSchema>;

export const MovieDetailsResponseSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  belongs_to_collection: z.string().nullable(),
  budget: z.number(),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
  homepage: z.string().nullable(),
  id: z.number(),
  imdb_id: z.string(),
  original_language: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  production_companies: z.array(
    z.object({
      id: z.number(),
      logo_path: z.string().nullable(),
      name: z.string(),
      origin_country: z.string(),
    }),
  ),
  production_countries: z.array(
    z.object({
      iso_3166_1: z.string(),
      name: z.string(),
    }),
  ),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z.array(
    z.object({
      english_name: z.string(),
      iso_639_1: z.string(),
      name: z.string(),
    }),
  ),
  status: z.string(),
  tagline: z.string().nullable(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const MovieDetailsResponseContract = zodContract(
  MovieDetailsResponseSchema,
);

export type MovieDetailsResponse = z.infer<typeof MovieDetailsResponseSchema>;

export const MovieVideoSchema = z.object({
  id: z.string(),
  iso_639_1: z.string(),
  iso_3166_1: z.string(),
  name: z.string(),
  key: z.string(),
  site: z.string(),
  size: z.number(),
  type: z.string(),
});

export const MovieVideosResponseSchema = z.object({
  id: z.number(),
  results: z.array(MovieVideoSchema),
});

export const MovieVideosResponseContract = zodContract(
  MovieVideosResponseSchema,
);

export type MovieVideo = z.infer<typeof MovieVideoSchema>;
export type MovieVideosResponse = z.infer<typeof MovieVideosResponseSchema>;
