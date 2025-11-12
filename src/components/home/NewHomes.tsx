import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type NewHome = {
  image: string;
  projectName: string;
  priceRange: string;
  location: string;
};

const NewHomes: React.FC = () => {
  const homes: NewHome[] = [
    { image: "/images/property21.jpeg", projectName: "Horizon Residences", priceRange: "From 60L - 80L", location: "48 Oriental Avenue, Khwaeng Bang Rak, Bang Rak, Bangkok" },
    { image: "/images/property22.jpeg", projectName: "Riverfront Villas", priceRange: "From 75L - 95L", location: "Charoen Nakhon Road, Khlong Ton Sai, Khlong San, Bangkok" },
    { image: "/images/property23.jpeg", projectName: "Skyline Apartments", priceRange: "From 50L - 70L", location: "Charoen Krung Road, Khwaeng Yan Nawa, Khet Sathon" },
    { image: "/images/property24.jpeg", projectName: "Luxury Gardens", priceRange: "From 65L - 85L", location: "Rama I Road, Pathum Wan, Pathum Wan District" },
    { image: "/images/property25.jpeg", projectName: "Golden Palm Residences", priceRange: "From 70L - 90L", location: "Sukhumvit Road, Soi 2, Khlong Toei Nuea, Watthana" },
    { image: "/images/property22.jpeg", projectName: "Golden Palm Residences", priceRange: "From 1Cr - 1.2Cr", location: "Soi Wat Suan Plu, Charoen Krung Road, Bang Rak" },
  ];

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
    const [isPaused, setIsPaused] = useState(false);

 useEffect(() => {
  const slider = sliderRef.current;
  if (!slider) return;

  const slides = Array.from(slider.children) as HTMLElement[];
  slides.forEach((slide) => {
    const clone = slide.cloneNode(true) as HTMLElement;
    slider.appendChild(clone);
  });

  const step = 1; // pixels per frame
  const intervalTime = 15; // ms

  const scrollLoop = setInterval(() => {
    if (!slider || isPaused) return; // ✅ skip if paused
    slider.scrollLeft += step;

    const firstSlideWidth = slides[0].clientWidth;
    if (slider.scrollLeft >= firstSlideWidth * slides.length) {
      slider.scrollLeft = 0;
    }
  }, intervalTime);

  return () => clearInterval(scrollLoop);
}, [isPaused]);

  return (
    <div
        className="container px-4 sm:px-6 py-8 mx-auto"
  onMouseEnter={() => {
    setHovered(true);
    setIsPaused(true); // stop auto-scroll
  }}
  onMouseLeave={() => {
    setHovered(false);
    setIsPaused(false); // resume auto-scroll
  }}
>
      {/* Heading */}
      <div className="text-left mb-8">
        <h2 className="text-3xl sm:text-3xl font-bold text-gray-900">
          New Homes Projects in Thailand
        </h2>
        <p className="text-gray-600 mt-2">
          Check out some of Thailand's best new real estate developments
        </p>
      </div>

      {/* Scrollable container with buttons */}
      <div className="relative">
        {/* Left/Right buttons */}
        {hovered && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/3 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-1 flex items-center justify-center shadow-md transition text-2xl"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/3 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-1 flex items-center justify-center shadow-md transition text-2xl"
            >
             <FaChevronRight/>
            </button>
          </>
        )}

        {/* Scrollable content */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-scroll scroll-smooth no-scrollbar pb-4"
        >
          {homes.map((home, idx) => (
            <div
              key={idx}
              className="flex-none w-64 md:w-72 lg:w-80 rounded-xl overflow-hidden group  cursor-pointer  transition-all duration-300"
            >
              <div className="relative w-full h-40 md:h-48 lg:h-56 overflow-hidden rounded-lg">
                <img
                  src={home.image}
                  alt={home.projectName}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              </div>
              <div className="text-left mt-2 px-1">
                <h3 className="font-semibold group-hover:text-black-500 transition-colors">{home.projectName}</h3>
                <p className="text-black-bold group-hover:text-black-400 transition-colors">{home.priceRange}</p>
                <p className="text-gray-500 text-sm group-hover:text-black-300 transition-colors">{home.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewHomes;
