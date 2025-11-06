import React, { useState } from "react";
import { FaYoutube } from "react-icons/fa";

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

  const handlePlay = (id: string) => {
    setActiveVideos((prev) => ({ ...prev, [id]: true }));
  };

  if (links.length === 0) return null;

  return (
    <div className="container px-4 lg:px-30 sm:px-6 py-15 mx-auto">
      {/* Heading */}
      {/* Heading */}
      <div className="text-left mb-8">
        <h2 className="text-3xl sm:text-3xl font-bold text-gray-900">
          Enlight Real Estate Video Channel
        </h2>
        <p className="text-gray-600 mt-2">
          Watch featured video reviews of top Real Estate Projects!
        </p>
      </div>

      {/* Scrollable Video Section */}
      <div className="flex space-x-6 overflow-x-auto no-scrollbar pb-4">
        {links.map((video, index) => {
          const thumbnailUrl = getYoutubeThumbnail(video.url);

          return (
            <div
              key={video._id}
              className="flex-none w-64 md:w-72 lg:w-80  rounded-xl shadow-md overflow-hidden relative"
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
                      className="absolute inset-0 flex items-center justify-center  rounded-t-xl transition duration-300 cursor-pointer"
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
  );
};

export default TrendingYoutube;
