import React, { useState } from "react";

const AddProduct = ({ isOpen, onClose, onSave }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProduct({
      ...product,
      [name]: files ? files[0] : value,
    });
  };

  const handleSave = () => {
    onSave(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add Product
        </h2>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full  px-3 py-2 focus:ring focus:ring-gray-300"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full  px-3 py-2 focus:ring focus:ring-gray-300"
              placeholder="Enter price"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full  px-3 py-2 focus:ring focus:ring-gray-300"
              placeholder="Enter description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full  px-3 py-2 cursor-pointer"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
