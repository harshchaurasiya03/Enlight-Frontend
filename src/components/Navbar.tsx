import { Plus, Menu, Heart, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const MainNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
              Projects
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
              Properties
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
              Agents
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
              News
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
              Careers
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
              Contact
            </a>

            <button className="flex items-center space-x-2 text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition">
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
              Projects
            </a>
            <a href="#" className="block text-gray-700 hover:text-blue-600">
              Properties
            </a>
            <a href="#" className="block text-gray-700 hover:text-blue-600">
              Agents
            </a>
            <a href="#" className="block text-gray-700 hover:text-blue-600">
              News
            </a>
            <a href="#" className="block text-gray-700 hover:text-blue-600">
              Careers
            </a>
            <a href="#" className="block text-gray-700 hover:text-blue-600">
              Contact
            </a>

            {/* Add Property Button */}
            <button className="flex w-full items-center space-x-2 justify-center bg-red-600 text-white py-2 rounded-md">
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
              <Link
                to="/signin"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
              >
                <User size={16} />
                <span>Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainNavbar;
