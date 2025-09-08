// pages/admin/Dashboard.jsx
import AdminLayout from "../AdminLayout";
import doodleImg from "../assets/fashion-doodle.jpg";
import { Bell } from "lucide-react"; // ✅ lucide-react icons
import { useState } from "react";

export default function Dashboard() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      {/* Hero Section with doodle */}
      <div className=" relative grid grid-cols-1 md:grid-cols-2 items-center gap-6 px-10 py-12 bg-gradient-to-r from-pink-50 to-gray-100  shadow">
        {/* Notification Icon */}
        <div className="absolute top-4 right-6">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full hover:bg-gray-200 transition"
          >
            <Bell className="w-6 h-6 text-gray-700" />
            {/* Small red dot for unread */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg p-4 z-10">
              <h3 className="font-semibold text-gray-800 mb-2">
                Notifications
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="p-2 bg-gray-50 rounded-lg">
                  2 products running low on stock
                </li>
                <li className="p-2 bg-gray-50 rounded-lg">
                  3 pending orders need approval
                </li>
              </ul>
              <button className="w-full mt-3 text-[#143619]  text-sm font-medium hover:underline">
                View All
              </button>
            </div>
          )}
        </div>

        {/* Left Illustration */}
        <div className="flex justify-center">
          <img
            src={doodleImg}
            alt="Fashion Doodle"
            className=" shadow-lg max-h-96"
          />
        </div>

        {/* Right Welcome Message */}
        <div>
          <h1 className=" text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
          <p className="text-gray-600 mb-6">
            Welcome to your admin dashboard! 🛠️ <br />
            Manage products, orders, outfits, and customers easily.
          </p>
          <button className="px-6 py-3 bg-[#284E2D] text-white rounded-xl shadow hover:bg-[#355E3B] transition">
            + Add New Product
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-10 py-10">
        <div className="bg-white p-6  shadow hover:shadow-lg transition text-center">
          <h3 className="text-xl">👗</h3>
          <p className="text-lg font-semibold mt-2">Total Products</p>
          <p className="text-2xl font-bold text-pink-600">120</p>
        </div>
        <div className="bg-white p-6  shadow hover:shadow-lg transition text-center">
          <h3 className="text-xl">📦</h3>
          <p className="text-lg font-semibold mt-2">Pending Orders</p>
          <p className="text-2xl font-bold text-pink-600">15</p>
        </div>
        <div className="bg-white p-6  shadow hover:shadow-lg transition text-center">
          <h3 className="text-xl">💎</h3>
          <p className="text-lg font-semibold mt-2">Jewelry Sets</p>
          <p className="text-2xl font-bold text-pink-600">40</p>
        </div>
        <div className="bg-white p-6  shadow hover:shadow-lg transition text-center">
          <h3 className="text-xl">👥</h3>
          <p className="text-lg font-semibold mt-2">Active Customers</p>
          <p className="text-2xl font-bold text-pink-600">320</p>
        </div>
      </div>
    </>
  );
}
