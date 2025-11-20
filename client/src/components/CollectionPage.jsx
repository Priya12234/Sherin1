import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import petelJeanse from "../assets/Petal-jeans.png";
import petalCorset from "../assets/Petal-corset.png";
import bloomCrop from "../assets/bloom-crop.png";
import bowBelleDress from "../assets/bowbelle-dress.png";

export default function CollectionPage() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [items, setItems] = useState([]); // fetched clothing items
  const imageMap = {
    "Petal-jeans.png": petelJeanse,
    "Petal-corset.png": petalCorset,
    "bloom-crop.png": bloomCrop,
    "bowbelle-dress.png": bowBelleDress,
  };


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/");
        const result = await response.json();

        // Correct structure: result.data is the array
        const clothingItems = result?.data?.filter(
          (item) => item.category === "Clothing"
        );

        setItems(clothingItems || []);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <motion.div
      className="bg-[#DCE1DC] min-h-screen font-serif"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Top Strip */}
      <div className="bg-[#4B6A5A] h-10 w-full" />

      {/* Navbar */}
      <nav className="px-4 py-4 bg-[#DCE1DC] text-[#1e3a1b] relative">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-x-3">
            <button onClick={() => navigate(-1)} className="text-2xl">
              ←
            </button>
            <h1 className="text-xl font-bold font-italiana">Sherin</h1>
          </div>

          {/* Right Section Mobile */}
          <div className="flex items-center text-xl gap-x-5 sm:hidden">
            <Link to="/myprofile">
              <FiUser className="text-gray-800" />
            </Link>
            <Link to="/cart">
              <FiShoppingCart className="text-gray-800" />
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Desktop Navbar */}
          <div className="items-center hidden text-lg font-medium sm:flex gap-x-6">
            <Link to="/collection" className="text-black">
              Collection
            </Link>
            <Link to="/treasures" className="text-gray-600">
              Sherin Treasures
            </Link>
            <Link to="/shop" className="text-gray-600">
              Pairs
            </Link>
            <Link to="/myprofile">
              <FiUser className="text-gray-800" />
            </Link>
            <Link to="/cart">
              <FiShoppingCart className="text-gray-800" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-2 overflow-hidden text-base font-medium sm:hidden"
            >
              <Link
                to="/collection"
                onClick={() => setMenuOpen(false)}
                className="block border-b py-2 text-[#1e3a1b]"
              >
                Collection
              </Link>
              <Link
                to="/treasures"
                onClick={() => setMenuOpen(false)}
                className="block border-b py-2 text-[#1e3a1b]"
              >
                Sherin Treasures
              </Link>
              <Link
                to="/shop"
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-[#1e3a1b]"
              >
                Pairs
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Page Title */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-italiana text-[#1e3a1b]">
          Discover Effortless Beauty
        </h1>
      </div>

      {/* Product Layout */}
      <main className="px-4 pb-16 md:px-8">
        <div className="space-y-12 sm:space-y-0 sm:grid sm:grid-cols-2 md:grid-cols-4 sm:gap-x-4 sm:gap-y-24">
          {items.map((product) => (
            <div key={product._id} className="w-full">
              {/* IMAGE */}
              <div className="w-full bg-white border border-gray-500">
                <img
                  src={imageMap[product.images?.[0]]}
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/400x600/FEE2E2/B91C1C?text=No+Image";
                  }}
                  className="object-cover w-full h-auto"
                />
              </div>

              {/* DETAILS */}
              <div className="pt-2 text-left">
                <h3 className="text-gray-800 text-md font-playfair">
                  {product.name}
                </h3>

                {/* price + discount */}
                <p className="mt-1 text-sm text-gray-700 font-playfair">
                  ₹{product.price}
                  {product.discount > 0 && (
                    <span className="ml-2 text-green-700">
                      ({product.discount}% off)
                    </span>
                  )}
                </p>

                {/* Colors */}
                <div className="flex mt-2 space-x-1.5">
                  {product.colors?.map((clr, idx) => (
                    <span
                      key={idx}
                      className="w-3 h-3 block border border-gray-500"
                      style={{ backgroundColor: clr.toLowerCase() }}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </motion.div>
  );
}
