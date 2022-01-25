import { ProductionCompany } from "../../models/movie";
import { knex } from "../connection";
import ProductionCompanyDAO from "../dao/ProductionCompanyDAO";

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

  async add(object: ProductionCompany) {
    if (await this.findById(object.id)) {
      return await ProductionCompanyDAO.query()
        .findById(object.id)
        .update(object);
    }

    return await ProductionCompanyDAO.query().insertAndFetch(object);
  }

  async list() {
    return await ProductionCompanyDAO.query();
  }

  async findById(id = 0) {
    return await ProductionCompanyDAO.query().findById(id);
  }

  constructor() {}
}
