import { Language } from "../../models/movie";
import { knex } from "../connection";

export default class LanguageService {
  async createTable() {
    if (await knex.schema.hasTable("Language")) {
      return;
    }

    await knex.schema.createTable("Language", (table) => {
      table.string("iso_639_1").primary();
      table.string("name");
      table.string("english_name");
    });
  }

  async createRelationTable() {
    if (await knex.schema.hasTable("MovieLanguage")) {
      return;
    }

    await knex.schema.createTable("MovieLanguage", (table) => {
      table.increments("id").primary();
      table.integer("movie_id").references("id").inTable("Movie");
      table.string("language_id").references("iso_639_1").inTable("Language");
    });
  }

  async insertMany(languages: Language[]) {
    await knex.batchInsert("Language", languages);
  }

  constructor() {}
}
