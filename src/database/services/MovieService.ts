import ConsumerApi from "../../libraries/consumerApi";
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
      belongs_to_collection,
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
      knex("ProductionCompany")
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
    const data = await knex("Movie").select().where("id", id);

    if (data.length > 0) {
      const genres = await knex("Genre")
        .leftJoin("MovieGenre", "Genre.id", "MovieGenre.genre_id")
        .select("Genre.*")
        .where("MovieGenre.movie_id", id);

      const spoken_languages = await knex("Language")
        .leftJoin(
          "MovieLanguage",
          "Language.iso_639_1",
          "MovieLanguage.language_id"
        )
        .select("Language.*")
        .where("MovieLanguage.movie_id", id);

      const result = { ...data[0], spoken_languages, genres };

      return result;
    } else {
      const response = await ConsumerApi({ url: `/movie/${id}` });
      this.add(response.data);
      return response.data;
    }
  }

  constructor() {}
}
