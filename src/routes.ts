import express, { Router } from "express";

import * as GenreController from "./controllers/genre";
import * as MovieController from "./controllers/movie";

const router: Router = express.Router();

router.get("/movies/popular", MovieController.getPopularMovies);
router.get("/movies/latest", MovieController.getLatestMovies);
router.get("/movie/:movieId", MovieController.getMovie);

router.get("/genres", GenreController.getGenres);

export default router;
