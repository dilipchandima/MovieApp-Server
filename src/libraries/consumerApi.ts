import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../config";

interface Input {
  url: string;
  page?: number;
  method?: Methods;
}

type Methods = "get" | "post" | "put" | "delete";

const ConsumerApi = async ({
  url,
  page = 1,
  method = "get",
}: Input): Promise<AxiosResponse> => {
  const axiosRequestConfig: AxiosRequestConfig = {
    method,
    url: `${TMDB_BASE_URL}${url}`,
    params: {
      api_key: TMDB_API_KEY,
      page,
    },
  };

  const result = await axios(axiosRequestConfig);
  return result;
};

export default ConsumerApi;
