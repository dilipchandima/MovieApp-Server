import { Request, Response, NextFunction } from "express";
import ConsumerApi from "../libraries/consumerApi";
import { Genre } from "../models/genre";

const getGenres = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ConsumerApi({ url: "/genre/movie/list" });
    const data: Genre[] = result.data;

    return res.status(200).json({
      data,
    });
  } catch (error: any) {
    return res.status(error.response.status).json({
      message: error.response.data,
    });
  }
};

export { getGenres };
