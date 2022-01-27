import config from "config";

export const TMDB_BASE_URL = config.get("TMDB.base-url");
export const TMDB_API_KEY = config.get("TMDB.api-key");
