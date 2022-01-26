import { Genre } from "../../models/genre";
import { SingleMovie } from "../../models/movie";
import { knex } from "../connection";

export default class MovieService {
  async createTable() {
    if (await knex.schema.hasTable("Movie")) {
      return;
    }

    await knex.schema.createTable("Movie", (table) => {
      table.integer("id").primary();
      table.boolean("adult");
      table.string("backdrop_path");
      table.integer("belongs_to_collection");
      table.bigInteger("budget");
      table.string("homepage");
      table.string("imdb_id");
      table
        .string("original_language")
        .references("iso_639_1")
        .inTable("Language");
      table.string("original_title");
      table.string("overview", 1000);
      table.float("popularity");
      table.string("poster_path");
      table.string("release_date");
      table.bigInteger("revenue");
      table.integer("runtime");
      table.string("status");
      table.string("tagline");
      table.string("title");
      table.boolean("video");
      table.float("vote_average");
      table.integer("vote_count");
    });
  }

  async deleteAll() {
    await knex.schema.dropTableIfExists("MovieCountry");
    await knex.schema.dropTableIfExists("Country");
    await knex.schema.dropTableIfExists("MovieGenre");
    await knex.schema.dropTableIfExists("Genre");
    await knex.schema.dropTableIfExists("MovieProductionCompany");
    await knex.schema.dropTableIfExists("ProductionCompany");

    await knex.schema.dropTableIfExists("MovieLanguage");
    await knex.schema.dropTableIfExists("Movie");
    await knex.schema.dropTableIfExists("Language");
  }

  async add(movie: SingleMovie) {
    const {
      genres,
      production_companies,
      production_countries,
      spoken_languages,
      ...movieData
    } = movie;

    await knex("Movie").insert(movieData);

    const movieGenreData = genres.map((data: Genre) => ({
      movie_id: movieData.id,
      genre_id: data.id,
    }));

    await knex.batchInsert("MovieGenre", movieGenreData);

    const movieCountryData = production_countries.map((data) => ({
      movie_id: movieData.id,
      country_id: data?.iso_3166_1,
    }));

    await knex.batchInsert("MovieCountry", movieCountryData);

    const movieLanguageData = spoken_languages.map((data) => ({
      movie_id: movieData.id,
      language_id: data?.iso_639_1,
    }));
    await knex.batchInsert("MovieLanguage", movieLanguageData);

    for (let i = 0; i < production_companies?.length; i++) {
      const company = production_companies[i];
      await knex("ProductionCompany")
        .select()
        .where("id", company.id)
        .then(async (rows) => {
          if (rows.length === 0) {
            return await knex("ProductionCompany").insert(company);
          }
        });
    }

    const movieProdComData = production_companies.map((data) => ({
      movie_id: movieData.id,
      production_company_id: data?.id,
    }));
    await knex.batchInsert("MovieProductionCompany", movieProdComData);
  }

  async getById(id: number) {
    return await knex("Movie").select().where("id", id);
  }

  constructor() {}
}

// {
//   adult: false,
//   backdrop_path: '/k2twTjSddgLc1oFFHVibfxp2kQV.jpg',
//   genre_ids: [ 28, 12, 14, 878 ],
//   id: 524434,
//   original_language: 'en', ======> should be FK
//   original_title: 'Eternals',
//   overview: 'The Eternals are a team of ancient aliens who have been living on Earth in secret for thousands of years. When an unexpected tragedy forces them out of the shadows, they are forced to reunite against mankind’s most ancient enemy, the Deviants.',
//   popularity: 7590.729,
//   poster_path: '/6AdXwFTRTAzggD2QUTt5B7JFGKL.jpg',
//   release_date: '2021-11-03',
//   title: 'Eternals',
//   video: false,
//   vote_average: 7.3,
//   vote_count: 3513
// }

// {
//   belongs_to_collection: null,
//   budget: 200000000,
//   genres: [ [Object], [Object], [Object], [Object] ], ===================
//   homepage: 'https://www.marvel.com/movies/the-eternals',
//   imdb_id: 'tt9032400',
//   production_companies: [ [Object] ],
//   production_countries: [ [Object] ],
//   revenue: 401972153,
//   runtime: 156,
//   spoken_languages: [ [Object], [Object], [Object], [Object], [Object] ],
//   status: 'Released',
//   tagline: 'In the beginning...',
// }
