import React from "react";
import DataTable from "react-data-table-component";

const OrdersTable = ({ orders }) => {
  const columns = [
    {
      name: "Order ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Customer",
      selector: (row) => row.user.name,
      sortable: true,
    },
    {
      name: "Product",
      selector: (row) => row.product.name,
      sortable: true,
    },
    {
      name: "Brand",
      selector: (row) => row.product.brand.name,
      sortable: true,
    },
    {
      name: "Supplier",
      selector: (row) => row.product.supplier.name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.product.category.name,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Total Price ($)",
      selector: (row) => row.total_price.toFixed(2),
      sortable: true,
    },
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

  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-bold mb-4">Orders Table</h1> */}
      <DataTable
        columns={columns}
        data={orders}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
};

export default OrdersTable;
