import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import diamondEarcuff from "../assets/diamond-ear-cuff.png";
import floralEarring from "../assets/floral-earrings.png";
import butterflyTiara from "../assets/butterfly-tiara.png";
import whitepetalChokar from "../assets/whitepetal-chokar.png";
import { FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";

const products = [
  {
    id: 1,
    name: "Diamond ear cuff",
    price: "₹1,499.00",
    image: diamondEarcuff,
    colors: ["bg-blue-400", "bg-indigo-400"],
  },
  {
    id: 2,
    name: "Floral earrings",
    price: "₹1,499.00",
    image: floralEarring,
    colors: ["bg-pink-300", "bg-green-900"],
  },
  {
    id: 3,
    name: "Butterfly Tiara",
    price: "₹1,499.00",
    image: butterflyTiara,
    colors: ["bg-green-900"],
  },
  {
    id: 4,
    name: "WhitePetal Choker",
    price: "₹1,499.00",
    image: whitepetalChokar,
    colors: ["bg-pink-300", "bg-green-600"],
  },
];

export default function SherinTreasuresPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          {/* Left */}
          <div className="flex items-center gap-x-3">
            <button onClick={() => navigate(-1)} className="text-2xl">
              ←
            </button>
            <h1 className="text-xl font-bold font-italiana">Sherin</h1>
          </div>

          {/* Right - Mobile */}
          <div className="flex items-center text-xl gap-x-5 sm:hidden">
            <FiUser className="text-gray-800" />
            <FiShoppingCart className="text-gray-800" />
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Desktop Nav */}
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
            <FiUser className="text-gray-800" />
            <FiShoppingCart className="text-gray-800" />
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

      {/* Products */}
      <main className="px-4 pb-16 md:px-8">
        <div className="space-y-12 sm:space-y-0 sm:grid sm:grid-cols-2 md:grid-cols-4 sm:gap-x-4 sm:gap-y-24">
          {[...Array(3)]
            .flatMap(() => products)
            .map((product, index) => (
              <div key={`${product.id}-${index}`} className="w-full">
                <div className="w-full bg-white border border-gray-500">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-auto"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/400x600/FEE2E2/B91C1C?text=Image+Error";
                    }}
                  />
                </div>
                <div className="pt-2 text-left">
                  <h3 className="text-gray-800 text-md font-playfair">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-700 font-playfair">
                    {product.price}
                  </p>
                  <div className="flex mt-2 space-x-1.5">
                    {product.colors.map((color, idx) => (
                      <span
                        key={idx}
                        className={`w-3 h-3 block ${color} border border-gray-500`}
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
