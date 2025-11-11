import React, { useState, useRef } from "react";
import { FaYoutube, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Link {
  _id: string;
  url: string;
}

const links: Link[] = [
  { _id: "1", url: "https://www.youtube.com/embed/hS_149t5okc" },
  { _id: "2", url: "https://www.youtube.com/embed/7rTRNqiRmUU" },
  { _id: "3", url: "https://www.youtube.com/embed/53n1IZRzQm4" },
  { _id: "4", url: "https://www.youtube.com/embed/lEAvFyqAlkw" },
  { _id: "5", url: "https://www.youtube.com/embed/lEAvFyqAlkw" },
  { _id: "6", url: "https://www.youtube.com/embed/7rTRNqiRmUU" },
];

const getYoutubeThumbnail = (embedUrl: string): string => {
  const videoId = embedUrl.split("/embed/")[1];
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

const TrendingYoutube: React.FC = () => {
  const [activeVideos, setActiveVideos] = useState<Record<string, boolean>>({});
  const [hovered, setHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handlePlay = (id: string) => {
    setActiveVideos((prev) => ({ ...prev, [id]: true }));
  };

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.clientWidth * 0.8;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (links.length === 0) return null;

  return (
    <div
      className="container px-4 lg:px-30 sm:px-6 py-8 mx-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Heading */}
      <div className="text-left mb-8">
        <h2 className="text-3xl sm:text-3xl font-bold text-gray-900">
          Enlight Real Estate Video Channel
        </h2>
        <p className="text-gray-600 mt-2">
          Watch featured video reviews of top Real Estate Projects!
        </p>
      </div>

      {/* Scrollable Video Section with buttons */}
      <div className="relative">
        {/* Left/Right buttons */}
        {hovered && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-1 flex items-center justify-center shadow-md transition text-2xl"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-1 flex items-center justify-center shadow-md transition text-2xl"
            >
              <FaChevronRight />
            </button>
          </>
        )}

        {/* Scrollable content */}
        <div
          ref={sliderRef}
          className="flex space-x-6 overflow-x-scroll scroll-smooth no-scrollbar pb-4"
        >
          {links.map((video, index) => {
            const thumbnailUrl = getYoutubeThumbnail(video.url);
            return (
              <div
                key={video._id}
                className="flex-none w-64 md:w-72 lg:w-80 rounded-xl shadow-md overflow-hidden relative"
              >
                <div className="w-full h-48 md:h-56 lg:h-60 relative">
                  {!activeVideos[video._id] ? (
                    <>
                      <img
                        src={thumbnailUrl}
                        alt={`YouTube video ${index + 1}`}
                        className="w-full h-full object-cover rounded-t-xl"
                        loading="lazy"
                      />
                      <div
                        onClick={() => handlePlay(video._id)}
                        className="absolute inset-0 flex items-center justify-center rounded-t-xl transition duration-300 cursor-pointer"
                      >
                        <FaYoutube className="text-red-600 text-5xl" />
                      </div>
                    </>
                  ) : (
                    <iframe
                      className="w-full h-full rounded-t-xl"
                      loading="lazy"
                      src={`${video.url}?autoplay=1`}
                      title={`YouTube video ${index + 1}`}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrendingYoutube;
