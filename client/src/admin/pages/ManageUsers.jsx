import React, { useState } from "react";
import headerImg from "../assets/header-image4.png";
const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample Users
  const [users] = useState([
    {
      id: "U001",
      name: "Priya Chauhan",
      email: "priya@example.com",
      role: "Customer",
      joined: "2025-01-12",
    },
    {
      id: "U002",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      role: "Admin",
      joined: "2025-02-05",
    },
    {
      id: "U003",
      name: "Anjali Patel",
      email: "anjali@example.com",
      role: "Customer",
      joined: "2025-03-08",
    },
  ]);

  // Filtered Users
  const filteredUsers = users.filter(
    (user) =>
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
            Manage Users
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

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left text-sm font-semibold">User ID</th>
              <th className="p-3 text-left text-sm font-semibold">Name</th>
              <th className="p-3 text-left text-sm font-semibold">Email</th>
              <th className="p-3 text-left text-sm font-semibold">Role</th>
              <th className="p-3 text-left text-sm font-semibold">Joined</th>
              <th className="p-3 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t text-sm hover:bg-gray-50">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">{user.joined}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {user.name}
              </h2>
              <p className="text-sm text-gray-600">{user.email}</p>

              <div className="mt-3 space-y-1 text-sm">
                <p>
                  <span className="font-semibold">ID:</span> {user.id}
                </p>
                <p>
                  <span className="font-semibold">Role:</span> {user.role}
                </p>
                <p>
                  <span className="font-semibold">Joined:</span> {user.joined}
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Edit
                </button>
                <button className="flex-1 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
