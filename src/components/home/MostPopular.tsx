import React, {useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type PopularCard = {
  title: string;
  images: string[];
};

const MostPopular: React.FC = () => {
  const popularCards: PopularCard[] = [
    { title: "Access to BTS, MRT", images: ["/images/property10.jpeg","/images/property11.jpeg","/images/property12.jpeg","/images/property13.jpeg"] },
    { title: "Luxury Villa in Phuket", images: ["/images/property14.jpeg","/images/property15.jpeg","/images/property13.jpeg","/images/property18.jpeg"] },
    { title: "For Investment Property in Hua Hin", images: ["/images/property18.jpeg","/images/property19.jpeg","/images/property20.jpeg","/images/property21.jpeg"] },
    { title: "Close to the beach in Pattaya", images: ["/images/property22.jpeg","/images/property23.jpeg","/images/property24.jpeg","/images/property25.jpeg"] },
    { title: "Close to the beach in Thailand", images: ["/images/property26.jpeg","/images/property27.jpeg","/images/property28.jpeg","/images/property29.jpeg"] },
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
         className="container px-4 sm:px-6 py-8 mx-auto bg-gray-100"
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
          Most popular searches on Enlight
        </h2>
        <p className="text-gray-600 mt-2">
          Find out for what properties other buyers are searching for
        </p>
      </div>

      {/* Scrollable cards with buttons */}
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
          className="flex space-x-6 overflow-x-auto no-scrollbar pb-4  "
        >
          {popularCards.map((card, idx) => (
            <div
              key={idx}
              className="flex-none w-64 md:w-72 lg:w-80 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
            >
              {/* Card heading */}
              <h3 className="font-bold text-lg mb-3 min-h-12 line-clamp-2 text-center">
                {card.title}
              </h3>

              {/* 2x2 image grid inside card */}
              <div className="grid grid-cols-2 grid-rows-2 gap-2">
                {card.images.map((img, i) => (
                  <div
                    key={i}
                    className="w-full h-24 md:h-28 lg:h-32 rounded-md overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`${card.title} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MostPopular;
