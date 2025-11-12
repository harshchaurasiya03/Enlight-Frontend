import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

type MustSellProperty = {
  id: number;
  image: string;
  originalPrice: string;
  price: string;
  type: string;
  society: string;
  location: string;
};

export default function MustSellPropertyCrud() {
  const [properties, setProperties] = useState<MustSellProperty[]>([
    {
      id: 1,
      image: "/images/Bangna.jpeg",
      originalPrice: "86L",
      price: "82L",
      type: "2BHK",
      society: "Skyline Society",
      location:
        "48 Oriental Avenue, Khwaeng Bang Rak, Bang Rak, Bangkok",
    },
    {
      id: 2,
      image: "/images/banner.jpeg",
      originalPrice: "90L",
      price: "75L",
      type: "Studio",
      society: "Riverfront Society",
      location:
        "88 Moo 4, T. Rawai, A. Mueang Phuket, Phuket 83130, Thailand",
    },
    {
      id: 3,
      image: "/images/sathon.jpeg",
      originalPrice: "92L",
      price: "78L",
      type: "Studio",
      society: "Riverfront Towers",
      location:
        "Soi Ladprao 101, Khwaeng Khlong Chan, Khet Bueng Kum",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<MustSellProperty | null>(null);
  const [formData, setFormData] = useState({
    image: "",
    originalPrice: "",
    price: "",
    type: "",
    society: "",
    location: "",
  });

  const openModal = (property?: MustSellProperty) => {
    if (property) {
      setEditingProperty(property);
      setFormData({
        image: property.image,
        originalPrice: property.originalPrice,
        price: property.price,
        type: property.type,
        society: property.society,
        location: property.location,
      });
    } else {
      setEditingProperty(null);
      setFormData({
        image: "",
        originalPrice: "",
        price: "",
        type: "",
        society: "",
        location: "",
      });
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editingProperty) {
      setProperties((prev) =>
        prev.map((p) =>
          p.id === editingProperty.id ? { ...p, ...formData } : p
        )
      );
    } else {
      const newProperty: MustSellProperty = {
        id: Date.now(),
        ...formData,
      };
      setProperties((prev) => [...prev, newProperty]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Must-Sell Properties
          </h2>
          <p className="text-gray-500">
            Manage discounted properties displayed on the homepage
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> Add Property
        </button>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((p) => (
          <div
            key={p.id}
            className="border rounded-xl bg-gray-50 shadow-sm overflow-hidden hover:shadow-md transition"
          >
            <img
              src={p.image}
              alt={p.society}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <p className="font-semibold mb-1">
                <span className="line-through text-gray-400 mr-2">
                  ₹{p.originalPrice}
                </span>
                <span className="text-red-600">₹{p.price}</span>
              </p>
              <p className="text-gray-600 text-sm">{p.type}</p>
              <p className="font-bold text-gray-800 mt-1">{p.society}</p>
              <p className="text-gray-500 text-sm mt-1">{p.location}</p>

              <div className="flex justify-between items-center mt-4 text-sm">
                <button
                  onClick={() => openModal(p)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
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
              {editingProperty ? "Edit Property" : "Add Property"}
            </h2>

            <div className="space-y-4">
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

              {/* Prices */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-600 text-sm font-medium">
                    Original Price
                  </label>
                  <input
                    type="text"
                    value={formData.originalPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        originalPrice: e.target.value,
                      })
                    }
                    placeholder="e.g. 90L"
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-gray-600 text-sm font-medium">
                    Discounted Price
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: e.target.value,
                      })
                    }
                    placeholder="e.g. 75L"
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Property Type
                </label>
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  placeholder="e.g. 2BHK, Studio, Condo"
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>

              {/* Society */}
              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Society Name
                </label>
                <input
                  type="text"
                  value={formData.society}
                  onChange={(e) =>
                    setFormData({ ...formData, society: e.target.value })
                  }
                  placeholder="e.g. Skyline Society"
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>

              {/* Location */}
              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Location
                </label>
                <textarea
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Enter full address"
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                  rows={2}
                />
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
