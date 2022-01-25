import { Genre } from "../../models/genre";
import { knex } from "../connection";
import GenreDAO from "../dao/GenreDAO";

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

  async add(genre: Genre) {
    if (await this.findById(genre.id)) {
      return await GenreDAO.query().findById(genre.id).update(genre);
    }

    return await GenreDAO.query().insertAndFetch(genre);
  }

  // async list() {
  //   return await GenreDAO.query();
  // }

  async findById(id = 0) {
    return await GenreDAO.query().findById(id);
  }

  constructor() {}
}
