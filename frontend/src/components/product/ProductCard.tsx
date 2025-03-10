import React from "react";
import { Link } from "react-router";
import { Product } from "../../types/product";
import { Star, Package, Banknote, Building, BarChart3, User } from "lucide-react";
import { FaStar } from "react-icons/fa";

type ProductCardProps = {
  product: Product;
  noAction?: boolean;
};

export default function ProductCard({ product, noAction }: ProductCardProps) {

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
            <Link to="#">{product.name}</Link>
          </h3>
          <span className="text-xs text-gray-500 ml-2 bg-amber-200 py-1 px-2 rounded-2xl">
            #{product.id}
          </span>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center text-gray-700">
            <Banknote className="h-4 w-4 mr-2 text-gray-400" />
            <span className="font-medium">${product.price.toFixed(2)}</span>
          </div>

          <div className="flex items-center text-gray-700">
            <User className="h-4 w-4 mr-2 text-gray-400" />
            <span>{product.brand.name}</span>
          </div>

          <div className="flex items-center text-gray-700">
            <Building className="h-4 w-4 mr-2 text-gray-400" />
            <span>{product.supplier.name}</span>
          </div>

          <div className="flex items-center text-gray-700">
            <BarChart3 className="h-4 w-4 mr-2 text-gray-400" />
            <span>Stock: {product.stock}</span>
          </div>

          <div className="flex items-center">
            <FaStar className="text-yellow-400" />
            <p className="text-sm text-gray-600 ml-1">
              Rating: {product.product_reviews?.rating || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
