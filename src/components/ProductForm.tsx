import React, { useState, useEffect } from "react";
import type { Product } from "../models";
import CustomInput from "./CustomInput";

interface ProductFormProps {
  initialData?: Product | null;
  onConfirm: (productData: Omit<Product, "id" | "comments">) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onConfirm,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    count: 0,
    width: 0,
    height: 0,
    weight: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        imageUrl: initialData.imageUrl,
        count: initialData.count,
        width: initialData.size.width,
        height: initialData.size.height,
        weight: initialData.weight,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, imageUrl, count, width, height, weight } = formData;

    onConfirm({
      name: name.trim(),
      imageUrl: imageUrl.trim(),
      count: Number(count),
      size: { width: Number(width), height: Number(height) },
      weight: weight.trim(),
    });
  };

  const isFormValid =
    formData.name.trim() &&
    formData.imageUrl.trim() &&
    formData.weight.trim() &&
    Number(formData.count) > 0 &&
    Number(formData.width) > 0 &&
    Number(formData.height) > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-white">
        {initialData ? "Edit Product" : "Add Product"}
      </h2>

      <CustomInput
        label="Product Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter product name"
      />

      <CustomInput
        label="Image URL"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="Enter image URL"
      />

      <CustomInput
        label="Count"
        name="count"
        type="number"
        value={formData.count}
        onChange={handleChange}
        placeholder="Enter quantity"
      />

      <div className="grid grid-cols-2 gap-4">
        <CustomInput
          label="Width"
          name="width"
          type="number"
          value={formData.width}
          onChange={handleChange}
          placeholder="Width"
        />
        <CustomInput
          label="Height"
          name="height"
          type="number"
          value={formData.height}
          onChange={handleChange}
          placeholder="Height"
        />
      </div>

      <CustomInput
        label="Weight"
        name="weight"
        value={formData.weight}
        onChange={handleChange}
        placeholder="Enter weight"
      />

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`font-bold py-2 px-4 rounded-lg transition-colors ${
            isFormValid
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
