import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import LoginPopup from "./LoginPopup";
import RegisterPopup from "./RegisterPopup";
import ForgotPasswordPopup from "./ForgotPasswordPopup";
import { toast } from "react-toastify";

export default function Navbar({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    localStorage.removeItem("token");
    setIsLoggedIn(false);

    toast.success("Logged out successfully!");

    navigate("/");
  };

  const links = [
    { name: "Home", type: "route", path: "/" },
    { name: "Shop", type: "scroll" },
    { name: "About Us", type: "scroll" },
    { name: "Contact", type: "scroll" },
    { name: "Cart", type: "route", path: "/cart" },
    isLoggedIn
      ? { name: "MyProfile", type: "route", path: "/myprofile" }
      : { name: "Login", type: "popup" },
  ];

  const handleLinkClick = (link) => {
    if (link.type === "popup") {
      setShowLogin(true);
    } else if (link.type === "scroll" && onNavigate) {
      onNavigate(link.name);
    }
  };

  return (
    <>
      {/* Popups */}
      {showLogin && (
        <LoginPopup
          onClose={() => setShowLogin(false)}
          onLoginSuccess={() => {
            setIsLoggedIn(true);
            setShowLogin(false);
          }}
          switchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          switchToForgot={() => {
            setShowLogin(false);
            setShowForgot(true);
          }}
        />
      )}

      {showRegister && (
        <RegisterPopup
          onClose={() => setShowRegister(false)}
          switchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}

      {showForgot && (
        <ForgotPasswordPopup
          onClose={() => setShowForgot(false)}
          switchToLogin={() => {
            setShowForgot(false);
            setShowLogin(true);
          }}
        />
      )}

      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#DCE1DC]/70 backdrop-blur-sm shadow-md"
            : "bg-[#DCE1DC]"
        }`}
      >
        {/* Top strip */}
        <div className="bg-[#4B6A5A] h-8 w-full" />

        {/* Main nav */}
        <div className="flex items-center justify-between w-full max-w-screen-xl px-4 py-4 mx-auto md:py-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={Logo} alt="Logo" className="object-contain w-20 h-20" />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-10 font-['Italiana'] text-2xl text-black">
            {links.map((link, idx) =>
              link.type === "route" ? (
                <Link
                  key={idx}
                  to={link.path}
                  className="transition hover:text-green-800"
                >
                  {link.name}
                </Link>
              ) : (
                <span
                  key={idx}
                  onClick={() => handleLinkClick(link)}
                  className="transition cursor-pointer hover:text-green-800"
                >
                  {link.name}
                </span>
              )
            )}

            {/* Logout button ONLY for desktop when logged in */}
            {isLoggedIn && (
              <span
                onClick={handleLogout}
                className="transition cursor-pointer hover:text-red-600"
              >
                Logout
              </span>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-4 text-2xl text-black md:hidden"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-screen pb-4" : "max-h-0"
          }`}
        >
          <div className="px-4 space-y-4 font-['Italiana'] text-black">
            {links.map((link, idx) =>
              link.type === "route" ? (
                <Link
                  key={idx}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-2xl hover:text-green-800"
                >
                  {link.name}
                </Link>
              ) : (
                <span
                  key={idx}
                  onClick={() => {
                    handleLinkClick(link);
                    setIsOpen(false);
                  }}
                  className="block text-2xl cursor-pointer hover:text-green-800"
                >
                  {link.name}
                </span>
              )
            )}

            {/* Mobile logout */}
            {isLoggedIn && (
              <span
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block text-2xl cursor-pointer hover:text-red-600"
              >
                Logout
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-[100px]" />
    </>
  );
}
