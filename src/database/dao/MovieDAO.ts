import { Model } from "objection";
import GenreDAO from "./GenreDAO";

export default class MovieDAO extends Model {
  static get tableName() {
    return "Movie";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      movies: {
        relation: Model.ManyToManyRelation,
        modelClass: GenreDAO,
        join: {
          from: "Movie.id",
          // ManyToMany relation needs the `through` object
          // to describe the join table.
          through: {
            // If you have a model class for the join table
            // you need to specify it like this:
            // modelClass: PersonMovie,
            from: "Movie_Genre.genreId",
            to: "Movie_Genre.movieId",
          },
          to: "Genre.id",
        },
      },
    };
  }
}
