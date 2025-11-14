import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Navbarx from "../../components/Navbarx";
import Footer from "../../components/Footer";

type Property = {
  image: string;
  originalPrice: string;
  price: string;
  type: string;
  society: string;
  location: string;
};

const CityProperty: React.FC = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();

  const [hovered, setHovered] = useState(false);
  const [] = useState(false);
  const sliderRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Sample sections with properties
  const sections: { title: string; properties: Property[] }[] = [
    {
      title: "Top Properties Near You",
      properties: [
        {
          image: "/images/Bangna.jpeg",
          originalPrice: "86L",
          price: "82L",
          type: "2BHK, 3BHK, Studio, Condo, Villa",
          society: "Skyline Society",
          location: "48 Oriental Avenue, Khwaeng Bang Rak, Bangkok, Thailand",
        },
        {
          image: "/images/banner.jpeg",
          originalPrice: "90L",
          price: "75L",
          type: "1BHK, 2BHK, Studio, Villa, Penthouse",
          society: "Riverfront Society",
          location: "88 Moo 4, T. Rawai, Mueang Phuket, Phuket, Thailand",
        },
        {
          image: "/images/chiangmai.jpeg",
          originalPrice: "72L",
          price: "60L",
          type: "2BHK, 3BHK, Studio, Condo, Penthouse",
          society: "Golden Palm Society",
          location:
            "221/7 Beach Road, Tambon Nong Prue, Amphoe Bang Lamung, Chonburi, Thailand",
        },
        {
          image: "/images/property12.jpeg",
          originalPrice: "1.1Cr",
          price: "95L",
          type: "3BHK, Studio, Condo, Villa, Penthouse",
          society: "Luxury Gardens",
          location: "150 Moo 2, Tambon Pai, Amphoe Pai, Mae Hong Son, Thailand",
        },
        {
          image: "/images/property13.jpeg",
          originalPrice: "1.1Cr",
          price: "95L",
          type: "1BHK, 2BHK, Studio, Condo, Villa",
          society: "Luxury Gardens",
          location:
            "Viewpoint Road, Tambon Karon, Amphoe Mueang Phuket, Thailand",
        },
        {
          image: "/images/property15.jpeg",
          originalPrice: "1.1Cr",
          price: "95L",
          type: "2BHK, 3BHK, Studio, Villa, Penthouse",
          society: "Luxury Gardens",
          location:
            "Nimmanhaemin Soi 9, Tambon Suthep, Amphoe Mueang Chiang Mai, Chiang Mai, Thailand",
        },
      ],
    },
    {
      title: "Most Sell Properties",
      properties: [
        {
          image: "/images/Bangna.jpeg",
          originalPrice: "86L",
          price: "82L",
          type: "2BHK, 3BHK, Studio, Condo, Villa",
          society: "Skyline Society",
          location: "48 Oriental Avenue, Khwaeng Bang Rak, Bangkok, Thailand",
        },
        {
          image: "/images/banner.jpeg",
          originalPrice: "90L",
          price: "75L",
          type: "1BHK, 2BHK, Studio, Villa, Penthouse",
          society: "Riverfront Society",
          location: "88 Moo 4, T. Rawai, Mueang Phuket, Phuket, Thailand",
        },
        {
          image: "/images/chiangmai.jpeg",
          originalPrice: "72L",
          price: "60L",
          type: "2BHK, 3BHK, Studio, Condo, Penthouse",
          society: "Golden Palm Society",
          location:
            "221/7 Beach Road, Tambon Nong Prue, Amphoe Bang Lamung, Chonburi, Thailand",
        },
        {
          image: "/images/property12.jpeg",
          originalPrice: "1.1Cr",
          price: "95L",
          type: "3BHK, Studio, Condo, Villa, Penthouse",
          society: "Luxury Gardens",
          location: "150 Moo 2, Tambon Pai, Amphoe Pai, Mae Hong Son, Thailand",
        },
        {
          image: "/images/property13.jpeg",
          originalPrice: "1.1Cr",
          price: "95L",
          type: "1BHK, 2BHK, Studio, Condo, Villa",
          society: "Luxury Gardens",
          location:
            "Viewpoint Road, Tambon Karon, Amphoe Mueang Phuket, Thailand",
        },
        {
          image: "/images/property15.jpeg",
          originalPrice: "1.1Cr",
          price: "95L",
          type: "2BHK, 3BHK, Studio, Villa, Penthouse",
          society: "Luxury Gardens",
          location:
            "Nimmanhaemin Soi 9, Tambon Suthep, Amphoe Mueang Chiang Mai, Chiang Mai, Thailand",
        },
      ],
    },
    {
      title: "Budget Friendly",
      properties: [
        {
          image: "/images/Bangna.jpeg",
          originalPrice: "86L",
          price: "82L",
          type: "2BHK, 3BHK, Studio, Condo, Villa",
          society: "Skyline Society",
          location: "48 Oriental Avenue, Khwaeng Bang Rak, Bangkok, Thailand",
        },
        {
          image: "/images/banner.jpeg",
          originalPrice: "90L",
          price: "75L",
          type: "1BHK, 2BHK, Studio, Villa, Penthouse",
          society: "Riverfront Society",
          location: "88 Moo 4, T. Rawai, Mueang Phuket, Phuket, Thailand",
        },
        {
          image: "/images/chiangmai.jpeg",
          originalPrice: "72L",
          price: "60L",
          type: "2BHK, 3BHK, Studio, Condo, Penthouse",
          society: "Golden Palm Society",
          location:
            "221/7 Beach Road, Tambon Nong Prue, Amphoe Bang Lamung, Chonburi, Thailand",
        },
        {
          image: "/images/property12.jpeg",
          originalPrice: "1.1Cr",
          price: "95L",
          type: "3BHK, Studio, Condo, Villa, Penthouse",
          society: "Luxury Gardens",
          location: "150 Moo 2, Tambon Pai, Amphoe Pai, Mae Hong Son, Thailand",
        },
        {
          image: "/images/property13.jpeg",
          originalPrice: "1.1Cr",
          price: "95L",
          type: "1BHK, 2BHK, Studio, Condo, Villa",
          society: "Luxury Gardens",
          location:
            "Viewpoint Road, Tambon Karon, Amphoe Mueang Phuket, Thailand",
        },
        {
          image: "/images/property15.jpeg",
          originalPrice: "1.1Cr",
          price: "95L",
          type: "2BHK, 3BHK, Studio, Villa, Penthouse",
          society: "Luxury Gardens",
          location:
            "Nimmanhaemin Soi 9, Tambon Suthep, Amphoe Mueang Chiang Mai, Chiang Mai, Thailand",
        },
      ],
    },
  ];

  // Scroll function
  const scroll = (idx: number, direction: "left" | "right") => {
    const slider = sliderRefs.current[idx];
    if (!slider) return;
    const scrollAmount = slider.clientWidth * 0.8;
    slider.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbarx />
      <div className="w-full mt-10">
        {/* Hero Section */}
        <div className="relative w-full h-[60vh] lg:h-[70vh]">
          <img
            src="/images/Chong.webp"
            alt={cityName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="mx-auto w-full max-w-[75%] text-center">
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold">
                All Properties In {cityName}
              </h2>
              <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
                Find and buy your dream house in Thailand or abroad. Explore top
                properties with exclusive listings that fit your lifestyle and
                budget.
              </p>
            </div>
          </div>
        </div>

        {/* Sections */}
        {sections.map((section, idx) => (
          <div key={idx} className="px-6 sm:px-6 py-6">
            {/* Section Heading */}
            <h2 className="text-3xl font-bold mb-8">{section.title}</h2>

            {/* Scrollable Cards */}
            <div
              className="relative"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {/* Buttons */}
              {hovered && (
                <>
                  <button
                    onClick={() => scroll(idx, "left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition text-xl"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={() => scroll(idx, "right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition text-xl"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}

              <div
                ref={(el) => (sliderRefs.current[idx] = el)}
                className="flex gap-4 overflow-x-auto no-scrollbar pb-4"
              >
                {section.properties.map((property, pidx) => (
                  <div
                    key={pidx}
                    className="flex-none w-64 md:w-72 lg:w-80 cursor-pointer"
                    onClick={() =>
                      navigate(`/propertydeatilspage`, {
                        state: {
                          projectName: property.society,
                          societyName: property.society,
                          location: property.location,
                          image: property.image,
                        },
                      })
                    }
                  >
                    <div className="rounded-xl overflow-hidden h-40 md:h-48 lg:h-56 mb-2">
                      <img
                        src={property.image}
                        alt={property.society}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold mb-1">
                        <span className="line-through text-gray-400 mr-2">
                          ₹{property.originalPrice}
                        </span>
                        <span className="text-red-600">₹{property.price}</span>
                      </p>
                      <p className="text-gray-600 mb-1">{property.type}</p>
                      <p className="text-gray-700 font-bold mb-1">
                        {property.society}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {property.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default CityProperty;
