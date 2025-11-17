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
  const pending = properties.filter((p) => p.status === "Pending").length;
  const expired = properties.filter((p) => p.status === "Expired").length;

  const agents = new Set(
    properties.filter((p) => p.owner).map((p) => p.owner._id)
  ).size;

  const cards = [
    {
      title: "Active properties",
      value: active,
      bg: "bg-purple-500",
      iconColor: "text-purple-300",
    },
    {
      title: "Pending properties",
      value: pending,
      bg: "bg-teal-400",
      iconColor: "text-teal-300",
    },
    {
      title: "Expired properties",
      value: expired,
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
