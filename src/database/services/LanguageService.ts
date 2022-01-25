import { knex } from "../connection";

export default class LanguageService {
  async createTable() {
    if (await knex.schema.hasTable("Language")) {
      return;
    }

    await knex.schema.createTable("Language", (table) => {
      table.integer("id").primary();
      table.string("name");
      table.string("english_name");
      table.string("iso_639_1");
    });
  }

  async createRelationTable() {
    if (await knex.schema.hasTable("MovieLanguage")) {
      return;
    }

    await knex.schema.createTable("MovieLanguage", (table) => {
      table.integer("id").primary();
      table.integer("movie_id").references("id").inTable("Movie");
      table.integer("language_id").references("id").inTable("Language");
    });
  }

  constructor() {}
}
