import { knex } from "../connection";

export default class GenreService {
  async createTable() {
    if (await knex.schema.hasTable("Genre")) {
      return;
    }

    await knex.schema.createTable("Genre", (table) => {
      table.integer("id").primary();
      table.string("name");
    });
  }

  async createRelationTable() {
    if (await knex.schema.hasTable("MovieGenre")) {
      return;
    }

    await knex.schema.createTable("MovieGenre", (table) => {
      table.increments("id").primary();
      table.integer("movie_id").references("id").inTable("Movie");
      table.integer("genre_id").references("id").inTable("Genre");
    });
  }

  constructor() {}
}
