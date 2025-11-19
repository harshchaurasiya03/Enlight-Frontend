import React, { useEffect } from "react";
import { Briefcase } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/redux";
import { fetchProperties } from "../../../redux/actions/propertiesAction";

export default function PropertyStats() {
  const dispatch = useAppDispatch();
  const { properties, total, loading } = useAppSelector((s) => s.properties);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const active = total;
  const forSale = properties.filter((p) => p.status === "For Sale").length;
  const forRent = properties.filter((p) => p.status === "For Rent").length;
  const sold = properties.filter((p) => p.status === "Sold").length;

  const agents = new Set(
    properties
      .map((p) => p.owner?._id)
      .filter((id): id is string => Boolean(id))
  ).size;

  const cards = [
    {
      title: "Active properties",
      value: active,
      bg: "bg-purple-500",
      iconColor: "text-purple-300",
    },
    {
      title: "Properties for Sale",
      value: forSale,
      bg: "bg-teal-400",
      iconColor: "text-teal-300",
    },
    {
      title: "Properties for Rent",
      value: forRent,
      bg: "bg-red-400",
      iconColor: "text-red-300",
    },
    {
      title: "Agents",
      value: agents,
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
          <p className="text-5xl font-bold mt-4">
            {loading ? "..." : card.value}
          </p>

          <Briefcase
            className={`absolute right-4 bottom-4 size-20 opacity-20 ${card.iconColor}`}
          />
        </div>
      ))}
    </div>
  );
}
