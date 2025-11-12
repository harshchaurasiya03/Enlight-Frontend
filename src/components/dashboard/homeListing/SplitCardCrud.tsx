import { useState, useRef, useEffect } from "react";
import { FaEdit, FaVideo } from "react-icons/fa";

type Section = {
  heading: string;
  description: string;
};

type SplitCardData = {
  id: number;
  video: string;
  mainHeading: string;
  sections: Section[];
};

export default function SplitCardCrud() {
  const [data, setData] = useState<SplitCardData>({
    id: 1,
    video: "/videos/PropertyCarousel/v5.mp4",
    mainHeading: "Why buy with Enlight",
    sections: [
      {
        heading: "A simpler experience to search, visit & buy",
        description:
          "Tour homes on your schedule and control your offer online.",
      },
      {
        heading: "Buy a home in a few taps. We’ll guide you through it.",
        description:
          "Book tours on your schedule. When you find the perfect home, start your offer online, and a dedicated buying agent will help you every step of the way.",
      },
      {
        heading: "We've done the walkthrough, so you don't have to.",
        description:
          "Narrow down your search from the comfort of your own home with our video tours of hundreds of projects and their units.",
      },
    ],
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(data);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      videoRef.current.play().catch(() => {});
    }
  }, [data.video]);

  const openModal = () => {
    setFormData(data);
    setModalOpen(true);
  };

  const handleSave = () => {
    setData(formData);
    setModalOpen(false);
  };

  const handleSectionChange = (
    index: number,
    field: keyof Section,
    value: string
  ) => {
    const updatedSections = [...formData.sections];
    updatedSections[index][field] = value;
    setFormData({ ...formData, sections: updatedSections });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            SplitCard Section
          </h2>
          <p className="text-gray-500">
            Manage video and content for "Why buy with Enlight" section
          </p>
        </div>
        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaEdit /> Edit Content
        </button>
      </div>

      {/* Preview */}
      <div className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-md border border-gray-200">
        {/* Left Video */}
        <div className="md:w-1/2 w-full h-64 md:h-auto relative">
          <video
            ref={videoRef}
            src={data.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="md:w-1/2 w-full bg-blue-500 text-white p-6 flex items-center justify-center">
          <div className="space-y-5">
            <h1 className="font-semibold text-3xl">{data.mainHeading}</h1>

            {data.sections.map((section, i) => (
              <div key={i}>
                <h4 className="font-semibold text-lg">{section.heading}</h4>
                <p className="text-sm opacity-90">{section.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[650px] max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Edit SplitCard Section
            </h2>

            <div className="space-y-5">
              {/* Video URL */}
              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Video URL
                </label>
                <input
                  type="text"
                  value={formData.video}
                  onChange={(e) =>
                    setFormData({ ...formData, video: e.target.value })
                  }
                  placeholder="/videos/PropertyCarousel/v5.mp4"
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring focus:ring-blue-100"
                />
                {formData.video && (
                  <video
                    src={formData.video}
                    controls
                    muted
                    className="w-full h-40 mt-3 rounded-lg border"
                  />
                )}
              </div>

              {/* Main Heading */}
              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Main Heading
                </label>
                <input
                  type="text"
                  value={formData.mainHeading}
                  onChange={(e) =>
                    setFormData({ ...formData, mainHeading: e.target.value })
                  }
                  placeholder="Why buy with Enlight"
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>

              {/* Section Inputs */}
              <h3 className="font-semibold text-gray-700 mt-4 text-lg">
                Sections
              </h3>

              {formData.sections.map((sec, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 bg-gray-50 space-y-2"
                >
                  <h4 className="font-medium text-gray-700">
                    Section {index + 1}
                  </h4>
                  <input
                    type="text"
                    value={sec.heading}
                    onChange={(e) =>
                      handleSectionChange(index, "heading", e.target.value)
                    }
                    placeholder="Section heading"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  <textarea
                    rows={3}
                    value={sec.description}
                    onChange={(e) =>
                      handleSectionChange(index, "description", e.target.value)
                    }
                    placeholder="Section description"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
