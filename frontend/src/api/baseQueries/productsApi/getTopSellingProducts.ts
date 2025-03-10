import { productsApi } from ".";
import { ApiRequestConfig } from "../../../types/api";
import { ProductResponse, ProductSortOrder } from "../../../types/product";

const getTopSellingProducts = productsApi.injectEndpoints({
  endpoints: (query) => ({
    getTopSellingProducts: query.query<
      ServerResponse<ProductResponse>,
      ApiRequestConfig<
        void,
        {
          search?: string;
          offset?: number;
          limit?: number;
          sort?: {
            price?: ProductSortOrder;
            date?: ProductSortOrder;
            stock?: ProductSortOrder;
          };
        },
        void
      >
    >({
      query: (config) => ({
        url: `/products/top-selling`,
        ...config,
      }),
    }),
  }),
});

export const { useGetTopSellingProductsQuery } = getTopSellingProducts;
