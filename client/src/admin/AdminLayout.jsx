import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className=" font-playfair flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Right side */}
      <div className="flex-1 flex flex-col bg-[#DCE1DC]">
        {/* Topbar */}
        <div className="flex items-center justify-between bg-white px-4 py-3 shadow-md">
          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <HiMenu />
          </button>
        </div>

        {/* Main content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
