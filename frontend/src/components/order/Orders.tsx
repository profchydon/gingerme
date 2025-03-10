import { Link } from "react-router";
import { useGetOrdersQuery } from "../../api/baseQueries/orderApi/getOrders";
import OrdersTable from "./OrdersTable";

const Orders = () => {

  const {
    data: ordersResponse,
    isLoading,
    isError,
    isSuccess,
  } = useGetOrdersQuery({});

  const orders = ordersResponse?.data;

  console.log("ordersResponse", orders);
  

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

          {isLoading && (
            <h6 className="my-56 text-center">Loading...</h6>
          )}
          {isError && <div>Error</div>}
          {isSuccess && (
            <div className="">
              {/* {productOrdersQuery?.data?.data?.map((order) => (
                <div>
                  <ProductCard
                    noAction
                    key={order.id}
                    product={order.product}
                  />
                </div>
              ))} */}
              <OrdersTable orders={orders} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
