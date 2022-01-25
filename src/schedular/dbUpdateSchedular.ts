import { scheduleJob } from "node-schedule";
import CountryService from "../database/services/CountryService";
import GenreService from "../database/services/GenreService";
import LanguageService from "../database/services/LanguageService";
import MovieService from "../database/services/MovieService";
import ProductionCompanyService from "../database/services/ProductionCompanyService";
import ConsumerApi from "../libraries/consumerApi";
import { Genre } from "../models/genre";

export const startSchedular = () => {
  console.log("Starting schedular");
  scheduleJob("*/5 * * * * *", async () => {
    console.log("============= Schedular STARTED =========");
    await updateGenres();
    console.log("============= Schedular END =========");
  });
};

export const updateGenres = async () => {
  try {
    const genreService = new GenreService();
    const countryService = new CountryService();
    const languageService = new LanguageService();
    const productionCompanyService = new ProductionCompanyService();
    const movieService = new MovieService();

    await genreService.createTable();
    await countryService.createTable();
    await languageService.createTable();
    await productionCompanyService.createTable();
    await movieService.createTable();

    //crete MnM tables
    await genreService.createRelationTable();
    await countryService.createRelationTable();
    await languageService.createRelationTable();
    await productionCompanyService.createRelationTable();

    const result = await ConsumerApi({ url: "/genre/movie/list" });
    const data: { genres: Genre[] } = result.data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
