import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
// IMPORT LOCAL IMAGES
import diamondEarcuff from "../assets/diamond-ear-cuff.png";
import floralEarring from "../assets/floral-earrings.png";
import butterflyTiara from "../assets/butterfly-tiara.png";
import whitepetalChokar from "../assets/whitepetal-chokar.png";

export default function SherinTreasuresPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  // MAP PRODUCT NAMES TO IMAGES
  const imageMap = {
    "diamond-ear-cuff.png": diamondEarcuff,
    "floral-earrings.png": floralEarring,
    "butterfly-tiara.png": butterflyTiara,
    "whitepetal-chokar.png": whitepetalChokar,

    // ⭐ Add new products here in future
    // "Your DB Product Name": importedImage
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchJewelryProducts();
  }, []);

  const fetchJewelryProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const json = await response.json();

      const productsArray = json.data || []; // safe handling

      const jewelry = productsArray.filter(
        (item) => item.category === "Jewelry"
      );

      const updatedProducts = jewelry.map((p) => ({
        ...p,
        image: imageMap[p.name] || "",
      }));

      setProducts(updatedProducts);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  return (
    <motion.div
      className="bg-[#DCE1DC] min-h-screen font-serif"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-[#4B6A5A] h-10 w-full" />

      {/* Navbar */}
      <nav className="px-4 py-4 bg-[#DCE1DC] text-[#1e3a1b] relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <button onClick={() => navigate(-1)} className="text-2xl">
              ←
            </button>
            <h1 className="text-xl font-bold font-italiana">Sherin</h1>
          </div>

          {/* Mobile Icons */}
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

          {/* Desktop Menu */}
          <div className="items-center hidden text-lg font-medium sm:flex gap-x-6">
            <Link to="/collection" className="text-gray-600">
              Collection
            </Link>
            <Link to="/treasures" className="text-black">
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

      {/* Products Grid */}
      <main className="px-4 pb-16 md:px-8">
        <div className="space-y-12 sm:space-y-0 sm:grid sm:grid-cols-2 md:grid-cols-4 sm:gap-x-4 sm:gap-y-24">
          {products.map((product, index) => (
            <div key={index} className="w-full">
              <div className="w-full bg-white border border-gray-500">
                <img
                  src={imageMap[product.images?.[0]]}
                  alt={product.name}
                  className="object-cover w-full h-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/400x600/FEE2E2/B91C1C?text=Image+Not+Found";
                  }}
                />
              </div>

              <div className="pt-2 text-left">
                <h3 className="text-gray-800 text-md font-playfair">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-700 font-playfair">
                  ₹{product.price}
                </p>
              </div>

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
          ))}
        </div>
      </main>
    </motion.div>
  );
}
