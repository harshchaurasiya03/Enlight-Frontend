import React, { useRef, useEffect } from "react";
import { FaHome, FaHandshake, FaUser } from "react-icons/fa"; // Import icons

const SplitCard: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      videoRef.current.play().catch((err) => console.error("Video play failed:", err));
    }
  }, []);

  return (
    <div className="container mx-auto  px-6 lg:px-30 py-10 pt-5">
    <div className="flex-1 ">
      <div className="flex flex-col md:flex-row w-full h-full bg-white rounded-xl overflow-hidden shadow-lg">
        {/* Left: Video */}
        <div className="md:w-1/2 w-full h-96 md:h-auto relative">
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
        <div className="md:w-1/2 w-full bg-blue-500 text-white p-6 flex items-center justify-center">
          <div className="space-y-6">

            {/* Main heading */}
            <h1 className="font-semibold text-3xl md:text-4xl">Why buy with Enlight</h1>

            {/* Section 1 */}
            <div className="flex items-start space-x-4">
              <FaHome className="text-3xl mt-1" /> {/* Home icon */}
              <div>
                <h4 className="font-semibold text-xl">A simpler experience to search, visit & buy</h4>
                <p>Tour homes on your schedule and control your offer online.</p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="flex items-start space-x-4">
              <FaHandshake className="text-5xl mt-1" /> {/* Handshake icon */}
              <div>
                <h4 className="font-semibold text-xl">Buy a home in a few taps. We’ll guide you through it.</h4>
                <p>
                  Book tours on your schedule. When you find the perfect home,
                  start your offer online, and a dedicated buying agent will help
                  you every step of the way.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="flex items-start space-x-4">
              <FaUser className="text-3xl mt-1" /> {/* Client icon */}
              <div>
                <h4 className="font-semibold text-xl">We've done the walkthrough, so you don't have to.</h4>
                <p>
                  Narrow down your search from the comfort of your own home with
                  our video tours of hundreds of projects and their units.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
     </div>
  );
};

export default SplitCard;
