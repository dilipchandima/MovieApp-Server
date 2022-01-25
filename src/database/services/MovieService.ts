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
      table.string("original_language");
      table.string("original_title");
      table.string("overview");
      table.integer("popularity");
      table.string("poster_path");
      table.string("release_date");
      table.string("title");
      table.string("video");
      table.integer("vote_average");
      table.integer("vote_count");
      table.integer("belongs_to_collection");
      table.integer("budget");
      table.string("imdb_id");
      table.integer("revenue");
      table.integer("runtime");
      table.string("status");
      table.string("tagline");
    });
  }

  async deleteAll() {
    await knex.schema.dropTableIfExists("MovieCountry");
    await knex.schema.dropTableIfExists("Country");
    await knex.schema.dropTableIfExists("MovieGenre");
    await knex.schema.dropTableIfExists("Genre");
    await knex.schema.dropTableIfExists("MovieLanguage");
    await knex.schema.dropTableIfExists("Language");
    await knex.schema.dropTableIfExists("MovieProductionCompany");
    await knex.schema.dropTableIfExists("ProductionCompany");
    await knex.schema.dropTableIfExists("Movie");
  }

  constructor() {}
}
