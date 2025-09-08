import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Logo from "../assets/Logo.png";
import LoginPopup from "./LoginPopup";
import RegisterPopup from "./RegisterPopup";
import ForgotPasswordPopup from "./ForgotPasswordPopup";

export default function Navbar({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  // ✅ User authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Links (conditionally include Login or MyProfile)
  const links = [
    "Home",
    "Shop",
    "About Us",
    "Contact",
    "Cart",
    isLoggedIn ? "MyProfile" : "Login",
  ];

  const handleLinkClick = (link) => {
    if (link === "Login") {
      setShowLogin(true);
    } else if (link === "MyProfile") {
      window.location.href = "/myprofile"; // redirect to MyProfile page
    } else if (link === "Cart") {
      window.location.href = "/cart";
    } else if (onNavigate) {
      onNavigate(link);
    }
  };

  // ✅ Detect Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Fake login success (replace with real auth later)
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  return (
    <>
      {showLogin && (
        <LoginPopup
          onClose={() => setShowLogin(false)}
          switchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          switchToForgot={() => {
            setShowLogin(false);
            setShowForgot(true);
          }}
          // 🔑 call when user successfully logs in
          onLoginSuccess={handleLoginSuccess}
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
        <div className="flex items-center justify-between w-full max-w-screen-xl px-4 py-4 mx-auto md:py-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={Logo} alt="Logo" className="object-contain w-20 h-20" />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-10 font-['Italiana'] text-2xl text-black">
            {links.map((link, idx) => (
              <span
                key={idx}
                onClick={() => handleLinkClick(link)}
                className="transition cursor-pointer hover:text-green-800"
              >
                {link}
              </span>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-4 text-2xl text-black md:hidden"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Nav Links */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-screen pb-4" : "max-h-0"
          }`}
        >
          <div className="px-4 space-y-4 font-['Italiana'] text-black">
            {links.map((link, idx) => (
              <span
                key={idx}
                onClick={() => {
                  handleLinkClick(link);
                  setIsOpen(false);
                }}
                className="block text-2xl hover:text-green-800"
              >
                {link}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Spacer to prevent content hiding behind navbar */}
      <div className="h-[100px]" />
    </>
  );
}
