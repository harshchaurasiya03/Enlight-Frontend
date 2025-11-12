import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

type SecretItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  month: string;
};

export default function ThailandSecretsCrud() {
  const [secrets, setSecrets] = useState<SecretItem[]>([
    {
      id: 1,
      title: "Ownership Explained",
      description:
        "Learn about property ownership rules in Thailand for foreigners and locals. Discover how to legally own condos, land, and other property types.",
      image: "/images/property19.jpeg",
      date: "06",
      month: "NOV",
    },
    {
      id: 2,
      title: "Area Guides",
      description:
        "Explore popular areas in Thailand for investment or living, including Bangkok, Phuket, Chiang Mai, and Pattaya.",
      image: "/images/property26.jpeg",
      date: "05",
      month: "NOV",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SecretItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    date: "",
    month: "",
  });

  const openModal = (item?: SecretItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        description: item.description,
        image: item.image,
        date: item.date,
        month: item.month,
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: "",
        description: "",
        image: "",
        date: "",
        month: "",
      });
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editingItem) {
      setSecrets((prev) =>
        prev.map((s) => (s.id === editingItem.id ? { ...s, ...formData } : s))
      );
    } else {
      const newSecret: SecretItem = { id: Date.now(), ...formData };
      setSecrets((prev) => [...prev, newSecret]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setSecrets((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Thailand Real Estate Secrets
          </h2>
          <p className="text-gray-500">
            Manage articles shown in the "Find Secrets on Thailand Real Estate" section
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> Add Secret
        </button>
      </div>

      {/* Secrets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {secrets.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl bg-gray-50 shadow-sm overflow-hidden hover:shadow-md transition"
          >
            <div className="relative w-full h-40">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-white bg-opacity-90 text-center rounded-md w-12 h-12 flex flex-col items-center justify-center shadow-sm">
                <span className="text-lg font-bold leading-none">{item.date}</span>
                <span className="text-[10px] uppercase tracking-wide text-gray-600">
                  {item.month}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm h-20 overflow-y-auto">
                {item.description}
              </p>

              <div className="flex justify-between items-center mt-4 text-sm">
                <button
                  onClick={() => openModal(item)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1"
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
              {editingItem ? "Edit Secret Article" : "Add Secret Article"}
            </h2>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter article title"
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter short description"
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                  rows={3}
                />
              </div>

              {/* Image */}
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
                  placeholder="/images/property.jpeg"
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
                {formData.image && (
                  <div className="mt-3">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              {/* Date + Month */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-600 text-sm font-medium">
                    Date
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    placeholder="e.g. 06"
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-gray-600 text-sm font-medium">
                    Month
                  </label>
                  <input
                    type="text"
                    value={formData.month}
                    onChange={(e) =>
                      setFormData({ ...formData, month: e.target.value })
                    }
                    placeholder="e.g. NOV"
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
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
