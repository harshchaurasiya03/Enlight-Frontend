import React, { useEffect, useRef } from "react";

const videoSources = [
  "/videos/PropertyCarousel/v1.mp4",
  "/videos/PropertyCarousel/v3.mp4",
  "/videos/PropertyCarousel/v4.mp4",
  "/videos/PropertyCarousel/v5.mp4",
  "/videos/PropertyCarousel/v6.mp4",
  "/videos/PropertyCarousel/v4.mp4",
  "/videos/PropertyCarousel/v5.mp4",
];

const PropertyCarousel: React.FC = () => {
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.playbackRate = 4.0;
        video.play().catch((error) => {
          console.error("Video play failed:", error);
        });
      }
    });
  }, []);

  return (
    <div className="container px-4 lg:px-30 sm:px-6 py-8 mx-auto">
      {/* Heading Section */}
      <div className="text-left mb-10">
        <h2 className="text-3xl sm:text-3xl font-bold text-gray-900">
          Popular Videos
        </h2>
        <p className="text-gray-600 mt-2">
          Explore Popular video across different property markets in Thailand
        </p>
      </div>

      {/* Video Carousel Section */}
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-4">
        {/* Mobile: horizontal scroll, Desktop: grid */}
        <div className="flex flex-nowrap sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible scrollbar-hide -mx-2 px-2">
          {videoSources.map((src, index) => (
            <div
              key={index}
              className="sm:shrink-0 w-64 sm:w-auto rounded overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow duration-200 mr-2 sm:mr-0"
            >
              {/* Video height same, border radius applied */}
              <div className="relative w-full pb-[177%] overflow-hidden rounded-md">
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[index] = el;
                  }}
                  src={src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              {/* Property section height */}
              <div className="h-20 flex items-center justify-center text-center font-semibold text-xs sm:text-sm">
                Property - {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyCarousel;
