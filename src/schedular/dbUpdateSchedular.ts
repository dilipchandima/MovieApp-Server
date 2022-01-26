import { scheduleJob } from "node-schedule";
import CountryService from "../database/services/CountryService";
import GenreService from "../database/services/GenreService";
import LanguageService from "../database/services/LanguageService";
import MovieService from "../database/services/MovieService";
import ProductionCompanyService from "../database/services/ProductionCompanyService";
import ConsumerApi from "../libraries/consumerApi";
import { Language } from "../models/movie";

export const startSchedular = () => {
  console.log("Starting Schedular");
  scheduleJob("* * 0 * * *", async () => {
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

    await genreService.createRelationTable();
    await countryService.createRelationTable();
    await languageService.createRelationTable();
    await productionCompanyService.createRelationTable();

    const languages = await ConsumerApi({ url: "/configuration/languages" });
    const countries = await ConsumerApi({ url: "/configuration/countries" });
    const genres = await ConsumerApi({ url: "/genre/movie/list" });
    const data: Language[] = languages.data;

    languageService.insertMany(data);
    countryService.insertMany(countries.data);
    genreService.insertMany(genres.data.genres);

    for (let x = 1; x < 10; x++) {
      const {
        data: { results },
      } = await ConsumerApi({ url: "/movie/popular", page: x });

      for (let i = 0; i < results.length; i++) {
        const selectedMovie = results[i];
        const movieId = selectedMovie.id;
        const test = await ConsumerApi({ url: `/movie/${movieId}` });
        await movieService.add(test.data);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
