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

  constructor() {}
}
