import { faker } from "@faker-js/faker";

import { MovieData } from "../model/apiSchema";
import { MoviesStore } from "../types";

export const generateRandomMoviesStore = (): MoviesStore => {
  const numberOfMovies = Math.floor(Math.random() * 10) + 1; // between 1 and 10 movies
  const movies: MovieData[] = [];

  for (let i = 0; i < numberOfMovies; i++) {
    movies.push({
      adult: faker.datatype.boolean(),
      backdrop_path: faker.image.url(),
      genre_ids: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () =>
        faker.number.int(),
      ),
      id: faker.number.int(),
      original_language: faker.lorem.word(2),
      original_title: faker.lorem.words(3),
      overview: faker.lorem.paragraph(),
      popularity: faker.number.float({ min: 0, max: 100 }),
      poster_path: faker.image.url(),
      release_date: faker.date.past().toISOString(),
      title: faker.lorem.words(2),
      video: faker.datatype.boolean(),
      vote_average: faker.number.float({ min: 0, max: 10 }),
      vote_count: faker.number.int({ min: 0, max: 1000 }),
    });
  }

  return {
    movies,
    selectedMovieID: 1,
    currentPage: 1,
    totalPages: 5,
    currentMovieDetails: {
      adult: faker.datatype.boolean(),
      backdrop_path: faker.image.url(),
      id: movies[0]!.id,
      overview: movies[0]!.overview ?? "",
      poster_path: faker.image.url(),
      release_date: faker.date.past().toISOString(),
      title: movies[0]!.title,
      video: faker.datatype.boolean(),
      vote_average: movies[0]!.vote_average,
      vote_count: movies[0]!.vote_count,
      popularity: movies[0]!.popularity,
      original_language: movies[0]!.original_language,
      budget: faker.number.int({ min: 1000, max: 100000000 }),
      belongs_to_collection: null,
      genres: [
        {
          id: faker.number.int(),
          name: faker.lorem.word(),
        },
      ],
      homepage: faker.internet.url(),
      imdb_id: faker.string.alphanumeric(9),
      production_companies: [
        {
          id: faker.number.int(),
          logo_path: null,
          name: faker.company.name(),
          origin_country: faker.address.countryCode(),
        },
      ],
      production_countries: [
        {
          iso_3166_1: faker.address.countryCode(),
          name: faker.address.country(),
        },
      ],
      revenue: faker.number.int({ min: 1000, max: 1000000000 }),
      runtime: faker.number.int({ min: 60, max: 240 }),
      spoken_languages: [
        {
          english_name: faker.lorem.word(),
          iso_639_1: faker.lorem.word(2),
          name: faker.lorem.word(),
        },
      ],
      status: "Released",
      tagline: faker.lorem.sentence(),
    },
    currentMovieVideos: [
      {
        id: faker.string.uuid(),
        iso_639_1: "en",
        iso_3166_1: "US",
        key: faker.string.alphanumeric(11),
        name: faker.lorem.words(3),
        site: "YouTube",
        size: 1080,
        type: "Trailer",
      },
    ],
    favoriteMovies: movies.slice(0, 2).map((movie) => movie.id.toString()), // first two movies as favorites
  };
};
