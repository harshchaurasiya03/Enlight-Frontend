import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type NewsItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string; // e.g. "06"
  month: string; // e.g. "Nov"
};

const newsItems: NewsItem[] = [
  { id: 1, title: "Thailand Real Estate Market Shows Signs of Recovery", description: "After several months of slow growth, Thailand's real estate market is showing positive signs with an increase in both domestic and foreign investments. Developers are optimistic about 2025 trends...", image: "/images/property23.jpeg", date: "06", month: "NOV" },
  { id: 2, title: "Bangkok Condo Prices Set to Rise in 2025", description: "Analysts predict a 5% increase in Bangkok’s condo prices as new infrastructure projects near completion. Buyers are advised to act quickly before prices rise further...", image: "/images/property21.jpeg", date: "05", month: "NOV" },
  { id: 3, title: "Phuket Luxury Villas Gaining Global Attention", description: "Phuket continues to attract global investors with its luxury beachfront villas and improved facilities, making it a top destination for property investment in Southeast Asia...", image: "/images/property12.jpeg", date: "02", month: "NOV" },
  { id: 4, title: "Chiang Mai Emerges as Digital Nomad Hotspot", description: "Chiang Mai is becoming the next go-to location for digital nomads, offering affordable housing, great weather, and an excellent quality of life...", image: "/images/property14.jpeg", date: "01", month: "NOV" },
  { id: 5, title: "Pattaya Real Estate Market Expands Rapidly", description: "Pattaya’s property sector continues to grow, driven by tourism and infrastructure upgrades, making it a solid investment destination...", image: "/images/property18.jpeg", date: "30", month: "OCT" },
  { id: 6, title: "Pattaya Real Estate Market Expands Rapidly", description: "Pattaya’s property sector continues to grow, driven by tourism and infrastructure upgrades, making it a solid investment destination...", image: "/images/property9.jpeg", date: "30", month: "OCT" },
];

const NewsProperty: React.FC = () => {
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
      className="container px-4 sm:px-6 py-8 mx-auto bg-gray-100"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Heading */}
      <div className="text-left mb-8">
        <h2 className="text-3xl sm:text-3xl font-bold text-gray-900">
          Thailand Property News
        </h2>
        <p className="text-gray-600 mt-2">
          Stay up-to-date with the latest real estate news in Thailand
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
          {newsItems.map((news) => (
            <div
              key={news.id}
              className="flex-none w-72 md:w-80 bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative w-full h-48 md:h-56 lg:h-60">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover rounded-t-xl"
                  loading="lazy"
                />
                {/* Date box inside image */}
                <div className="absolute top-2 left-2 bg-white bg-opacity-90 text-center rounded-md w-12 h-12 flex flex-col items-center justify-center shadow-sm">
                  <span className="text-lg font-bold leading-none">{news.date}</span>
                  <span className="text-[10px] uppercase tracking-wide text-gray-600">{news.month}</span>
                </div>
              </div>

              {/* Content section */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-lg mb-2">{news.title}</h3>
                <p className="text-gray-600 text-sm h-20 overflow-y-auto pr-1">{news.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsProperty;
