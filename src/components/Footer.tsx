import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 lg:px-30 mt-10">
        {/* Main Grid */}
        <div className="w-full px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {/* Section 1 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Real Estate Market</h3>
            <ul className="space-y-1 text-gray-400 text-sm">
              <li>Amnat Charoen Real Estate</li>
              <li>Ang Thong Real Estate</li>
              <li>Bangkok Real Estate</li>
              <li>Bueng Kan Real Estate</li>
              <li>Buri Ram Real Estate</li>
              <li>Chachoengsao Real Estate</li>
              <li>Chai Nat Real Estate</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Popular Searches</h3>
            <ul className="space-y-1 text-gray-400 text-sm">
              <li>Bangkok Property for Sale</li>
              <li>Phuket Property for Sale</li>
              <li>Chon Buri Property for Sale</li>
              <li>Chiang Mai Property for Sale</li>
              <li>Prachuap Khiri Khan Property for Sale</li>
              <li>Samut Prakan Property for Sale</li>
              <li>Nonthaburi Property for Sale</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Property Types</h3>
            <ul className="space-y-1 text-gray-400 text-sm">
              <li>Condo for Sale</li>
              <li>Villa for Sale</li>
              <li>Townhouse for Sale</li>
              <li>Studio Apartments</li>
              <li>Luxury Homes</li>
              <li>Commercial Properties</li>
              <li>Land Plots</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-1 text-gray-400 text-sm">
              <li>Blog & Insights</li>
              <li>Guides & Tips</li>
              <li>Market Trends</li>
              <li>Investment Advice</li>
              <li>FAQ</li>
              <li>Support</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-6 px-4 sm:px-8 lg:px-16 flex flex-col md:flex-row justify-between items-center">
          {/* Left Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-400 text-sm mb-4 md:mb-0">
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Cookies</span>
            <span className="hover:text-white cursor-pointer">Contact</span>
            <span className="hover:text-white cursor-pointer">Enlight</span>
            <span className="hover:text-white cursor-pointer">Press</span>
            <span className="hover:text-white cursor-pointer">Careers</span>
            <span className="hover:text-white cursor-pointer">Site Map</span>
            <span className="hover:text-white cursor-pointer">About Us</span>
          </div>

          {/* Right Copyright */}
          <div className="text-gray-400 text-sm text-center md:text-right">
            Copyrights © 2025, Enlight Group
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
