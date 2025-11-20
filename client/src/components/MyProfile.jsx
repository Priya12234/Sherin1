import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { Mail, User, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import EditProfilePopup from "./EditProfilePopup";
import axios from "axios";

export default function MyProfile() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const handleSaveProfile = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    await axios.put(`http://localhost:5000/api/users/profile`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchProfile(); // refresh UI
  };


  const navigate = useNavigate();

  const links = [
    { name: "Home", href: "/" },
    { name: "Collection", href: "/collection" },
    { name: "Sherin Treasures", href: "/treasures" },
    { name: "Pairs", href: "/shop" },
    { name: "Contact Us", href: "/contact" },
  ];

  // 🔥 Fetch User Profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // If backend sends HTML due to invalid token → redirect
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.log("Not JSON → maybe token invalid. Redirecting…");
        navigate("/login");
        return;
      }

      const data = await res.json();
      console.log("Profile API:", data);

      // Backend returns plain object → use directly
      setUserData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
      });

      setLoading(false);
    } catch (error) {
      console.error("Profile fetch error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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

      {/* Loading */}
      {loading ? (
        <p className="text-center text-lg py-10">Loading Profile...</p>
      ) : (
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
              <span>{userData.address || "No address added"}</span>
            </p>

            <p className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-600" />
              <span>{userData.phone || "No phone added"}</span>
            </p>

            <button
              onClick={() => setIsPopupOpen(true)}
              className="bg-[#4B6A5A] text-white px-6 py-2 rounded hover:opacity-90"
            >
              Update
            </button>
          </div>

          {/* Right: Orders (Static for now) */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
            <p className="mb-2">
              <span className="font-semibold">Status:</span> No orders
            </p>
          </div>
        </div>
      )}

      {/* Popup Component */}
      <EditProfilePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleSaveProfile}
        userData={userData} // ✔ correct
      />
    </motion.div>
  );
}
