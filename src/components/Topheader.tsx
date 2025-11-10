import { Heart, User, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import Login from "../pages/Login/Login";

const TopHeader = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerHeight = 40; // adjust according to your header's actual height (e.g., py-2 + font-size)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const threshold = 20;

      if (currentScrollY - lastScrollY > threshold && currentScrollY > 50) {
        // scrolling down
        setVisible(false);
      } else if (lastScrollY - currentScrollY > threshold) {
        // scrolling up
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Placeholder to prevent layout shift */}
      <div style={{ height: `${headerHeight}px` }} />

      <div
        className={`lg:block bg-blue-900 text-white text-sm py-2 px-4 fixed top-0 w-full z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left Quote */}
          <p className="text-gray-100">
            Join us for Exclusive Open House Events This Weekend and Find Your Perfect Home!
          </p>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
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
        </div>
      </div>

      {/* Popup render */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default TopHeader;
