// Bangkok.jsx
import React, { useState, useEffect } from "react";

const images = [
  "https://source.unsplash.com/1600x600/?bangkok,city",
  "https://source.unsplash.com/1600x600/?bangkok,temple",
  "https://source.unsplash.com/1600x600/?bangkok,night",
];

const Bangkok = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          Welcome to Bangkok
        </h1>
        <p className="mt-4 text-lg md:text-2xl drop-shadow-md">
          Explore the city of angels
        </p>
      </div>
    </section>
  );
};

export default Bangkok;
