import { Model } from "objection";

export default class ProductionCompanyDAO extends Model {
  static get tableName() {
    return "ProductionCompany";
  }
}
