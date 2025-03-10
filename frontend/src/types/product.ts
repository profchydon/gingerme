import { ApiResponse } from "./api";

export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category_id: number;
  brand_id: number;
  supplier_id: number;
  brand: {
    id: number;
    name: string;
  };
  supplier: {
    id: number;
    name: string;
  };
  product_reviews: {
    id: number;
    rating: number;
  };
};

export type ProductResponse = ServerResponse<{
  products: Product[];
  totalRecords: number;
}>;

export type ProductListResponse = ApiResponse<{
  products: Product[];
  totalRecords: number;
}>;

export enum ProductSortOrder {
  ASC = "asc",
  DESC = "desc",
}

export type ProductOrder = {
  id: number;
  product_id: number;
  quantity: number;
  product: Product;
};

export type OrdersListResponse = ApiResponse<ProductOrder[]>;
