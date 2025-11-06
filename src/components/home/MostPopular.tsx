import React from "react";

type PopularCard = {
  title: string;
  images: string[]; // 4 images per card
};

const MostPopular: React.FC = () => {
  const popularCards: PopularCard[] = [
    {
      title: "Access to BTS, MRT",
      images: [
        "/images/property10.jpeg",
        "/images/property11.jpeg",
        "/images/property12.jpeg",
        "/images/property13.jpeg",
      ],
    },
    {
      title: "Luxury Villa in Phuket",
      images: [
        "/images/property14.jpeg",
        "/images/property15.jpeg",
        "/images/property16.jpeg",
        "/images/property17.jpeg",
      ],
    },
    {
      title: "For Investment Property in Hua Hin",
      images: [
        "/images/property18.jpeg",
        "/images/property19.jpeg",
        "/images/property20.jpeg",
        "/images/property21.jpeg",
      ],
    },
    {
      title: "Close to the beach in Pattaya",
      images: [
        "/images/property22.jpeg",
        "/images/property23.jpeg",
        "/images/property24.jpeg",
        "/images/property25.jpeg",
      ],
    },
    {
      title: "Close to the beach in Thailand",
      images: [
        "/images/property26.jpeg",
        "/images/property27.jpeg",
        "/images/property28.jpeg",
        "/images/property29.jpeg",
      ],
    },
  ];

  return (
    <div className="container px-4 lg:px-30 sm:px-6 py-15 mx-auto">
      {/* Heading */}
      <div className="text-left mb-8">
         <h2 className="text-3xl sm:text-3xl font-bold text-gray-900">
          Most popular searches on Enlight
        </h2>
        <p className="text-gray-600 mt-2">
          Find out for what properties other buyers are searching for
        </p>
      </div>

      {/* Scrollable cards */}
      <div className="flex space-x-6 overflow-x-auto no-scrollbar pb-4">
        {popularCards.map((card, idx) => (
          <div
            key={idx}
            className="flex-none w-64 md:w-72 lg:w-80 bg-white rounded-xl shadow-lg p-4"
          >
            {/* Card heading */}
            <h3 className="font-bold text-lg mb-3 min-h-[3rem] line-clamp-2 text-center">
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
  );
};

export default MostPopular;
