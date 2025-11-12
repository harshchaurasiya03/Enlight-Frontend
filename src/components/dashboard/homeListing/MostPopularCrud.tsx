import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

type PopularCard = {
  id: number;
  title: string;
  images: string[];
};

export default function MostPopularCrud() {
  const [cards, setCards] = useState<PopularCard[]>([
    {
      id: 1,
      title: "Access to BTS, MRT",
      images: [
        "/images/property10.jpeg",
        "/images/property11.jpeg",
        "/images/property12.jpeg",
        "/images/property13.jpeg",
      ],
    },
    {
      id: 2,
      title: "Luxury Villa in Phuket",
      images: [
        "/images/property14.jpeg",
        "/images/property15.jpeg",
        "/images/property13.jpeg",
        "/images/property18.jpeg",
      ],
    },
    {
      id: 3,
      title: "Close to the beach in Pattaya",
      images: [
        "/images/property22.jpeg",
        "/images/property23.jpeg",
        "/images/property24.jpeg",
        "/images/property25.jpeg",
      ],
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<PopularCard | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    images: ["", "", "", ""],
  });

  const openModal = (card?: PopularCard) => {
    if (card) {
      setEditingCard(card);
      setFormData({ title: card.title, images: [...card.images] });
    } else {
      setEditingCard(null);
      setFormData({ title: "", images: ["", "", "", ""] });
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editingCard) {
      setCards((prev) =>
        prev.map((c) =>
          c.id === editingCard.id ? { ...c, ...formData } : c
        )
      );
    } else {
      const newCard: PopularCard = {
        id: Date.now(),
        title: formData.title,
        images: formData.images,
      };
      setCards((prev) => [...prev, newCard]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const handleImageChange = (index: number, value: string) => {
    const updated = [...formData.images];
    updated[index] = value;
    setFormData({ ...formData, images: updated });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Most Popular Searches
          </h2>
          <p className="text-gray-500">
            Manage cards shown in “Most Popular Searches” section
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> Add Card
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="border rounded-xl shadow-sm bg-gray-50 overflow-hidden hover:shadow-md transition"
          >
            <div className="p-4">
              <h3 className="font-bold text-lg mb-3 text-center text-gray-800">
                {card.title}
              </h3>
              <div className="grid grid-cols-2 grid-rows-2 gap-2">
                {card.images.map((img, i) => (
                  <div key={i} className="w-full h-24 rounded-md overflow-hidden">
                    {img ? (
                      <img
                        src={img}
                        alt={`${card.title}-${i}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between px-4 pb-4 text-sm">
              <button
                onClick={() => openModal(card)}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(card.id)}
                className="text-red-500 hover:text-red-700 flex items-center gap-1"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[650px] rounded-xl shadow-lg p-6 max-h-[85vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {editingCard ? "Edit Card" : "Add Card"}
            </h2>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Card Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter card title"
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>

              {/* Image URLs */}
              <div>
                <label className="text-gray-600 text-sm font-medium mb-2 block">
                  Image URLs (4 images)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {formData.images.map((url, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        value={url}
                        onChange={(e) =>
                          handleImageChange(index, e.target.value)
                        }
                        placeholder={`Image ${index + 1} URL`}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                      {url && (
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-md border mt-2"
                        />
                      )}
                    </div>
                  ))}
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
