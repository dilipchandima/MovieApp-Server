import { ProductionCountry } from "../../models/movie";
import { knex } from "../connection";

export default class CountryService {
  async createTable() {
    if (await knex.schema.hasTable("Country")) {
      return;
    }

    await knex.schema.createTable("Country", (table) => {
      table.string("iso_3166_1").primary();
      table.string("english_name");
      table.string("native_name");
    });
  }

  async createRelationTable() {
    if (await knex.schema.hasTable("MovieCountry")) {
      return;
    }

    await knex.schema.createTable("MovieCountry", (table) => {
      table.increments("id").primary();
      table.integer("movie_id").references("id").inTable("Movie");
      table.string("country_id").references("iso_3166_1").inTable("Country");
    });
  }

  async insertMany(data: ProductionCountry[]) {
    await knex.batchInsert("Country", data);
  }

  constructor() {}
}
