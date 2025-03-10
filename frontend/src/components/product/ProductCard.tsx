import React from "react";
import { Link } from "react-router";
import { Product } from "../../types/product";

// import { productApi } from "../api/productApi";

type ProductCardProps = {
  product: Product;
  noAction?: boolean;
};
export default function ProductCard(props: ProductCardProps) {
  const { product, noAction } = props;

  // const [productApiMutation, productApiMutationResult] =
  //   productApi.useOrderProductMutation();

  const handleOrder = async (productId: number) => {
    console.log("Ordering product", productId);
    // try {
    //   await productApiMutation({
    //     data: { productId, quantity: 1 },
    //   }).unwrap();
    //   alert("Product ordered successfully 😊");
    // } catch (error: any) {
    //   alert(error?.defaultMessage || "Failed to order product");
    // }
  };

  return (
    <div className=" border-green-50 border-2 rounded-md p-5">
      <div>
        <h3 className=" group relative  text-sm font-semibold text-gray-900">
          <Link to="">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name} ({product.id})
          </Link>
        </h3>
        <hr></hr>
        <div className="grid grid-cols-1 gap-2 mt-2">
          <p className="text-sm  text-gray-500">Price: {product.price}</p>
          <p className="text-sm  text-gray-500">Brand: {product.brand.name}</p>
          <p className="text-sm  text-gray-500">
            Supplier: {product.supplier.name}
          </p>
          <p className="text-sm  text-gray-500">Stock: {product.stock}</p>
          <p className="text-sm  text-gray-500">
            Rating: {product?.product_reviews?.rating || 0}
          </p>
        </div>
        {/* {!noAction && (
          <div className="flex justify-end">
            <button
              disabled={
                product.stock <= 0 || productApiMutationResult.isLoading
              }
              onClick={() => {
                handleOrder(product.id);
              }}
              className="mt-1 cursor-pointer  text-black underline px-2 py-1 rounded-md"
            >
              Order
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
}
