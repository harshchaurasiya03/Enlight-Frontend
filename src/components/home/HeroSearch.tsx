import { Search } from "lucide-react";
import { useState } from "react";

const HeroSearch = () => {
  const [activeTab, setActiveTab] = useState<"buy" | "rent" | "sell">("buy");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div
      className="relative bg-cover bg-center py-36 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/images/banner.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        <h1 className="text-2xl md:text-4xl font-bold mb-24">
          Find your favorite homes at Enlight Property
        </h1>

        {/* Tabs: Projects / Sale / Rent */}
        <div className="flex justify-center bg-black/30 backdrop-blur-md rounded-xl overflow-hidden w-fit mx-auto transition">
  {["Buy", "Rent", "Sell"].map((tab) => (
    <button
      key={tab}
      onClick={() =>
        setActiveTab(tab.toLowerCase() as "buy" | "rent" | "sell")
      }
      onMouseEnter={() => setHoveredTab(tab.toLowerCase())}
      onMouseLeave={() => setHoveredTab(null)}
      className={`px-6 py-3 font-medium rounded-xl capitalize transition-all duration-300 ${
        hoveredTab === tab.toLowerCase()
          ? "bg-white text-blue-600"
          : activeTab === tab.toLowerCase() && !hoveredTab
          ? "bg-white text-blue-600"
          : activeTab === tab.toLowerCase() && hoveredTab !== tab.toLowerCase()
          ? " text-white"
          : " text-white hover:bg-white hover:text-blue-600"
      }`}
    >
      {tab}
    </button>
  ))}
</div>


        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-lg flex max-w-2xl mx-auto mt-4 overflow-hidden">
          <input
            type="text"
            placeholder="Search by location, station, project or unit ID"
            className="flex-1 px-4 py-3 text-gray-800 focus:outline-none"
          />
          <button className="bg-blue-600 hover:bg-blue-700 px-6 flex items-center justify-center text-white">
            <Search size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;
