import { orderApi } from ".";
import { ApiRequestConfig } from "../../../types/api";
import { ProductOrder, ProductSortOrder } from "../../../types/product";

const getOrders = orderApi.injectEndpoints({
  endpoints: (query) => ({
    getOrders: query.query<
      ServerResponse<ProductOrder>,
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
        url: `/orders/latest`,
        ...config,
      }),
    }),
  }),
});

export const { useGetOrdersQuery } = getOrders;
