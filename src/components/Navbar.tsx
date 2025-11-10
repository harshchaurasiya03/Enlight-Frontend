import { Plus, Menu, Heart, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../pages/Login/Login";

const MainNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="/logo/enlightlogo.png"
                className="h-16"
                alt="Enlight Logo"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Buy
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Rent
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Sell
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Rent-To-Own
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Projects
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Advice
            </a>

            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center space-x-2 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              <Plus size={18} />
              <span>Add Property</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu (visible only below lg) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-inner">
          <div className="px-4 py-3 space-y-2">
            {/* Main Nav Links */}
            <a href="#" className="block text-gray-700 hover:text-blue-600">
              Buy
            </a>
            <a href="#" className="block text-gray-700 hover:text-blue-600">
              Rent
            </a>
            <a href="#" className="block text-gray-700 hover:text-blue-600">
              Sell
            </a>
            <a href="#" className="block text-gray-700 hover:text-blue-600">
              Rent-To-Own
            </a>
            <a href="#" className="block text-gray-700 hover:text-blue-600">
              Projects
            </a>
            <a href="#" className="block text-gray-700 hover:text-blue-600">
              Advice
            </a>

            {/* Add Property Button */}
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center space-x-2 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              <Plus size={18} />
              <span>Add Property</span>
            </button>

            {/* ✅ Added TopHeader elements for mobile only */}
            <div className="border-t mt-4 pt-3 space-y-3">
              {/* Wishlist */}
              <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition">
                <Heart size={16} />
                <span>Wishlist (0)</span>
              </button>

              {/* Language Selector */}
              <div className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 cursor-pointer">
                <span>English</span>
                <ChevronDown size={14} />
              </div>

              {/* Currency Selector */}
              <div className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 cursor-pointer">
                <span>USD</span>
                <ChevronDown size={14} />
              </div>

              {/* Login */}
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center space-x-1 hover:text-blue-300 transition"
              >
                <User size={16} />
                <span>Login</span>
              </button>
              {showLogin && <Login onClose={() => setShowLogin(false)} />}
            </div>
          </div>
        </div>
      )}

      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </nav>
  );
};

export default MainNavbar;
