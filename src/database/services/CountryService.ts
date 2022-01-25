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

  async createRelationTable() {
    if (await knex.schema.hasTable("MovieCountry")) {
      return;
    }

    await knex.schema.createTable("MovieCountry", (table) => {
      table.integer("id").primary();
      table.integer("movie_id").references("id").inTable("Movie");
      table.integer("country_id").references("id").inTable("Country");
    });
  }

  constructor() {}
}
