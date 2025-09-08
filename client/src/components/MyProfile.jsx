import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { Mail, User, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import sweater from "../assets/mint-zip.png";
import EditProfilePopup from "./EditProfilePopup";

export default function MyProfile() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "Abc Xyz",
    email: "abc@example.com",
    phone: "+91 1234567890",
    address: "Abc Xyz Building, near Pqr, India",
  });

  const navigate = useNavigate();

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

        {/* Mobile Menu */}
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

      {/* Profile Section */}
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: User Info */}
        <div className="space-y-4">
          <p className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-600" />
            <span>{userData.email}</span>
          </p>
          <p className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-600" />
            <span>{userData.name}</span>
          </p>
          <p className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-600" />
            <span>{userData.address}</span>
          </p>
          <p className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-600" />
            <span>{userData.phone}</span>
          </p>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="bg-[#4B6A5A] text-white px-6 py-2 rounded hover:opacity-90"
          >
            Update
          </button>
        </div>

        {/* Right: Orders */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
          <p className="mb-2">
            <span className="font-semibold">Status:</span> Payment Pending
          </p>

          <div className="flex gap-4 border-b pb-4 mb-4">
            <img
              src={sweater}
              alt="Mint Zip-Up"
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

          {/* Summary */}
          <div className="bg-[#9AA79E] text-black px-6 py-4">
            <div className="flex justify-between py-1">
              <span>Subtotal :</span>
              <span>₹500</span>
            </div>
            <div className="flex justify-between py-1 border-b pb-1">
              <span>Tax Info. :</span>
              <span>-</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2">
              <span>Total:</span>
              <span>₹500</span>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Component */}
      <EditProfilePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={(updatedData) => setUserData(updatedData)}
      />
    </motion.div>
  );
}
