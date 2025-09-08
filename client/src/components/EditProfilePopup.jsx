import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function EditProfilePopup({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "Priya Chauhan",
    email: "priyachauhan@example.com",
    phone: "9876543210",
    address:
      "201, Lotus Residency,\nNear RK University,\nRajkot, Gujarat – 360005",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave?.(formData);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl w-[90%] max-w-xl p-6 font-['Plus_Jakarta_Sans'] relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-black"
        >
          <FiX />
        </button>

        <h2 className="text-2xl font-semibold font-['Italiana'] text-[#2e4635] mb-6 text-center">
          Edit Profile
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#4B6A5A] text-white hover:bg-[#3a574b] rounded"
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
