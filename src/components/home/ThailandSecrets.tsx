import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type SecretItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string; 
  month: string;
};

const secretItems: SecretItem[] = [
  { id: 1, title: "Ownership Explained", description: "Learn about property ownership rules in Thailand for foreigners and locals. Discover how to legally own condos, land, and other property types.", image: "/images/property19.jpeg", date: "06", month: "NOV" },
  { id: 2, title: "Area Guides", description: "Explore popular areas in Thailand for investment or living, including Bangkok, Phuket, Chiang Mai, and Pattaya. Know what suits your lifestyle.", image: "/images/property26.jpeg", date: "05", month: "NOV" },
  { id: 3, title: "Market Trends", description: "Stay up-to-date with the latest real estate trends, price movements, and demand hotspots across Thailand for smart investment decisions.", image: "/images/property22.jpeg", date: "02", month: "NOV" },
  { id: 4, title: "Frequently Asked Questions", description: "Get clear answers to common questions about property ownership, taxes, legal documentation, and more to make confident decisions.", image: "/images/property9.jpeg", date: "01", month: "NOV" },
  { id: 5, title: "Frequently Asked Questions", description: "Get clear answers to common questions about property ownership, taxes, legal documentation, and more to make confident decisions.", image: "/images/property16.jpeg", date: "01", month: "NOV" },
  { id: 6, title: "Frequently Asked Questions", description: "Get clear answers to common questions about property ownership, taxes, legal documentation, and more to make confident decisions.", image: "/images/property12.jpeg", date: "01", month: "NOV" }
];

const ThailandSecrets: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.clientWidth * 0.8;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="container px-4 lg:px-30 sm:px-6 py-8 mx-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Heading */}
      <div className="text-left mb-8">
        <h2 className="text-3xl sm:text-3xl font-bold text-gray-900">
          Find Secrets on Thailand Real Estate
        </h2>
        <p className="text-gray-600 mt-2">
          Discover clear answers to common questions about properties in Thailand, ownership, area guides, news and market trends in Thailand.
        </p>
      </div>

      {/* Scrollable Cards with buttons */}
      <div className="relative">
        {/* Left/Right buttons */}
        {hovered && (
          <>
                      <button
                        onClick={() => scroll("left")}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-1 flex items-center justify-center shadow-md transition text-2xl"
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        onClick={() => scroll("right")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-1 flex items-center justify-center shadow-md transition text-2xl"
                      >
                       <FaChevronRight/>
                      </button>
                    </>
        )}

        {/* Scrollable container */}
        <div
          ref={sliderRef}
          className="flex space-x-6 overflow-x-auto no-scrollbar pb-4"
        >
          {secretItems.map((item) => (
            <div
              key={item.id}
              className="flex-none w-72 md:w-80 bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative w-full h-48 md:h-56 lg:h-60">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-t-xl"
                  loading="lazy"
                />
                {/* Date box */}
                <div className="absolute top-2 left-2 bg-white bg-opacity-90 text-center rounded-md w-12 h-12 flex flex-col items-center justify-center shadow-sm">
                  <span className="text-lg font-bold leading-none">{item.date}</span>
                  <span className="text-[10px] uppercase tracking-wide text-gray-600">{item.month}</span>
                </div>
              </div>

              {/* Text content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm h-20 overflow-y-auto pr-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThailandSecrets;
