import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../api/baseQueries/orderApi/getOrders";
import OrdersTable from "./OrdersTable";

const Orders = () => {
  const { data: ordersResponse, isLoading, isError, isSuccess } = useGetOrdersQuery({});
  const orders = ordersResponse?.data || [];

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center flex-wrap mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Orders</h2>

          <div className="flex gap-5">
            <Link to="/" className="text-blue-500 hover:underline">
              Products
            </Link>
            <Link to="/products/top-selling" className="text-blue-500 hover:underline">
              Top Selling Products
            </Link>
          </div>
        </div>

        {/* Orders Table */}
        {isLoading && <h6 className="my-56 text-center text-gray-500">Loading...</h6>}
        {isError && <div className="text-red-500 text-center">Error loading orders.</div>}
        {isSuccess && <OrdersTable orders={orders} />}
      </div>
    </div>
  );
};

export default Orders;
