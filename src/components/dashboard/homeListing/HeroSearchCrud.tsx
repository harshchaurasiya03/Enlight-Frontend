import { useState } from "react";
import { FaEdit, FaImage } from "react-icons/fa";

type HeroConfig = {
  id: number;
  title: string;
  backgroundImage: string;
};

export default function HeroSearchCrud() {
  const [hero, setHero] = useState<HeroConfig>({
    id: 1,
    title: "Find your favorite homes at Enlight Property",
    backgroundImage: "/images/banner.jpeg",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [newBg, setNewBg] = useState(hero.backgroundImage);

  const handleSave = () => {
    setHero((prev) => ({ ...prev, backgroundImage: newBg }));
    setModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Hero Search Section
          </h2>
          <p className="text-gray-500">
            Manage the background image for the Hero Search section
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaEdit /> Change Background
        </button>
      </div>

      {/* Hero Preview */}
      <div
        className="relative bg-cover bg-center h-[300px] rounded-xl overflow-hidden shadow-lg flex flex-col items-center justify-center text-white text-center"
        style={{ backgroundImage: `url('${hero.backgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative text-2xl sm:text-3xl font-bold mb-2 z-10">
          {hero.title}
        </h1>
        <button className="relative bg-white text-blue-600 px-4 py-2 rounded-md font-medium z-10 hover:bg-gray-100">
          <FaImage className="inline mr-2" />
          Change Background
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[500px] rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Change Background Image</h2>

            <div className="space-y-4">
              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Image URL
                </label>
                <input
                  type="text"
                  value={newBg}
                  onChange={(e) => setNewBg(e.target.value)}
                  placeholder="Enter new background image URL"
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring focus:ring-blue-100"
                />
              </div>

              {newBg && (
                <div className="mt-3">
                  <p className="text-gray-600 text-sm mb-2">Preview:</p>
                  <div
                    className="h-40 w-full bg-cover bg-center rounded-lg shadow-md"
                    style={{ backgroundImage: `url('${newBg}')` }}
                  />
                </div>
              )}
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
