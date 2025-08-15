import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import ConfirmationModal from '../components/ConfirmationModal';
import Modal from '../components/Modal';
import ProductForm from '../components/ProductForm';
import ProductList from '../features/products/ProductList';
import { fetchProducts, addProduct, deleteProduct } from '../features/products/productsSlice';
import type { Product } from '../models';

const ProductListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items: products, status } = useSelector((state: RootState) => state.products);
  
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleAddProduct = (productData: Omit<Product, 'id'| 'comments'>) => {
    dispatch(addProduct({ ...productData, comments: [] }));
    setAddModalOpen(false);
  };

  const handleDeleteRequest = (id: number) => {
    setProductToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete !== null) {
      dispatch(deleteProduct(productToDelete));
      setDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  if (status === 'loading') return <p className="text-center text-lg">Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Product List</h1>
        <button 
          onClick={() => setAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Add Product
        </button>
      </div>
      <ProductList products={products} onDelete={handleDeleteRequest} />

      <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)}>
        <ProductForm onConfirm={handleAddProduct} onCancel={() => setAddModalOpen(false)} />
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <ConfirmationModal
          message="Are you sure you want to delete this product?"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ProductListPage;