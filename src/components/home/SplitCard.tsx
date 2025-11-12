import React, { useRef, useEffect } from "react";
import { FaHome, FaHandshake, FaUser } from "react-icons/fa";

const SplitCard: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      videoRef.current.play().catch((err) => console.error("Video play failed:", err));
    }
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6  py-10 bg-gray-100">
      <div className="flex flex-col md:flex-row w-full h-full bg-white rounded-xl overflow-hidden shadow-lg">
        {/* Left: Video */}
        <div className="md:w-1/2 w-full h-64 md:h-auto relative">
          <video
            ref={videoRef}
            src="/videos/PropertyCarousel/v5.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Content */}
        <div className="md:w-1/2 w-full bg-blue-500 text-white p-4 sm:p-6 flex items-center justify-center">
          <div className="space-y-4 sm:space-y-6">

            {/* Main heading */}
            <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl">
              Why buy with Enlight
            </h1>

            {/* Section 1 */}
            <div className="flex items-start space-x-3 sm:space-x-4">
              <FaHome className="text-1xl sm:text-2xl mt-1" />
              <div>
                <h4 className="font-semibold text-lg sm:text-xl">A simpler experience to search, visit & buy</h4>
                <p className="text-sm sm:text-base">
                  Tour homes on your schedule and control your offer online.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="flex items-start space-x-3 sm:space-x-4">
              <FaHandshake className="text-3xl sm:text-4xl mt-1" />
              <div>
                <h4 className="font-semibold text-lg sm:text-xl">
                  Buy a home in a few taps. We’ll guide you through it.
                </h4>
                <p className="text-sm sm:text-base">
                  Book tours on your schedule. When you find the perfect home,
                  start your offer online, and a dedicated buying agent will help
                  you every step of the way.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="flex items-start space-x-3 sm:space-x-4">
              <FaUser className="text-2xl sm:text-3xl mt-1" />
              <div>
                <h4 className="font-semibold text-lg sm:text-xl">
                  We've done the walkthrough, so you don't have to.
                </h4>
                <p className="text-sm sm:text-base">
                  Narrow down your search from the comfort of your own home with
                  our video tours of hundreds of projects and their units.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitCard;
