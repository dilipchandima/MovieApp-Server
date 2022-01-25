import { knex } from "../connection";

export default class CountryService {
  async createTable() {
    if (await knex.schema.hasTable("Country")) {
      return;
    }

    await knex.schema.createTable("Country", (table) => {
      table.integer("id").primary();
      table.string("name");
      table.string("iso_3166_1");
    });
  }

  constructor() {}
}
