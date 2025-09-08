import React, { useState } from "react";
import floralearrings from "../../assets/floral-earrings.png";
import floraltop from "../../assets/floral-top.png";
import goldenneckles from "../../assets/golden-necklace.png";
import headerImg from "../assets/header-image.png";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";

const sampleProducts = [
  {
    id: 1,
    name: "Floral Dress",
    category: "Clothing",
    price: 1200,
    stock: 15,
    image: floralearrings,
  },
  {
    id: 2,
    name: "Gold Necklace",
    category: "Jewelry",
    price: 2500,
    stock: 8,
    image: goldenneckles,
  },
  {
    id: 3,
    name: "Denim Jacket",
    category: "Clothing",
    price: 1800,
    stock: 20,
    image: floraltop,
  },
];

const ManageProducts = () => {
  const [products, setProducts] = useState(sampleProducts);

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (confirmDelete) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleSave = (updatedProduct) => {
    setProducts(
      products.map((p) =>
        p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
      )
    );
  };

  const handleAdd = (newProduct) => {
    const id = products.length ? products[products.length - 1].id + 1 : 1;
    const addedProduct = {
      id,
      ...newProduct,
      image: newProduct.image
        ? URL.createObjectURL(newProduct.image) // preview uploaded file
        : null,
    };
    setProducts([...products, addedProduct]);
  };

  return (
    <div className="px-2 sm:px-4 md:px-6 py-6">
      {/* ✅ Header Banner */}
      <div className="relative w-full h-40 sm:h-52 md:h-30 rounded-lg overflow-hidden mb-6">
        <picture>
          <source media="(max-width: 640px)" srcSet={headerImg} />
          <source media="(max-width: 1280px)" srcSet={headerImg} />
          <img
            src={headerImg}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </picture>

        <div className="absolute bottom-4 left-6 sm:bottom-6 sm:left-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            Manage Products
          </h1>
        </div>
      </div>

      <div className="p-6">
        {/* Header with button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Products List</h2>
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-[#284E2D] text-white px-4 py-2 rounded-lg hover:bg-[#355E3B]"
          >
            + Add Product
          </button>
        </div>

        {/* Responsive Table */}
        <div className="overflow-hidden bg-white shadow rounded-lg">
          <div className="overflow-x-auto hidden md:block">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3">#</th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, index) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.category}</td>
                    <td className="p-3">₹{p.price}</td>
                    <td className="p-3">{p.stock}</td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center p-4 text-gray-500">
                      No products available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-4 md:hidden p-4">
            {products.map((p, index) => (
              <div
                key={p.id}
                className="border rounded-lg p-4 shadow-sm space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold">
                    {index + 1}. {p.name}
                  </span>
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {p.category}
                  </span>
                </div>
                <div className="flex justify-center">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </div>
                <p>💰 ₹{p.price}</p>
                <p>📦 {p.stock} in stock</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="flex-1 px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="flex-1 px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <p className="text-center text-gray-500">No products available</p>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Popups */}
      {selectedProduct && (
        <EditProduct
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSave={handleSave}
        />
      )}
      {isAddOpen && (
        <AddProduct
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onSave={handleAdd}
        />
      )}
    </div>
  );
};

export default ManageProducts;
