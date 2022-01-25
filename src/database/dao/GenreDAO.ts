import { Model } from "objection";

export default class GenreDAO extends Model {
  static get tableName() {
    return "Genre";
  }
}
