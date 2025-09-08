import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import sweater from "../assets/mint-zip.png";

export default function Cart() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "Collection", href: "/collection" },
    { name: "Sherin Treasures", href: "/treasures" },
    { name: "Pairs", href: "/shop" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen font-serif"
    >
      {/* Top strip */}
      <div className="bg-[#4B6A5A] h-8 w-full" />

      {/* Header */}
      <header className="relative px-4 py-6 sm:px-10 font-italiana text-center border-b border-black">
        <div className="absolute left-4 top-6 sm:left-10">
          <button
            onClick={() => navigate(-1)}
            className="text-lg hover:text-[#4B6A5A] transition"
          >
            ←
          </button>
        </div>
        <h1 className="text-4xl">Sherin</h1>

        {/* Desktop Nav */}
        <nav className="hidden mt-4 justify-center gap-6 text-md md:flex">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[#4B6A5A] transition"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Icon */}
        <div className="absolute top-6 right-6 md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="flex flex-col items-center mt-4 gap-3 text-md md:hidden">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#4B6A5A] transition"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Cart Title */}
      <div className="text-center py-10">
        <h2 className="text-3xl font-italiana mb-2">Shopping Bag</h2>
        <p className="text-sm">
          Sherin presents each purchase in signature packaging.
        </p>
      </div>

      {/* Cart Item */}
      <div className="max-w-4xl mx-auto border-t border-gray-400 pt-6 px-4 sm:px-10">
        <div className="flex flex-col sm:flex-row gap-6 items-start justify-between">
          <div className="flex gap-4">
            <img
              src={sweater}
              alt="Product"
              className="w-24 h-28 object-cover"
            />
            <div>
              <h3 className="font-semibold text-lg">Mint Zip-Up</h3>
              <p className="text-sm mt-1">
                Comfortable, trendy and fits your body and gives you classy look
              </p>
              <p className="text-sm mt-1">Size: M</p>
              <button className="text-sm text-[#4B6A5A] underline mt-2">
                Remove
              </button>
            </div>
          </div>

          <div className="text-right sm:mt-0 mt-4">
            <label className="text-sm mr-2">Qty:</label>
            <select
              value={quantity}
              onChange={handleQuantityChange}
              className="border px-2 py-1"
            >
              {[1, 2, 3, 4, 5].map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
            <p className="mt-2 font-medium">₹{500 * quantity}</p>
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-10 mb-20">
        <div className="bg-[#9AA79E] text-black px-6 py-4">
          <div className="flex justify-between py-1">
            <span>Subtotal :</span>
            <span>₹{500 * quantity}</span>
          </div>
          <div className="flex justify-between py-1 border-b pb-1">
            <span>Tax Info. :</span>
            <span>-</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2">
            <span>Total:</span>
            <span>₹{500 * quantity}</span>
          </div>
        </div>
        <div className="text-center mt-8">
          <button className="border-4 border-[#284E2D] text-[#1e3a1b] font-playfair px-6 py-2 hover:bg-[#284E2D] hover:text-white transition">
            Confirm Order
          </button>
        </div>
      </div>
    </motion.div>
  );
}
