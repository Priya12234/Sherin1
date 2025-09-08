import React, { useState } from "react";

const EditProduct = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || "",
    stock: product?.stock || "",
    category: product?.category || "",
    image: product?.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-end sm:items-center z-50">
      <div className="bg-white w-full max-w-lg mx-4 sm:mx-0 p-6 rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-slideUp sm:animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            ✏️ Edit Product
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-b border-gray-300 focus:border-black outline-none py-1"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:border-black outline-none py-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:border-black outline-none py-1"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border-b border-gray-300 focus:border-black outline-none py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
              className="w-full border-b border-gray-300 focus:border-black outline-none py-1"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
