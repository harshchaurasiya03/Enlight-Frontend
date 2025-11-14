import React from "react";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  // Helper function to render <li> and navigate to the same page
  const renderList = (items: string[]) =>
    items.map((item, i) => (
      <li
        key={i}
        role="button"
        className="hover:text-white cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          navigate("/propertydeatilspage"); // all items go to same page
        }}
      >
        {item}
      </li>
    ));

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 lg:px-30 mt-10">
        {/* Main Grid */}
        <div className="w-full px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          
          {/* Section 1 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Real Estate Market</h3>
            <ul className="space-y-1 text-gray-400 text-sm">
              {renderList([
                "Amnat Charoen Real Estate",
                "Ang Thong Real Estate",
                "Bangkok Real Estate",
                "Bueng Kan Real Estate",
                "Buri Ram Real Estate",
                "Chachoengsao Real Estate",
                "Chai Nat Real Estate",
              ])}
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Popular Searches</h3>
            <ul className="space-y-1 text-gray-400 text-sm">
              {renderList([
                "Bangkok Property for Sale",
                "Phuket Property for Sale",
                "Chon Buri Property for Sale",
                "Chiang Mai Property for Sale",
                "Prachuap Khiri Khan Property for Sale",
                "Samut Prakan Property for Sale",
                "Nonthaburi Property for Sale",
              ])}
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Property Types</h3>
            <ul className="space-y-1 text-gray-400 text-sm">
              {renderList([
                "Condo for Sale",
                "Villa for Sale",
                "Townhouse for Sale",
                "Studio Apartments",
                "Luxury Homes",
                "Commercial Properties",
                "Land Plots",
              ])}
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-1 text-gray-400 text-sm">
              {renderList([
                "Blog & Insights",
                "Guides & Tips",
                "Market Trends",
                "Investment Advice",
                "FAQ",
                "Support",
                "Contact",
              ])}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-6 px-4 sm:px-8 lg:px-16 flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center">
          
          {/* Left Links */}
          <div className="flex flex-wrap justify-start gap-4 text-gray-400 text-sm mb-4 md:mb-0">
            {renderList([
              "Privacy",
              "Terms",
              "Cookies",
              "Contact",
              "Enlight",
              "Press",
              "Careers",
              "Site Map",
              "About Us",
            ])}
          </div>

          {/* Copyright */}
          <div className="text-gray-400 text-sm text-left md:text-right">
            Copyrights © 2025, Enlight Group
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
