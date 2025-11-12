import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

type NewHome = {
  id: number;
  image: string;
  projectName: string;
  priceRange: string;
  location: string;
};

export default function NewHomesCrud() {
  const [homes, setHomes] = useState<NewHome[]>([
    {
      id: 1,
      image: "/images/property21.jpeg",
      projectName: "Horizon Residences",
      priceRange: "From 60L - 80L",
      location:
        "48 Oriental Avenue, Khwaeng Bang Rak, Bang Rak, Bangkok",
    },
    {
      id: 2,
      image: "/images/property22.jpeg",
      projectName: "Riverfront Villas",
      priceRange: "From 75L - 95L",
      location:
        "Charoen Nakhon Road, Khlong Ton Sai, Bangkok",
    },
    {
      id: 3,
      image: "/images/property23.jpeg",
      projectName: "Skyline Apartments",
      priceRange: "From 50L - 70L",
      location:
        "Charoen Krung Road, Khwaeng Yan Nawa, Khet Sathon",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingHome, setEditingHome] = useState<NewHome | null>(null);
  const [formData, setFormData] = useState({
    image: "",
    projectName: "",
    priceRange: "",
    location: "",
  });

  const openModal = (home?: NewHome) => {
    if (home) {
      setEditingHome(home);
      setFormData({
        image: home.image,
        projectName: home.projectName,
        priceRange: home.priceRange,
        location: home.location,
      });
    } else {
      setEditingHome(null);
      setFormData({
        image: "",
        projectName: "",
        priceRange: "",
        location: "",
      });
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editingHome) {
      setHomes((prev) =>
        prev.map((h) =>
          h.id === editingHome.id ? { ...h, ...formData } : h
        )
      );
    } else {
      const newHome: NewHome = { id: Date.now(), ...formData };
      setHomes((prev) => [...prev, newHome]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setHomes((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            New Homes Projects
          </h2>
          <p className="text-gray-500">
            Manage New Homes section displayed on the homepage
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> Add New Home
        </button>
      </div>

      {/* Data Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {homes.map((home) => (
          <div
            key={home.id}
            className="border rounded-xl shadow-sm bg-gray-50 overflow-hidden hover:shadow-md transition"
          >
            <img
              src={home.image}
              alt={home.projectName}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">
                {home.projectName}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {home.priceRange}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {home.location}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => openModal(home)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(home.id)}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[600px] rounded-xl shadow-lg p-6 max-h-[85vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {editingHome ? "Edit Home Project" : "Add Home Project"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Project Name
                </label>
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) =>
                    setFormData({ ...formData, projectName: e.target.value })
                  }
                  placeholder="Enter project name"
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Price Range
                </label>
                <input
                  type="text"
                  value={formData.priceRange}
                  onChange={(e) =>
                    setFormData({ ...formData, priceRange: e.target.value })
                  }
                  placeholder="e.g. From 60L - 80L"
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Location
                </label>
                <textarea
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Enter address or location"
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                  rows={2}
                />
              </div>

              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="/images/property21.jpeg"
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
                {formData.image && (
                  <div className="mt-3">
                    <p className="text-gray-600 text-sm mb-1">Preview:</p>
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>
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
