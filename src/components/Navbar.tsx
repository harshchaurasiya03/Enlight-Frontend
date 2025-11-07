import { Plus, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../pages/Login/Login";

const MainNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 lg:px-30  sm:px-6 ">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-10">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="/logo/enlightlogo.png"
                className="h-12"
                alt="Enlight Logo"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="#"
                className="text-black-700 hover:text-blue-600 font-medium"
              >
                Buy
              </a>
              <a
                href="#"
                className="text-black-700 hover:text-blue-600 font-medium"
              >
                Rent
              </a>
              <a
                href="#"
                className="text-black-700 hover:text-blue-600 font-medium"
              >
                Sell
              </a>
              <a
                href="#"
                className="text-black-700 hover:text-blue-600 font-medium"
              >
                Rent-To-Own
              </a>
              <a
                href="#"
                className="text-black-700 hover:text-blue-600 font-medium"
              >
                Projects
              </a>
              <a
                href="#"
                className="text-black-700 hover:text-blue-600 font-medium"
              >
                Advice
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* ✅ Login Button */}
            <button
              onClick={() => setShowLogin(true)}
              className="hidden md:flex items-center space-x-2 border text-blue-700 border-blue-500 rounded-md px-4 py-2 text-sm font-medium transition hover:bg-blue-700 hover:text-white
              "
            >
              <span>sign up or Login</span>
            </button>

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
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-inner">
          <div className="px-4 py-3 space-y-2">
            <a href="#" className="block text-black-700 hover:text-blue-600">
              Buy
            </a>
            <a href="#" className="block text-black-700 hover:text-blue-600">
              Rent
            </a>
            <a href="#" className="block text-black-700 hover:text-blue-600">
              Sell
            </a>
            <a href="#" className="block text-black-700 hover:text-blue-600">
              Rent-To-Own
            </a>
            <a href="#" className="block text-black-700 hover:text-blue-600">
              Projects
            </a>
            <a href="#" className="block text-black-700 hover:text-blue-600">
              Advice
            </a>

            {/* ✅ Mobile Login Button */}
            <button
              onClick={() => {
                setShowLogin(true); // open modal
                setIsMobileMenuOpen(false); // close mobile menu
              }}
              className="flex w-full items-center justify-center bg-blue-600 text-white py-2 rounded-md"
            >
              <span>sign up or Login</span>
            </button>
          </div>
        </div>
      )}

      {/* ✅ Login Modal */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </nav>
  );
};

export default MainNavbar;
