import { Model } from "objection";

export default class CountryDAO extends Model {
  static get tableName() {
    return "Country";
  }

  static get idColumn() {
    return "id";
  }
}
