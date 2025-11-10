import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type SubLocation = {
  id: number;
  name: string;
  image: string;
};

type City = {
  id: number;
  name: string;
  image: string;
  sublocations: SubLocation[];
};

const popularRegions: City[] = [
  {
    id: 1,
    name: "Bangkok",
    image: "/images/Bangna.jpeg",
    sublocations: [
      { id: 1, name: "Sukhumvit", image: "/images/property1.jpeg" },
      { id: 2, name: "Silom", image: "/images/property2.jpeg" },
      { id: 3, name: "Ratchada", image: "/images/property9.jpeg" },
      { id: 4, name: "Bang Na", image: "/images/property4.jpeg" },
    ],
  },
  {
    id: 2,
    name: "Phuket",
    image: "/images/Chong.webp",
    sublocations: [
      { id: 1, name: "Patong", image: "/images/property5.jpeg" },
      { id: 2, name: "Kata", image: "/images/property6.jpeg" },
      { id: 3, name: "Karon", image: "/images/property7.jpeg" },
      { id: 4, name: "Rawai", image: "/images/property8.jpeg" },
    ],
  },
  {
    id: 3,
    name: "Sathon",
    image: "/images/sathon.jpeg",
    sublocations: [
      { id: 1, name: "Patong", image: "/images/property5.jpeg" },
      { id: 2, name: "Kata", image: "/images/property6.jpeg" },
      { id: 3, name: "Karon", image: "/images/property7.jpeg" },
      { id: 4, name: "Rawai", image: "/images/property8.jpeg" },
    ],
  },
];

const LookingForProperties = () => {
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
    <section
      className="container px-4 lg:px-30 sm:px-6 py-6 mx-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="text-left">
        <h2 className="text-3xl sm:text-3xl font-bold text-gray-900">
          Looking for Property?
        </h2>
        <p className="text-gray-600 mt-2">
          Explore available properties in top locations
        </p>
      </div>

      <div className="relative">
        {/* Left/Right Buttons */}
        {hovered && (
          <>
                      <button
                        onClick={() => scroll("left")}
                        className="absolute left-5 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-1 flex items-center justify-center shadow-md transition text-2xl"
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

        {/* Scrollable Container */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-scroll scroll-smooth no-scrollbar"
        >
          {popularRegions.map((region) => (
            <div
              key={region.id}
              className="shrink-0 w-[700px] h-[400px] bg-white rounded-xl shadow-lg overflow-hidden flex"
            >
              {/* Left: Main City */}
              <div className="w-1/2 h-full p-3">
                <div className="relative w-full h-full rounded-lg overflow-hidden group">
                  <img
                    src={region.image}
                    alt={region.name}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-end group-hover:justify-center transition-all duration-300 px-2">
                    <h1 className="text-white text-2xl font-semibold group-hover:text-blue-400 transition-colors text-center">
                      {region.name}
                    </h1>
                    <p className="text-white text-lg mb-1 group-hover:text-blue-400 transition-colors">
                      Looking for property in
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Sublocations */}
              <div className="w-1/2 h-full p-3 bg-gray-60">
                <div className="grid grid-cols-2 grid-rows-2 gap-3 w-full h-full">
                  {region.sublocations.map((sub) => (
                    <div
                      key={sub.id}
                      className="relative w-full h-full rounded-lg overflow-hidden group shadow-sm"
                    >
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 flex flex-col justify-end items-start pb-2 pl-2">
                        <p className="text-white text-lg font-medium group-hover:text-blue-400 transition">
                          {sub.name}
                        </p>
                        <p className="text-white text-sm group-hover:text-blue-400 transition-colors">
                          367 properties for you
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LookingForProperties;
