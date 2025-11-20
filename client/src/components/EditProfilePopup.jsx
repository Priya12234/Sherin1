import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onSave,
  userData,
}) {
  const [formData, setFormData] = useState(userData);

  // Load user data when popup opens
  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["label", "street", "city", "state", "pincode"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    const finalBody = {
      name: formData.name,
      phone: formData.phone,
      address: {
        label: formData.address.label,
        street: formData.address.street,
        city: formData.address.city,
        state: formData.address.state,
        pincode: Number(formData.address.pincode),
      },
    };

    onSave?.(finalBody);
    onClose();
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg shadow-xl w-[90%] max-w-xl p-6 relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-black"
        >
          <FiX />
        </button>

        <h2 className="text-2xl font-semibold text-[#2e4635] mb-6 text-center">
          Edit Profile
        </h2>

        <div className="space-y-4">
          {/* Name */}
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

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              disabled
              value={formData.email}
              className="w-full border rounded px-3 py-2 text-sm bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Phone */}
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

          {/* Address Fields */}
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>

            <input
              type="text"
              name="label"
              placeholder="Label (e.g., Home)"
              value={formData.address.label}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mb-2 text-sm"
            />

            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.address.street}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mb-2 text-sm"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.address.city}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mb-2 text-sm"
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.address.state}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mb-2 text-sm"
            />

            <input
              type="number"
              name="pincode"
              placeholder="Pincode"
              value={formData.address.pincode}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Buttons */}
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
