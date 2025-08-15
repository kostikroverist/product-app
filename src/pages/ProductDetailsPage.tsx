import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/store";
import Modal from "../components/Modal";
import ProductForm from "../components/ProductForm";
import {
  updateProduct,
  addComment,
  deleteComment,
  fetchProducts,
} from "../features/products/productsSlice";
import type { Product } from "../models";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();

  const {
    items,
    comments: allComments,
    status,
  } = useSelector((state: RootState) => state.products);

  const product = items.find((p) => String(p.id) === id);
  const comments = allComments.filter((c) => String(c.productId) === id);

  useEffect(() => {
    if (!product) {
      dispatch(fetchProducts());
    }
  }, [dispatch, product]);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-300">Loading...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-center">
        <h2 className="text-2xl text-red-500">Failed to load product</h2>
        <Link
          to="/"
          className="text-blue-400 hover:underline mt-4 inline-block"
        >
          Go back to list
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center">
        <h2 className="text-2xl">Product not found.</h2>
        <Link
          to="/"
          className="text-blue-400 hover:underline mt-4 inline-block"
        >
          Go back to list
        </Link>
      </div>
    );
  }

  const handleUpdateProduct = (
    productData: Omit<Product, "id" | "comments">
  ) => {
    dispatch(updateProduct({ ...productData, id: product!.id }));
    setEditModalOpen(false);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && product) {
      const comment = {
        productId: product.id,
        description: newComment,
        date: new Date().toLocaleString(),
      };
      dispatch(addComment(comment));
      setNewComment("");
    }
  };

  const handleDeleteComment = (commentId: number) => {
    dispatch(deleteComment(commentId));
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
      <Link to="/" className="text-blue-400 hover:underline mb-6 inline-block">
        ← Back to list
      </Link>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={product!.imageUrl}
            alt={product!.name}
            className="rounded-lg w-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold mb-4">{product!.name}</h1>
          <p className="text-lg mb-2">
            <strong className="font-semibold text-slate-300">In Stock:</strong>{" "}
            {product!.count}
          </p>
          <p className="text-lg mb-2">
            <strong className="font-semibold text-slate-300">Weight:</strong>{" "}
            {product!.weight}
          </p>
          <p className="text-lg mb-4">
            <strong className="font-semibold text-slate-300">Size:</strong>{" "}
            {product!.size.width}x{product!.size.height}px
          </p>
          <button
            onClick={() => setEditModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Edit
          </button>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-slate-700">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <div className="space-y-4 mb-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-slate-700 p-4 rounded-lg flex justify-between items-start"
            >
              <div>
                <p>{comment.description}</p>
                <span className="text-xs text-slate-400 mt-1 block">
                  {comment.date}
                </span>
              </div>
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="text-red-400 hover:text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddComment} className="flex gap-2">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow bg-slate-200 text-slate-900 placeholder-slate-500 rounded-lg p-3 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Add
          </button>
        </form>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <ProductForm
          initialData={product!}
          onConfirm={handleUpdateProduct}
          onCancel={() => setEditModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ProductDetailsPage;
