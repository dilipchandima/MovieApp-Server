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

  constructor() {}
}
