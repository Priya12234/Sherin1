import React, { useState } from "react";
import headerImg from "../assets/header-image2.png";
const sampleOrders = [
  {
    id: "ORD001",
    customer: "Priya Chauhan",
    amount: 2500,
    status: "Pending",
    date: "2025-08-20",
    items: ["Kurti", "Earrings", "Handbag"],
  },
  {
    id: "ORD002",
    customer: "Aarav Mehta",
    amount: 1800,
    status: "Shipped",
    date: "2025-08-21",
    items: ["Saree", "Bangles"],
  },
  {
    id: "ORD003",
    customer: "Riya Patel",
    amount: 3200,
    status: "Delivered",
    date: "2025-08-22",
    items: ["Lehenga", "Necklace", "Heels"],
  },
];

const ManageOrders = () => {
  const [orders, setOrders] = useState(sampleOrders);
  const [searchTerm, setSearchTerm] = useState("");

  const updateStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const cancelOrder = (id) => {
    const confirmCancel = window.confirm("Cancel this order?");
    if (confirmCancel) updateStatus(id, "Cancelled");
  };

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="relative w-full h-40 sm:h-52 md:h-30 rounded-lg overflow-hidden mb-6">
        <picture>
          <source media="(max-width: 640px)" srcSet={headerImg} />
          <source media="(max-width: 1280px)" srcSet={headerImg} />
          <img
            src={headerImg}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </picture>

        <div className="absolute bottom-4 left-6 sm:bottom-6 sm:left-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            Manage Orders
          </h1>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search by Order ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full max-w-sm"
        />
      </div>

      {/* Responsive Table */}
      <div className="overflow-hidden bg-white shadow rounded-lg">
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3">Items</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3">₹{order.amount}</td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3">{order.items.join(", ")}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    <select
                      className="border rounded px-2 py-1"
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                    >
                      <option>Pending</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 md:hidden p-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow-sm space-y-2"
            >
              <div className="flex justify-between">
                <span className="font-bold">{order.id}</span>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p>👤 {order.customer}</p>
              <p>📦 {order.items.join(", ")}</p>
              <p>💰 ₹{order.amount}</p>
              <p>📅 {order.date}</p>
              <div className="flex gap-2">
                <select
                  className="border rounded px-2 py-1 flex-1"
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                >
                  <option>Pending</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
                <button
                  onClick={() => cancelOrder(order.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
