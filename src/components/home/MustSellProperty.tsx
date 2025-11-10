import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type MustSellProperty = {
  image: string;
  originalPrice: string; // e.g., "86L"
  price: string; // e.g., "82L"
  type: string;
  society: string;
  location: string;
};

const MustSellProperty: React.FC = () => {
  const properties: MustSellProperty[] = [
    { image: "/images/Bangna.jpeg", originalPrice: "86L", price: "82L", type: "2BHK", society: "Skyline Society", location: "48 Oriental Avenue, Khwaeng Bang Rak, Bang Rak, Bangkok" },
    { image: "/images/banner.jpeg", originalPrice: "90L", price: "75L", type: "Studio", society: "Riverfront Society", location: "88 Moo 4, T. Rawai, A. Mueang Phuket, Phuket 83130, Thailand" },
    { image: "/images/chiangmai.jpeg", originalPrice: "72L", price: "60L", type: "1RK", society: "Golden Palm Society", location: "221/7 Beach Road, Tambon Nong Prue, Amphoe Bang Lamung, Chonburi (Pattaya) 20150, Thailand" },
    { image: "/images/Chong.webp", originalPrice: "1.1Cr", price: "95L", type: "Condo", society: "Luxury Gardens", location: "150 Moo 2, Tambon Pai, Amphoe Pai, Mae Hong Son" },
    { image: "/images/Ratchadapisek.jpeg", originalPrice: "85L", price: "70L", type: "2BHK", society: "Horizon Residences", location: "Viewpoint Road, Tambon Karon, Amphoe Mueang Phuket" },
    { image: "/images/sathon.jpeg", originalPrice: "92L", price: "78L", type: "Studio", society: "Riverfront Towers", location: "Soi Ladprao 101, Khwaeng Khlong Chan, Khet Bueng Kum" },
    { image: "/images/property4.jpeg", originalPrice: "80L", price: "65L", type: "1RK", society: "Skyline Society", location: "Tambon Patong, Amphoe Kathu, Phuket" },
    { image: "/images/property5.jpeg", originalPrice: "1Cr", price: "85L", type: "Condo", society: "Golden Palm Society", location: "Nimmanhaemin Soi 9, Tambon Suthep, Amphoe Mueang Chiang Mai, Chiang Mai" },
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
  
    useEffect(() => {
      const slider = sliderRef.current;
      if (!slider) return;
  
      // Clone all child nodes for seamless loop
      const slides = Array.from(slider.children) as HTMLElement[];
      slides.forEach((slide) => {
        const clone = slide.cloneNode(true) as HTMLElement;
        slider.appendChild(clone);
      });
  
      const step = 1; // pixels per frame
      const intervalTime = 15; // ms per frame
  
      const scrollLoop = setInterval(() => {
        if (!slider) return;
        slider.scrollLeft += step;
        const firstSlideWidth = slides[0].clientWidth;
  
        // Reset instantly when we've scrolled past the first set of slides
        if (slider.scrollLeft >= firstSlideWidth * slides.length) {
          slider.scrollLeft = 0;
        }
      }, intervalTime);
  
      return () => clearInterval(scrollLoop);
    }, []);

  return (
    <div
      className="container px-4 lg:px-30 sm:px-6 py-8 mx-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Heading */}
      <div className="text-left mb-8">
        <h2 className="text-3xl sm:text-3xl font-bold text-gray-900">
          Motivated Sellers and Must-Sell Property
        </h2>
        <p className="text-gray-600 mt-2">
          Like What You See? Contact us to Make an Offer!
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

        {/* Scrollable cards */}
        <div ref={sliderRef} className="flex space-x-4 overflow-x-auto no-scrollbar pb-4">
          {properties.map((property, idx) => (
            <div key={idx} className="flex-none w-64 md:w-72 lg:w-80">
              {/* Image */}
              <div className="rounded-xl overflow-hidden h-40 md:h-48 lg:h-56 mb-2">
                <img
                  src={property.image}
                  alt={property.society}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Property Info */}
              <div className="text-left">
                <p className="font-semibold mb-1">
                  <span className="line-through text-gray-400 mr-2">₹{property.originalPrice}</span>
                  <span className="text-red-600">₹{property.price}</span>
                </p>
                <p className="text-gray-600 mb-1">{property.type}</p>
                <p className="text-gray-700 font-bold mb-1">{property.society}</p>
                <p className="text-gray-500 text-sm">{property.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MustSellProperty;
