import { createApi } from "@reduxjs/toolkit/query/react";
import config from "../../../config/config";
import { axiosBaseQuery } from "../../interceptor/axiosBaseQuery";
import * as RtkqTag from "../../../constants/tags";

export const orderApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: `${config.API_URL!}` }),
  endpoints: () => ({}),
  reducerPath: "orderApi",
  keepUnusedDataFor: 30,
  tagTypes: [RtkqTag.ORDERS],
});
