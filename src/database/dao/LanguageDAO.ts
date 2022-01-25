import { Model } from "objection";

export default class LanguageDAO extends Model {
  static get tableName() {
    return "Language";
  }
}
