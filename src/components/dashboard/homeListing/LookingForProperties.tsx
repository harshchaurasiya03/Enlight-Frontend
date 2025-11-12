import { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaRegFileAlt } from "react-icons/fa";

type SubLocation = {
  id: number;
  name: string;
  image: string;
};

type City = {
  id: number;
  name: string;
  image: string;
  sublocations: SubLocation[];
};

export default function LookingForProperties() {
  const [cities, setCities] = useState<City[]>([
    {
      id: 1,
      name: "Bangkok",
      image: "/images/Bangna.jpeg",
      sublocations: [
        { id: 1, name: "Sukhumvit", image: "/images/property1.jpeg" },
        { id: 2, name: "Silom", image: "/images/property2.jpeg" },
        { id: 3, name: "Ratchada", image: "/images/property9.jpeg" },
        { id: 4, name: "Bang Na", image: "/images/property4.jpeg" },
      ],
    },
    {
      id: 2,
      name: "Phuket",
      image: "/images/Chong.webp",
      sublocations: [
        { id: 1, name: "Patong", image: "/images/property5.jpeg" },
        { id: 2, name: "Kata", image: "/images/property6.jpeg" },
        { id: 3, name: "Karon", image: "/images/property7.jpeg" },
        { id: 4, name: "Rawai", image: "/images/property8.jpeg" },
      ],
    },
    {
      id: 3,
      name: "Sathon",
      image: "/images/sathon.jpeg",
      sublocations: [
        { id: 1, name: "Patong", image: "/images/property5.jpeg" },
        { id: 2, name: "Kata", image: "/images/property6.jpeg" },
        { id: 3, name: "Karon", image: "/images/property7.jpeg" },
        { id: 4, name: "Rawai", image: "/images/property8.jpeg" },
      ],
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    sublocations: [] as SubLocation[],
  });

  const openModal = (city?: City) => {
    if (city) {
      setEditingCity(city);
      setFormData({
        name: city.name,
        image: city.image,
        sublocations: [...city.sublocations],
      });
    } else {
      setEditingCity(null);
      setFormData({ name: "", image: "", sublocations: [] });
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editingCity) {
      // Update existing
      setCities((prev) =>
        prev.map((c) =>
          c.id === editingCity.id
            ? { ...c, ...formData, sublocations: formData.sublocations }
            : c
        )
      );
    } else {
      // Add new
      const newCity: City = {
        id: Date.now(),
        name: formData.name,
        image: formData.image,
        sublocations: formData.sublocations,
      };
      setCities((prev) => [...prev, newCity]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setCities((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSubAdd = () => {
    const newSub: SubLocation = {
      id: Date.now(),
      name: "",
      image: "",
    };
    setFormData({
      ...formData,
      sublocations: [...formData.sublocations, newSub],
    });
  };

  const handleSubChange = (
    id: number,
    field: keyof SubLocation,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      sublocations: prev.sublocations.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    }));
  };

  const handleSubDelete = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      sublocations: prev.sublocations.filter((s) => s.id !== id),
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Looking for Property
          </h2>
          <p className="text-gray-500">
            Manage your property locations and sublocations
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> Add Location
        </button>
      </div>

      {/* Cities Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city) => (
          <div
            key={city.id}
            className="bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-200"
          >
            <img
              src={city.image}
              alt={city.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{city.name}</h3>
              <p className="text-sm text-gray-500 mb-3">
                {city.sublocations.length} sublocations
              </p>

              <div className="grid grid-cols-2 gap-2">
                {city.sublocations.map((sub) => (
                  <div
                    key={sub.id}
                    className="bg-white border rounded-lg overflow-hidden text-sm"
                  >
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="w-full h-20 object-cover"
                    />
                    <p className="p-1 text-center font-medium">{sub.name}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => openModal(city)}
                  className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(city.id)}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  <FaTrash /> Delete
                </button>
                <button className="text-gray-500 hover:text-gray-700 flex items-center gap-1">
                  <FaRegFileAlt /> Draft
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[600px] max-h-[80vh] overflow-y-auto rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingCity ? "Edit Location" : "Add Location"}
            </h2>

            {/* Location */}
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Location Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter location name"
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring focus:ring-blue-100"
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
                  placeholder="Paste image URL"
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Sublocations */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-700 text-lg">
                  Sublocations
                </h3>
                <button
                  onClick={handleSubAdd}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <FaPlus /> Add Sublocation
                </button>
              </div>

              {formData.sublocations.length === 0 && (
                <p className="text-gray-500 text-sm">
                  No sublocations added yet.
                </p>
              )}

              <div className="space-y-3 mt-3">
                {formData.sublocations.map((sub) => (
                  <div
                    key={sub.id}
                    className="border rounded-lg p-3 bg-gray-50 space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        placeholder="Sublocation name"
                        value={sub.name}
                        onChange={(e) =>
                          handleSubChange(sub.id, "name", e.target.value)
                        }
                        className="border rounded-lg px-3 py-2 w-[60%]"
                      />
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={sub.image}
                        onChange={(e) =>
                          handleSubChange(sub.id, "image", e.target.value)
                        }
                        className="border rounded-lg px-3 py-2 w-[60%]"
                      />
                      <button
                        onClick={() => handleSubDelete(sub.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
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
