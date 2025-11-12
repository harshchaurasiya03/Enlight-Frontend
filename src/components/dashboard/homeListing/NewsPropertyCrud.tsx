import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

type NewsItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  month: string;
};

export default function NewsPropertyCrud() {
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: 1,
      title: "Thailand Real Estate Market Shows Signs of Recovery",
      description:
        "After several months of slow growth, Thailand's real estate market is showing positive signs with an increase in both domestic and foreign investments.",
      image: "/images/property23.jpeg",
      date: "06",
      month: "NOV",
    },
    {
      id: 2,
      title: "Bangkok Condo Prices Set to Rise in 2025",
      description:
        "Analysts predict a 5% increase in Bangkok’s condo prices as new infrastructure projects near completion. Buyers are advised to act quickly before prices rise further.",
      image: "/images/property21.jpeg",
      date: "05",
      month: "NOV",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    date: "",
    month: "",
  });

  const openModal = (newsItem?: NewsItem) => {
    if (newsItem) {
      setEditingNews(newsItem);
      setFormData({
        title: newsItem.title,
        description: newsItem.description,
        image: newsItem.image,
        date: newsItem.date,
        month: newsItem.month,
      });
    } else {
      setEditingNews(null);
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
    if (editingNews) {
      setNews((prev) =>
        prev.map((n) => (n.id === editingNews.id ? { ...n, ...formData } : n))
      );
    } else {
      const newNews: NewsItem = { id: Date.now(), ...formData };
      setNews((prev) => [...prev, newNews]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Thailand Property News
          </h2>
          <p className="text-gray-500">
            Manage news articles shown on the homepage
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> Add News
        </button>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((n) => (
          <div
            key={n.id}
            className="border rounded-xl bg-gray-50 shadow-sm overflow-hidden hover:shadow-md transition"
          >
            <div className="relative w-full h-40">
              <img
                src={n.image}
                alt={n.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-white bg-opacity-90 text-center rounded-md w-12 h-12 flex flex-col items-center justify-center shadow-sm">
                <span className="text-lg font-bold leading-none">{n.date}</span>
                <span className="text-[10px] uppercase tracking-wide text-gray-600">
                  {n.month}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">
                {n.title}
              </h3>
              <p className="text-gray-600 text-sm h-20 overflow-y-auto">
                {n.description}
              </p>
              <div className="flex justify-between items-center mt-4 text-sm">
                <button
                  onClick={() => openModal(n)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(n.id)}
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
              {editingNews ? "Edit News Article" : "Add News Article"}
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
                  placeholder="Enter news title"
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
                  placeholder="Enter news description"
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

              {/* Date and Month */}
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
