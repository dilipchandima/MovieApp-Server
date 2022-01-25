import { scheduleJob } from "node-schedule";
import CountryService from "../database/services/CountryService";
import GenreService from "../database/services/GenreService";
import LanguageService from "../database/services/LanguageService";
import MovieService from "../database/services/MovieService";
import ProductionCompanyService from "../database/services/ProductionCompanyService";
import ConsumerApi from "../libraries/consumerApi";
import { Genre } from "../models/genre";
import { Language } from "../models/movie";

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

    await movieService.deleteAll();

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

    const languages = await ConsumerApi({ url: "/configuration/languages" });
    const countries = await ConsumerApi({ url: "/configuration/countries" });
    // const companies = await ConsumerApi({ url: "/search/company" });
    const genres = await ConsumerApi({ url: "/genre/movie/list" });
    const data: Language[] = languages.data;

    // languageService.insertMany(data);
    console.log(languages.data, countries.data, genres.data);
  } catch (error) {
    console.log(error);
  }
};
