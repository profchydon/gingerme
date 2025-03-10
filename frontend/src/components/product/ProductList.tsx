import React, { useState } from "react";
import { Link } from "react-router";
import ProductCard from "./ProductCard";
import useDebouncedState from "../../hooks/useDebouncedState";
import { ProductSortOrder } from "../../types/product";
import { useGetProductsQuery } from "../../api/baseQueries/productsApi/getProducts";
import { FaSearch, FaSort } from "react-icons/fa";

const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit] = useState(100);

  const [priceSortOrder, setPriceSortOrder] = useState<ProductSortOrder>("");
  const [dateSortOrder, setDateSortOrder] = useState<ProductSortOrder>("");
  const [stockSortOrder, setStockSortOrder] = useState<ProductSortOrder>("");

  const [deferredSearchQuery] = useDebouncedState(searchQuery, {
    enableReInitialize: true,
    wait: 1000,
  });

  const { data, isLoading, isError, isSuccess } = useGetProductsQuery({
    params: {
      limit,
      offset,
      price: priceSortOrder,
      date: dateSortOrder,
      stock: stockSortOrder,
      sort: {
        price: priceSortOrder,
        date: dateSortOrder,
        stock: stockSortOrder,
      },
      ...(deferredSearchQuery ? { search: deferredSearchQuery } : {}),
    },
  });

  const products = data?.data?.products || [];

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePreviousPage = () => {
    setOffset((offset) => offset - 100);
  };

  const handleNextPage = () => {
    setOffset((offset) => offset + 100);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Sorting Dropdowns */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="relative">
            <select
              onChange={(e) => setPriceSortOrder(e.target.value as ProductSortOrder)}
              value={priceSortOrder}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Sort by Price</option>
              {Object.values(ProductSortOrder).map((sort) => (
                <option key={sort} value={sort}>
                  {sort}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <FaSort />
            </div>
          </div>

          <div className="relative">
            <select
              onChange={(e) => setDateSortOrder(e.target.value as ProductSortOrder)}
              value={dateSortOrder}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Sort by Date</option>
              {Object.values(ProductSortOrder).map((sort) => (
                <option key={sort} value={sort}>
                  {sort}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <FaSort />
            </div>
          </div>

          <div className="relative">
            <select
              onChange={(e) => setStockSortOrder(e.target.value as ProductSortOrder)}
              value={stockSortOrder}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Sort by Stock</option>
              {Object.values(ProductSortOrder).map((sort) => (
                <option key={sort} value={sort}>
                  {sort}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <FaSort />
            </div>
          </div>
        </div>

        {/* Header and Links */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Products</h2>
          <div className="flex gap-4">
            <Link
              to="/orders"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Orders
            </Link>
            <Link
              to="/products/top-selling"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Top Selling
            </Link>
          </div>
        </div>

        {/* Loading and Error States */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        {isError && (
          <div className="text-red-500 text-center">Error fetching products.</div>
        )}

        {/* Product Grid */}
        {isSuccess && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={offset === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={
              data?.totalRecords === 0 || data?.totalRecords === offset
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>

        {/* Total Records */}
        <p className="text-center text-gray-600 mt-4">
          Total Records: {data?.totalRecords}
        </p>
      </div>
    </div>
  );
};

export default ProductList;