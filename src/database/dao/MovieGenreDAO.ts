import { Model } from "objection";

export default class MovieGenreDAO extends Model {
  static get tableName() {
    return "Movie_Genre";
  }
}
