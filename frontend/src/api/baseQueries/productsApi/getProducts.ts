import { productsApi } from ".";
import { ApiRequestConfig } from "../../../types/api";
import { ProductResponse, ProductSortOrder } from "../../../types/product";

const getProducts = productsApi.injectEndpoints({
  endpoints: (query) => ({
    getProducts: query.query<
      ServerResponse<ProductResponse>,
      ApiRequestConfig<
        void,
        {
          search?: string;
          offset?: number;
          limit?: number;
          price?: string;
          date?: string;
          stock?: string;
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
        url: `/products`,
        ...config,
      }),
    }),
  }),
});

export const { useGetProductsQuery } = getProducts;
