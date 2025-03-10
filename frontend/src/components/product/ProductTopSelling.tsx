import React, { useMemo, useState } from "react";
import { Link } from "react-router";
import ProductCard from "./ProductCard";
import useDebouncedState from "../../hooks/useDebouncedState";
import { ProductSortOrder } from "../../types/product";
import { useGetTopSellingProductsQuery } from "../../api/baseQueries/productsApi/getTopSellingProducts";

const ProductTopSelling = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageOffset, setPageOffset] = useState(0);
  const [itemsPerPage] = useState(100);

  const [priceSortOrder, setPriceSortOrder] = useState<ProductSortOrder>("");
  const [dateSortOrder, setDateSortOrder] = useState<ProductSortOrder>("");
  const [stockSortOrder, setStockSortOrder] = useState<ProductSortOrder>("");

  const [deferredSearchTerm] = useDebouncedState(searchTerm, {
    enableReInitialize: true,
    wait: 1000,
  });

  const { data: productsResponse, isLoading, isError, isSuccess } = useGetTopSellingProductsQuery({
    params: {
      limit: itemsPerPage,
      offset: pageOffset,
      sort: {
        price: priceSortOrder,
        date: dateSortOrder,
        stock: stockSortOrder,
      },
      ...(deferredSearchTerm ? { search: deferredSearchTerm } : {}),
    },
  });

  const products = productsResponse?.data?.data;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePreviousPage = () => {
    setPageOffset((offset) => offset - itemsPerPage);
  };

  const handleNextPage = () => {
    setPageOffset((offset) => offset + itemsPerPage);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="flex gap-4 justify-center mb-5">
        <p>sort:</p>
        <div>
          price:{" "}
          <select
            onChange={(e) =>
              setPriceSortOrder(e.target.value as ProductSortOrder)
            }
            value={priceSortOrder}
          >
            <option value="">None</option>
            {Object.values(ProductSortOrder).map((sort) => (
              <option key={sort} value={sort}>
                {sort}
              </option>
            ))}
          </select>
        </div>

        <div>
          Date:{" "}
          <select
            onChange={(e) =>
              setDateSortOrder(e.target.value as ProductSortOrder)
            }
            value={dateSortOrder}
          >
            <option value="">None</option>
            {Object.values(ProductSortOrder).map((sort) => (
              <option key={sort} value={sort}>
                {sort}
              </option>
            ))}
          </select>
        </div>

        <div>
          Stock:{" "}
          <select
            onChange={(e) =>
              setStockSortOrder(e.target.value as ProductSortOrder)
            }
            value={stockSortOrder}
          >
            <option value="">None</option>
            {Object.values(ProductSortOrder).map((sort) => (
              <option key={sort} value={sort}>
                {sort}
              </option>
            ))}
          </select>
        </div>
      </div>
      <input
        onChange={handleSearch}
        value={searchTerm}
        type="text"
        placeholder="Search"
        className="w-full px-4 py-2 border text-black border-gray-300 rounded-md mb-5"
      />

      <div className="flex justify-between gap-5 flex-wrap">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Products
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

      {isLoading && <h6 className="my-56 text-center">Loading...</h6>}
      {isError && <div>Error</div>}
      {isSuccess && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="flex justify-center gap-5 mt-5">
        <button
          onClick={handlePreviousPage}
          disabled={pageOffset === 0}
          className="mt-1 cursor-pointer  text-black underline px-2 py-1 rounded-md"
        >
          previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={
            productsResponse?.totalRecords === 0 ||
            productsResponse?.totalRecords === pageOffset
          }
          className="mt-1 cursor-pointer  text-black underline px-2 py-1 rounded-md"
        >
          Next
        </button>
      </div>
      <p className="text-black">
        Total Records: {productsResponse?.totalRecords}
      </p>
    </div>
  );
};

export default ProductTopSelling;
