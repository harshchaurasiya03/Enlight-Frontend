import { useEffect, useState, useRef } from "react";
import { Plus, Menu, Heart, User, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import type { RootState } from "../../redux/store";
import Login from "../pages/Login/Login";
import { RootState } from "../redux/store";

// ---------- TopHeader Component ----------
const TopHeader = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="bg-blue-900 text-sm py-1.5 px-4 w-full hidden md:block">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <p className="text-gray-100">
          Join us for Exclusive Open House Events This Weekend and Find Your Perfect Home!
        </p>

        <div className="flex items-center space-x-4 text-white">
          <button className="flex items-center space-x-1 hover:text-blue-300 transition">
            <Heart size={16} />
            <span>Wishlist (0)</span>
          </button>

          <div className="flex items-center space-x-1 hover:text-blue-300 cursor-pointer">
            <span>USD</span>
            <ChevronDown size={14} />
          </div>

          <div className="flex items-center space-x-1 hover:text-blue-300 cursor-pointer">
            <span>English</span>
            <ChevronDown size={14} />
          </div>

          <button
            onClick={() => setShowLogin(true)}
            className="flex items-center space-x-1 hover:text-blue-300 transition"
          >
            <User size={16} />
            <span>Login</span>
          </button>
        </div>

        {showLogin && <Login onClose={() => setShowLogin(false)} />}
      </div>
    </div>
  );
};

// ---------- Navbar Component ----------
const NavbarX = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // ---------- Handle Add Property Click ----------
  const handleAddPropertyClick = () => {
    if (user) {
      navigate("/dashboard/PropertyTable");
    } else {
      setShowLogin(true);
    }
  };

  const menuItems = ["Buy", "Rent", "Sell", "Rent-To-Own", "Projects", "Advice", "Blog"];

  return (
    <div className="bg-white shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="/logo/enlightlogo.png" className="h-16" alt="Enlight Logo" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6"> {menuItems.map((item) => item === "Blog" ? ( <Link key={item} to="/blog" className="text-gray-700 hover:text-blue-600 font-medium" > {item} </Link> ) : ( <a key={item} href="#" className="text-gray-700 hover:text-blue-600 font-medium" > {item} </a> ) )}

            <button
              onClick={handleAddPropertyClick}
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-inner">
          <div className="px-4 py-3 space-y-2">
            {menuItems.map((item) =>
  item === "Blog" ? (
    <Link
      key={item}
      to="/blog"
      className="block text-gray-700 hover:text-blue-600"
      onClick={() => setIsMobileMenuOpen(false)} // close mobile menu on click
    >
      {item}
    </Link>
  ) : (
    <a
      key={item}
      href="#"
      className="block text-gray-700 hover:text-blue-600"
    >
      {item}
    </a>
  )
)}


            

            <button
              onClick={handleAddPropertyClick}
              className="flex items-center space-x-2 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              <Plus size={18} />
              <span>Add Property</span>
            </button>

            <div className="border-t mt-4 pt-3 space-y-3">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition">
                <Heart size={16} />
                <span>Wishlist (0)</span>
              </button>

              <div className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 cursor-pointer">
                <span>English</span>
                <ChevronDown size={14} />
              </div>

              <div className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 cursor-pointer">
                <span>USD</span>
                <ChevronDown size={14} />
              </div>

              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center space-x-1 hover:text-blue-300 transition"
              >
                <User size={16} />
                <span>Login</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && <Login onClose={() => setShowLogin(false)} redirectTo="/postproperty" />}
    </div>
  );
};

// ---------- Header Wrapper with Scroll Effect ----------
const HeaderWrapper = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const topHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topHeaderRef.current) {
      setHeaderHeight(topHeaderRef.current.getBoundingClientRect().height);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY - lastScrollY > 20 && currentScrollY > 50) {
        setShowHeader(false);
      } else if (lastScrollY - currentScrollY > 20) {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Top Header */}
      <div
        ref={topHeaderRef}
        style={{
          height: showHeader ? headerHeight || "auto" : 0,
          overflow: "hidden",
          transition: "height 0.3s ease",
        }}
      >
        <TopHeader />
      </div>

      {/* Navbar */}
      <NavbarX />
    </div>
  );
};

export default HeaderWrapper;
