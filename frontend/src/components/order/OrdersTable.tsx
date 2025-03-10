import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const OrdersTable = ({ orders }) => {
  const [search, setSearch] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  // Define table columns
  const columns = [
    { name: "Order ID", selector: (row) => row.id, sortable: true },
    { name: "Customer", selector: (row) => row.user.name, sortable: true },
    { name: "Product", selector: (row) => row.product.name, sortable: true },
    { name: "Brand", selector: (row) => row.product.brand.name, sortable: true },
    { name: "Supplier", selector: (row) => row.product.supplier.name, sortable: true },
    { name: "Category", selector: (row) => row.product.category.name, sortable: true },
    { name: "Quantity", selector: (row) => row.quantity, sortable: true },
    { name: "Total Price ($)", selector: (row) => row.total_price.toFixed(2), sortable: true },
    {
      name: "Avg. Rating",
      selector: (row) =>
        row.product.product_reviews.length > 0
          ? (
              row.product.product_reviews.reduce((sum, review) => sum + review.rating, 0) /
              row.product.product_reviews.length
            ).toFixed(1)
          : "N/A",
      sortable: true,
    },
  ];

  // Handle search input change
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);

    const filteredData = orders.filter(
      (order) =>
        order.user.name.toLowerCase().includes(value) ||
        order.product.name.toLowerCase().includes(value) ||
        order.product.brand.name.toLowerCase().includes(value) ||
        order.product.supplier.name.toLowerCase().includes(value) ||
        order.product.category.name.toLowerCase().includes(value)
    );

    setFilteredOrders(filteredData);
  };

  return (
    <div className="py-6">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search orders..."
        value={search}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      {/* DataTable Component */}
      <DataTable
        columns={columns}
        data={filteredOrders}
        pagination
        highlightOnHover
        striped
        responsive
      />
    </div>
  );
};

export default OrdersTable;
