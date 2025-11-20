import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import petalJeans from "../assets/Petal-jeans.png";
import petalCorset from "../assets/Petal-corset.png";
import diamondEarCuff from "../assets/diamond-ear-cuff.png";
import floralEarrings from "../assets/floral-earrings.png";

export default function Cart() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const links = [
    { name: "Home", href: "/" },
    { name: "Collection", href: "/collection" },
    { name: "Sherin Treasures", href: "/treasures" },
    { name: "Pairs", href: "/shop" },
    { name: "Contact Us", href: "/contact" },
  ];

  const imageMap = {
    "Petal-jeans.png": petalJeans,
    "Petal-corset.png": petalCorset,
    "diamond-ear-cuff.png": diamondEarCuff,
    "floral-earrings.png": floralEarrings,
    // add more images here when you upload new product images
  };

  // Fetch Cart
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      console.log("Fetched cart:", data);

      setCartItems(data.result?.items || []);
      setLoading(false);
    } catch (err) {
      console.error("Cart fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Remove Item
  const removeItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/cart/remove/${itemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchCart();
    } catch (err) {
      console.error("Remove item error:", err);
    }
  };

  // Subtotal Calculation
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.comboId.price * item.quantity,
    0
  );

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

        {/* Mobile Navbar */}
        <div className="absolute top-6 right-6 md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

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

      {/* Title */}
      <div className="text-center py-10">
        <h2 className="text-3xl font-italiana mb-2">Shopping Bag</h2>
        <p className="text-sm">
          Sherin presents each purchase in signature packaging.
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <>
          {/* CART ITEMS */}
          <div className="max-w-4xl mx-auto border-t border-gray-400 pt-6 px-4 sm:px-10">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row gap-6 items-start justify-between mb-6"
              >
                <div className="flex gap-4">
                  <img
                    src={imageMap[item.comboId.images?.[0]]}
                    alt="Product"
                    className="w-24 h-28 object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-lg">
                      {item.comboId.title}
                    </h3>
                    <p className="text-sm mt-1">{item.comboId.description}</p>

                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-sm text-[#4B6A5A] underline mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Quantity + Price */}
                <div className="text-right">
                  <p className="text-sm">Qty: {item.quantity}</p>
                  <p className="mt-2 font-medium">
                    ₹{item.comboId.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-10 mb-20">
            <div className="bg-[#9AA79E] text-black px-6 py-4">
              <div className="flex justify-between py-1">
                <span>Subtotal :</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between py-1 border-b pb-1">
                <span>Tax Info. :</span>
                <span>-</span>
              </div>

              <div className="flex justify-between font-semibold text-lg pt-2">
                <span>Total:</span>
                <span>₹{subtotal}</span>
              </div>
            </div>

            <div className="text-center mt-8">
              <button className="border-4 border-[#284E2D] text-[#1e3a1b] font-playfair px-6 py-2 hover:bg-[#284E2D] hover:text-white transition">
                Confirm Order
              </button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
