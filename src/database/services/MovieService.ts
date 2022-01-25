import { knex } from "../connection";

export default class MovieService {
  async createTable() {
    if (await knex.schema.hasTable("Movie")) {
      return;
    }

    await knex.schema.createTable("Movie", (table) => {
      table.integer("id").primary();
      table.string("name");
    });
  }

  constructor() {}
}
