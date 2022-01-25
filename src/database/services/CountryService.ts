import { ProductionCountry } from "../../models/movie";
import { knex } from "../connection";
import CountryDAO from "../dao/CountryDAO";

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

  async add(object: ProductionCountry) {
    if (await this.findById(object.id)) {
      return await CountryDAO.query().findById(object.id).update(object);
    }

    return await CountryDAO.query().insertAndFetch(object);
  }

  async list() {
    return await CountryDAO.query();
  }

  async findById(id = 0) {
    return await CountryDAO.query().findById(id);
  }

  constructor() {}
}
