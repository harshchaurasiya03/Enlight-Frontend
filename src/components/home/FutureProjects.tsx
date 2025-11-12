// FeaturedProjects.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

// Type definition for project
type Project = {
  image: string;
  projectName: string;
  societyName: string;
  location: string;
};

const FeaturedProjects: React.FC = () => {
  const navigate = useNavigate();

  const projects: Project[] = [
    {
      image: "/images/property8.jpeg",
      projectName: "The Horizon Residences",
      societyName: "Skyline Society",
      location: "Bangkok",
    },
    {
      image: "/images/property15.jpeg",
      projectName: "Riverfront Towers",
      societyName: "Waterside Society",
      location: "Chiang Mai",
    },
    {
      image: "/images/property24.jpeg",
      projectName: "Luxury Villas",
      societyName: "Golden Palm Society",
      location: "Phuket",
    },
  ];

  // Map locations to routes (type-safe)
  const locationToRoute: Record<string, string> = {
    Bangkok: "/propertydeatilspage",
    "Chiang Mai": "/propertydeatilspage",
    Phuket: "/propertydeatilspage",
  };

  return (
    <div className="container px-4  sm:px-6 py-8 mx-auto bg-gray-100">
      {/* Heading */}
      <div className="text-left mb-12">
        <h2 className="font-bold text-3xl md:text-4xl">Featured Projects</h2>
        <p className="text-gray-600 mt-2">
          We make the best choices with the hottest and most prestigious projects, please visit the details below to find out more.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {projects.map((project, idx) => (
          <div
            key={idx}
            onClick={() => {
              // Navigate safely; fallback to home page if not found
              const route = locationToRoute[project.location] || "/";
              navigate(route);
            }}
            className="cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden flex flex-col max-h-[406px] h-[406px] hover:scale-105 transition-transform duration-300"
          >
            {/* Image 70% */}
            <div className="h-[70%] w-full">
              <img
                src={project.image}
                alt={project.projectName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content 30% */}
            <div className="flex flex-col justify-center p-4 h-[30%]">
              <span className="text-gray-700 truncate">{project.projectName}</span>
              <h3 className="font-bold text-lg mt-1 truncate">{project.societyName}</h3>
              <div className="flex items-center text-gray-600 mt-1">
                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                <span className="truncate">{project.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProjects;
