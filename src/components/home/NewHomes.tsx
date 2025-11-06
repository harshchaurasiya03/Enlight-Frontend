import React from "react";

type NewHome = {
  image: string;
  projectName: string;
  priceRange: string;
  location: string;
};

const NewHomes: React.FC = () => {
  const homes: NewHome[] = [
    {
      image: "/images/property21.jpeg",
      projectName: "Horizon Residences",
      priceRange: "From 60L - 80L",
      location: "Bangkok",
    },
    {
      image: "/images/property22.jpeg",
      projectName: "Riverfront Villas",
      priceRange: "From 75L - 95L",
      location: "Chiang Mai",
    },
    {
      image: "/images/property23.jpeg",
      projectName: "Skyline Apartments",
      priceRange: "From 50L - 70L",
      location: "Phuket",
    },
    {
      image: "/images/property24.jpeg",
      projectName: "Luxury Gardens",
      priceRange: "From 65L - 85L",
      location: "Pattaya",
    },
    {
      image: "/images/property25.jpeg",
      projectName: "Golden Palm Residences",
      priceRange: "From 70L - 90L",
      location: "Bangkok",
    },
  ];

  return (
    <div className="container px-4 lg:px-30 sm:px-6 py-15 mx-auto">
      {/* Heading */}
      <div className="text-left mb-8">
        <h2 className="text-3xl sm:text-3xl font-bold text-gray-900">New Homes Projects in Thailand</h2>
        <p className="text-gray-600 mt-2">
          Check out some of Thailand's best new real estate developments
        </p>
      </div>

      {/* Horizontal scroll carousel */}
      <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-4">
        {homes.map((home, idx) => (
          <div key={idx} className="flex-none w-64 md:w-72 lg:w-80">
            <div className="rounded-xl overflow-hidden h-40 md:h-48 lg:h-56 mb-2">
              <img
                src={home.image}
                alt={home.projectName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <h3 className="font-semibold">{home.projectName}</h3>
              <p className="text-gray-600">{home.priceRange}</p>
              <p className="text-gray-500 text-sm">{home.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewHomes;
