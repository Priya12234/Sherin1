import { useState } from "react";

export default function AdminNavbar() {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="bg-white border-b px-4 py-3 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="relative">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="text-sm"
        >
          Admin ▼
        </button>
        {profileOpen && (
          <div className="absolute right-0 mt-2 bg-white border rounded shadow-md">
            <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
              Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
