import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  BarChart3,
  Settings,
} from "lucide-react";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/reports", label: "Reports", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-50 md:static bg-white border-r w-64 min-h-screen p-4 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h2 className="text-3xl font-extrabold mb-6 tracking-wide flex items-center gap-2">
          <img
            src={logo} // ✅ replace with your logo path (e.g., from assets folder or public)
            alt="Sherin Logo"
            className="w-20 h-20 object-contain" // adjust size as needed
          />
          <div>
            <span className="block text-xl text-gray-500 font-medium mt-2">
              Admin Panel
            </span>
          </div>
        </h2>

        <nav className="space-y-2">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/admin"} // 👈 Only apply exact match for Dashboard
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-200 ${
                  isActive ? "bg-gray-300 font-semibold" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
