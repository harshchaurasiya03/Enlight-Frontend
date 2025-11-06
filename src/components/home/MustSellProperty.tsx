import React from "react";

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
    {
      image: "/images/Bangna.jpeg",
      originalPrice: "86L",
      price: "82L",
      type: "2BHK",
      society: "Skyline Society",
      location: "Bangkok",
    },
    {
      image: "/images/banner.jpeg",
      originalPrice: "90L",
      price: "75L",
      type: "Studio",
      society: "Riverfront Society",
      location: "Chiang Mai",
    },
    {
      image: "/images/chiangmai.jpeg",
      originalPrice: "72L",
      price: "60L",
      type: "1RK",
      society: "Golden Palm Society",
      location: "Phuket",
    },
    {
      image: "/images/Chong.webp",
      originalPrice: "1.1Cr",
      price: "95L",
      type: "Condo",
      society: "Luxury Gardens",
      location: "Pattaya",
    },
    {
      image: "/images/Ratchadapisek.jpeg",
      originalPrice: "85L",
      price: "70L",
      type: "2BHK",
      society: "Horizon Residences",
      location: "Bangkok",
    },
    {
      image: "/images/sathon.jpeg",
      originalPrice: "92L",
      price: "78L",
      type: "Studio",
      society: "Riverfront Towers",
      location: "Chiang Mai",
    },
    {
      image: "/images/property4.jpeg",
      originalPrice: "80L",
      price: "65L",
      type: "1RK",
      society: "Skyline Society",
      location: "Phuket",
    },
    {
      image: "/images/property5.jpeg",
      originalPrice: "1Cr",
      price: "85L",
      type: "Condo",
      society: "Golden Palm Society",
      location: "Pattaya",
    },
  ];

  return (
    <div className="container px-4 lg:px-30 sm:px-6 py-15 mx-auto">
      {/* Heading */}
      <div className="text-left mb-8">
         <h2 className="text-3xl sm:text-3xl font-bold text-gray-900">
          Motivated Sellers and Must-Sell Property
        </h2>
        <p className="text-gray-600 mt-2">
          Like What You See? Contact us to Make an Offer!
        </p>
      </div>

      {/* Horizontal scroll carousel */}
      <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-4">
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
              {/* Price */}
              <p className="font-semibold mb-1">
                <span className="line-through text-gray-400 mr-2">
                  ₹{property.originalPrice}
                </span>
                <span className="text-red-600">₹{property.price}</span>
              </p>

              {/* Type */}
              <p className="text-gray-600 mb-1">{property.type}</p>

              {/* Society */}
              <p className="text-gray-700 font-bold mb-1">{property.society}</p>

              {/* Location */}
              <p className="text-gray-500 text-sm">{property.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MustSellProperty;
