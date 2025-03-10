import { Link } from "react-router";

import { productApi } from "../api/productApi";
import ProductCard from "./ProductCard";

export default function ProductOrders() {
  const productOrdersQuery = productApi.useGetOrdersQuery();
  return (
    <div>
      <div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between gap-5 flex-wrap">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Orders
            </h2>

            <div className="flex gap-5">
              <Link to="/orders" className="text-blue-500">
                Orders
              </Link>
              <Link to="/products/top-selling" className="text-blue-500">
                Product Top Selling
              </Link>
            </div>
          </div>

          {productOrdersQuery.isLoading && (
            <h6 className="my-56 text-center">Loading...</h6>
          )}
          {productOrdersQuery.isError && <div>Error</div>}
          {productOrdersQuery.isSuccess && (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {productOrdersQuery?.data?.data?.map((order) => (
                <div>
                  <ProductCard
                    noAction
                    key={order.id}
                    product={order.product}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
