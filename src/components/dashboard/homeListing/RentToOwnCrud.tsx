import { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaHome,
  FaHandshake,
  FaUser,
  FaRegLightbulb,
} from "react-icons/fa";

type CardContent = {
  id: number;
  icon: string;
  heading: string;
  paragraph: string;
  buttonText: string;
};

export default function RentToOwnCrud() {
  const [cards, setCards] = useState<CardContent[]>([
    {
      id: 1,
      icon: "FaHome",
      heading: "How It Works",
      paragraph:
        "Rent-to-Own connects buyers who can afford monthly payments but can’t get a mortgage with sellers holding unsold properties.",
      buttonText: "Learn How It Works",
    },
    {
      id: 2,
      icon: "FaHandshake",
      heading: "For Buyers",
      paragraph:
        "Pay a deposit, move in immediately, and make monthly installments toward owning your home — no bank loan required.",
      buttonText: "View Buyer Guide",
    },
    {
      id: 3,
      icon: "FaUser",
      heading: "For Sellers",
      paragraph:
        "Sell at full value without waiting or discounting. Rent-to-Own brings qualified buyers who pay monthly until the purchase is complete.",
      buttonText: "View Seller Options",
    },
    {
      id: 4,
      icon: "FaRegLightbulb",
      heading: "For Developers",
      paragraph:
        "Turn unsold units into income-generating assets, maintain full sale prices, and free up capital for your next project.",
      buttonText: "View Developer Solutions",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<CardContent | null>(null);
  const [formData, setFormData] = useState({
    icon: "FaHome",
    heading: "",
    paragraph: "",
    buttonText: "",
  });

  const getIconComponent = (icon: string) => {
    const size = "text-4xl text-blue-500";
    switch (icon) {
      case "FaHome":
        return <FaHome className={size} />;
      case "FaHandshake":
        return <FaHandshake className={size} />;
      case "FaUser":
        return <FaUser className={size} />;
      case "FaRegLightbulb":
        return <FaRegLightbulb className={size} />;
      default:
        return <FaHome className={size} />;
    }
  };

  const openModal = (card?: CardContent) => {
    if (card) {
      setEditingCard(card);
      setFormData({
        icon: card.icon,
        heading: card.heading,
        paragraph: card.paragraph,
        buttonText: card.buttonText,
      });
    } else {
      setEditingCard(null);
      setFormData({
        icon: "FaHome",
        heading: "",
        paragraph: "",
        buttonText: "",
      });
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
      const newCard: CardContent = {
        id: Date.now(),
        ...formData,
      };
      setCards((prev) => [...prev, newCard]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Rent-To-Own Section
          </h2>
          <p className="text-gray-500">
            Manage cards for buyers, sellers, and developers
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> Add Card
        </button>
      </div>

      {/* Card Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-5 text-center"
          >
            <div className="flex justify-center mb-3">
              {getIconComponent(card.icon)}
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">
              {card.heading}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{card.paragraph}</p>
            <button className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 text-sm">
              {card.buttonText}
            </button>

            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={() => openModal(card)}
                className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
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
          <div className="bg-white w-[500px] rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingCard ? "Edit Card" : "Add Card"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Select Icon
                </label>
                <select
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                >
                  <option value="FaHome">Home</option>
                  <option value="FaHandshake">Handshake</option>
                  <option value="FaUser">User</option>
                  <option value="FaRegLightbulb">Lightbulb</option>
                </select>
              </div>

              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Heading
                </label>
                <input
                  type="text"
                  value={formData.heading}
                  onChange={(e) =>
                    setFormData({ ...formData, heading: e.target.value })
                  }
                  placeholder="Enter heading"
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.paragraph}
                  onChange={(e) =>
                    setFormData({ ...formData, paragraph: e.target.value })
                  }
                  placeholder="Enter description"
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Button Text
                </label>
                <input
                  type="text"
                  value={formData.buttonText}
                  onChange={(e) =>
                    setFormData({ ...formData, buttonText: e.target.value })
                  }
                  placeholder="Enter button label"
                  className="w-full mt-1 border rounded-lg px-3 py-2"
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
