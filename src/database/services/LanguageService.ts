import { Language } from "../../models/movie";
import { knex } from "../connection";
import LanguageDAO from "../dao/LanguageDAO";

export default class LanguageService {
  async createTable() {
    if (await knex.schema.hasTable("Language")) {
      return;
    }

    await knex.schema.createTable("Language", (table) => {
      table.integer("id").primary();
      table.string("name");
      table.string("english_name");
      table.string("iso_639_1");
    });
  }

  async add(object: Language) {
    if (await this.findById(object.id)) {
      return await LanguageDAO.query().findById(object.id).update(object);
    }

    return await LanguageDAO.query().insertAndFetch(object);
  }

  async list() {
    return await LanguageDAO.query();
  }

  async findById(id = 0) {
    return await LanguageDAO.query().findById(id);
  }

  constructor() {}
}
