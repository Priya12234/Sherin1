import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";

import modelHero from "../assets/modelHero.png";
import dress from "../assets/dress.png";
import shirt from "../assets/shirt.png";

// local product images (Option B -> src/assets/products/)
import petalJeans from "../assets/Petal-jeans.png";
import petalCorset from "../assets/Petal-corset.png";
import diamondEarCuff from "../assets/diamond-ear-cuff.png";
import floralEarrings from "../assets/floral-earrings.png";

import ShopTheLookModal from "../components/ShopTheLookModal";

export default function Shop() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [combos, setCombos] = useState([]);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [loadingCombos, setLoadingCombos] = useState(false);

  // IMAGE MAP (DB filename -> local imported file)
const imageMap = {
    "Petal-jeans.png": petalJeans,
    "Petal-corset.png": petalCorset,
    "diamond-ear-cuff.png": diamondEarCuff,
    "floral-earrings.png": floralEarrings,
    // add more images here when you upload new product images
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchCombos();
  }, []);

  const fetchCombos = async () => {
    setLoadingCombos(true);
    try {
      const res = await fetch("http://localhost:5000/api/combos/");
      const json = await res.json();

      const combosArray = json.result || [];

      // Normalize combos and attach displayImage for grid
      const normalized = combosArray.map((c) => {
        const firstProductImage =
          c.products?.[0]?.productId?.images?.[0] || null;

        const mappedImage = firstProductImage
          ? imageMap[firstProductImage]
          : null;

        const fallbackComboImage = c.images?.[0] || null;

        const displayImage = mappedImage || fallbackComboImage || null;

        return { ...c, displayImage };
      });

      setCombos(normalized);
    } catch (err) {
      console.error("Error fetching combos:", err);
    } finally {
      setLoadingCombos(false);
    }
  };

  const openModal = (combo) => {
    setSelectedCombo(combo);
    setModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#DCE1DC] font-serif min-h-screen"
    >
      {/* Top green strip */}
      <div className="bg-[#4B6A5A] h-8 w-full" />

      {/* Header */}
      <header className="bg-[#ECEFE8] px-4 py-8 sm:px-10 font-italiana">
        <div className="flex items-center justify-between ">
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-10 font-['Italiana'] text-lg text-black">
            <Link to="/">Home</Link>
            <Link to="/collection">Collection</Link>
            <Link to="/treasures">Sherin Treasures</Link>
            <Link to="/search">Search</Link>
          </div>

          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-italiana">
            Sherin
          </h1>

          <div className="flex items-center gap-4 text-xl">
            <Link to="/myprofile">
              <FiUser className="cursor-pointer" />
            </Link>

            <Link to="/cart">
              <FiShoppingCart className="cursor-pointer" />
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-3 mt-4 overflow-hidden text-sm sm:hidden"
            >
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link to="/collection" onClick={() => setMenuOpen(false)}>
                Collection
              </Link>
              <Link to="/treasures" onClick={() => setMenuOpen(false)}>
                Sherin Treasures
              </Link>
              <Link to="/search" onClick={() => setMenuOpen(false)}>
                Search
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative w-full">
        <img
          src={modelHero}
          alt="Hero"
          className="w-full object-cover max-h-[700px]"
        />
        <div className="absolute inset-0 flex flex-col justify-between px-4 py-6 text-sm text-white sm:px-10">
          <div className="flex justify-between">
            <span>View More</span>
            <span>Shop this</span>
          </div>
          <div className="mb-12 text-lg font-light text-center sm:text-xl">
            Whispering chiffon dream
          </div>
        </div>
      </section>

      {/* Combos Section */}
      <section className="px-4 py-16 sm:px-10">
        <h2 className="mb-10 text-3xl text-center font-italiana">
          Where fit meets elegance
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {loadingCombos && <p className="text-center">Loading combos...</p>}
          {!loadingCombos && combos.length === 0 && (
            <p className="text-center">No combos found.</p>
          )}

          {combos.map((combo) => (
            <div key={combo._id} className="text-center">
              <img
                src={combo.displayImage || dress}
                alt={combo.title}
                className="object-cover w-full border border-gray-400"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = dress;
                }}
              />

              <p className="mt-2 text-lg font-semibold">{combo.title}</p>

              <p className="mt-1 text-sm text-[#4B6A5A]">
                ₹{combo.price}{" "}
                {combo.discount ? <span>({combo.discount}% off)</span> : null}
              </p>

              <p
                className="mt-2 text-sm underline cursor-pointer"
                onClick={() => openModal(combo)}
              >
                Shop the look
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers (unchanged) */}
      <section className="px-4 py-16 border-t sm:px-10 bg-[#ECEFE8]">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-italiana text-[#1A1A1A]">
            Our Best Sellers
          </h2>
          <p className="mt-2 text-sm text-[#4B6A5A] font-medium">
            Curated favorites loved by our community
          </p>

          <div className="mt-6">
            <label className="text-sm text-gray-700">Filter By:</label>
            <select className="ml-3 px-3 py-2 rounded-md border border-gray-300 bg-[#DCE1DC] text-[#1A1A1A]">
              <option>Collections</option>
              <option>Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8 overflow-x-auto scrollbar-hide px-2">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="relative min-w-[250px] bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={shirt}
                alt="Shirt"
                className="object-cover w-full h-100"
              />

              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black/40"
              >
                <button className="px-4 py-2 text-sm text-white bg-[#4B6A5A] rounded-md hover:bg-[#3b5749] transition">
                  Quick View
                </button>
              </motion.div>

              <div className="p-4 text-center">
                <p className="font-semibold text-lg text-[#1A1A1A]">
                  Signature Shirt
                </p>
                <p className="text-sm text-[#4B6A5A]">$79.00</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      <ShopTheLookModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        combo={selectedCombo}
        imageMap={imageMap}
      />
    </motion.div>
  );
}
