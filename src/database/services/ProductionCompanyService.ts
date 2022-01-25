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

  constructor() {}
}
