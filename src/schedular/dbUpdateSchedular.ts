import { scheduleJob } from "node-schedule";
import CountryService from "../database/services/CountryService";
import GenreService from "../database/services/GenreService";
import LanguageService from "../database/services/LanguageService";
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

const updateGenres = async () => {
  try {
    const genreService = new GenreService();
    const countryService = new CountryService();
    const languageService = new LanguageService();
    const productionCompanyService = new ProductionCompanyService();

    await genreService.createTable();
    await countryService.createTable();
    await languageService.createTable();
    await productionCompanyService.createTable();

    const result = await ConsumerApi({ url: "/genre/movie/list" });
    const data: { genres: Genre[] } = result.data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
