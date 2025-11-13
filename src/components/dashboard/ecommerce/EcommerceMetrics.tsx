import React from "react";
import { Briefcase } from "lucide-react";

export default function PropertyStats() {
  const cards = [
    {
      title: "Active properties",
      value: 61,
      bg: "bg-purple-500",
      iconColor: "text-purple-300",
    },
    {
      title: "Pending properties",
      value: 5,
      bg: "bg-teal-400",
      iconColor: "text-teal-300",
    },
    {
      title: "Expired properties",
      value: 3,
      bg: "bg-red-400",
      iconColor: "text-red-300",
    },
    {
      title: "Agents",
      value: 12,
      bg: "bg-blue-500",
      iconColor: "text-blue-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`${card.bg} text-white p-6 rounded-xl relative overflow-hidden`}
        >
          <h3 className="text-lg font-semibold opacity-90">{card.title}</h3>
          <p className="text-5xl font-bold mt-4">{card.value}</p>

          {/* Icon in background */}
          <Briefcase
            className={`absolute right-4 bottom-4 size-20 opacity-20 ${card.iconColor}`}
          />
        </div>
      ))}
    </div>
  );
}
