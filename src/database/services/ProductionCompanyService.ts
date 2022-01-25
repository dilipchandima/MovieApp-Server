import { knex } from "../connection";

export default class ProductionCompanyService {
  async createTable() {
    if (await knex.schema.hasTable("ProductionCompany")) {
      return;
    }

    await knex.schema.createTable("ProductionCompany", (table) => {
      table.integer("id").primary();
      table.string("name");
      table.string("logo_path");
      table.string("origin_country");
    });
  }

  async createRelationTable() {
    if (await knex.schema.hasTable("MovieProductionCompany")) {
      return;
    }

    await knex.schema.createTable("MovieProductionCompany", (table) => {
      table.increments("id").primary();
      table.integer("movie_id").references("id").inTable("Movie");
      table
        .integer("production_company_id")
        .references("id")
        .inTable("ProductionCompany");
    });
  }

  constructor() {}
}
