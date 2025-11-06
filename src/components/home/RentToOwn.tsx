import React from "react";
import { FaHome, FaHandshake, FaUser, FaRegLightbulb } from "react-icons/fa";

type CardContent = {
  icon: JSX.Element;
  heading: string;
  paragraph: string;
  buttonText: string;
};

const RentToOwn: React.FC = () => {
  const cards: CardContent[] = [
    {
      icon: <FaHome className="text-5xl text-blue-500" />,
      heading: "How It Works",
      paragraph:
        "Rent-to-Own connects buyers who can afford monthly payments but can’t get a mortgage with sellers holding unsold properties.",
      buttonText: "Learn How It Works",
    },
    {
      icon: <FaHandshake className="text-5xl text-blue-500" />,
      heading: "For Buyers",
      paragraph:
        "Pay a deposit, move in immediately, and make monthly installments toward owning your home — no bank loan required.",
      buttonText: "View Buyer Guide",
    },
    {
      icon: <FaUser className="text-5xl text-blue-500" />,
      heading: "For Sellers",
      paragraph:
        "Sell at full value without waiting or discounting. Rent-to-Own brings qualified buyers who pay monthly until the purchase is complete.",
      buttonText: "View Seller Options",
    },
    {
      icon: <FaRegLightbulb className="text-5xl text-blue-500" />,
      heading: "For Developers",
      paragraph:
        "Turn unsold units into income-generating assets, maintain full sale prices, and free up capital for your next project.",
      buttonText: "View Developer Solutions",
    },
  ];

  return (
    <div className="container px-4 lg:px-30 sm:px-6 py-15 mx-auto ">
      {/* Main Heading */}
      <div className="text-left mb-12">
      <h2 className="text-3xl sm:text-3xl font-bold text-gray-900">
          Rent-to-Own: A New Way to Buy and Sell Property in Thailand
        </h2>
        <p className="text-gray-600 mt-2">
          Helping buyers become homeowners without a mortgage, and enabling
          sellers and developers to close deals faster at full value.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg flex flex-col items-center p-6 h-[300px] relative"
          >
            {/* Icon at top 40% */}
            <div className="flex-1 flex items-center justify-center">
              {card.icon}
            </div>

            {/* Bottom 60% content */}
            <div className="flex-1 flex flex-col justify-start items-center text-center mt-4">
              <h2 className="font-bold text-xl mb-2">{card.heading}</h2>
              <p className="text-gray-600 mb-4">{card.paragraph}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                {card.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentToOwn;
