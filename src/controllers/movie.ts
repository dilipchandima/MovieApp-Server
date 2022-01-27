import { Request, Response, NextFunction } from "express";
import MovieService from "../database/services/MovieService";
import ConsumerApi from "../libraries/consumerApi";
import { Movie } from "../models/movie";

const getPopularMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page: number = Number(req.query.page || 1);
  try {
    const result = await ConsumerApi({ url: "/movie/popular", page });
    const data: Movie[] = result.data;

    return res.status(200).json({
      data,
    });
  } catch (error: any) {
    return res.status(error.response.status).json({
      message: error.response.data,
    });
  }
};

const getLatestMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await ConsumerApi({ url: "/movie/latest" });
    const data: Movie = result.data;

    return res.status(200).json({
      data,
    });
  } catch (error: any) {
    return res.status(error.response.status).json({
      message: error.response.data,
    });
  }
};

const getMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movieId = req.params.movieId;

    const movieService = new MovieService();
    const data = await movieService.getById(Number(movieId));

    return res.status(200).json({
      data,
    });
  } catch (error: any) {
    return res.status(error.response.status).json({
      message: error.response.data,
    });
  }
};

export { getPopularMovies, getLatestMovies, getMovie };
