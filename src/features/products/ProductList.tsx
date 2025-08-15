import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../models";

interface ProductListProps {
  products: Product[];
  onDelete: (id: number) => void;
}

type SortKey = "name" | "count";

const ProductList: React.FC<ProductListProps> = ({ products, onDelete }) => {
  const [sortKey, setSortKey] = useState<SortKey>("name");

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortKey === "name") {
        const nameComparison = a.name.localeCompare(b.name);
        if (nameComparison !== 0) return nameComparison;
      }
      return a.count - b.count;
    });
  }, [products, sortKey]);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <label htmlFor="sort" className="mr-2 self-center">
          Sort by:{" "}
        </label>
        <select
          id="sort"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
          className="bg-slate-700 border border-slate-600 rounded-md p-2 text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="name">Name</option>
          <option value="count">Count</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2">
                <Link
                  to={`/products/${product.id}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  {product.name}
                </Link>
              </h3>
              <p className="text-slate-400 mb-4 mt-auto">
                In stock: {product.count}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => onDelete(product.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-full transition-colors"
                >
                  Delete
                </button>
                <Link
                  to={`/products/${product.id}`}
                  className="text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full transition-colors"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
