import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type BlogItem = {
  id: string;
  image: string;
  name: string;
  content: string;
  author: string;
  created: string;
  status: string;
};

export default function BlogDashboard() {
  const [selected, setSelected] = useState<string[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [editItem, setEditItem] = useState<BlogItem | null>(null);

  const [data, setData] = useState<BlogItem[]>([
    {
      id: "1",
      image: "/images/property1.jpeg",
      name: "Bankok Property",
      content: "<p>Buy, Rent</p>",
      author: "Alex",
      created: "2025-10-22",
      status: "Published",
    },
    {
      id: "2",
      image: "/images/property2.jpeg",
      name: "Phuket Property",
      content: "<p>Rent, Sell</p>",
      author: "Lorna Mark",
      created: "2025-10-25",
      status: "Draft",
    },
  ]);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const openCreatePopup = () => {
    setEditItem({
      id: (data.length + 1).toString(),
      image: "https://via.placeholder.com/50",
      name: "",
      content: "",
      author: "",
      created: new Date().toISOString().split("T")[0],
      status: "Draft",
    });
    setIsEditMode(false);
    setShowPopup(true);
  };

  const openEditPopup = (item: BlogItem) => {
    setEditItem({ ...item });
    setIsEditMode(true);
    setShowPopup(true);
  };

  const saveItem = () => {
    if (!editItem) return;

    if (isEditMode) {
      setData((prev) =>
        prev.map((item) => (item.id === editItem.id ? { ...editItem } : item))
      );
    } else {
      setData((prev) => [...prev, { ...editItem }]);
    }

    setEditItem(null);
    setIsEditMode(false);
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex gap-3 flex-wrap">
          <button className="px-5 py-2 border rounded-xl hover:bg-gray-100 transition">
            Filters
          </button>
          <input
            placeholder="Search..."
            className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={openCreatePopup}
            className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            + Create
          </button>
          <button
            className="px-5 py-2 border rounded-xl hover:bg-gray-100 transition"
            onClick={() => window.location.reload()}
          >
            🗘 Reload
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="w-full text-sm divide-y divide-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">
                <input type="checkbox" />
              </th>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Content</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Operations</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 transition-colors border-b"
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(row.id)}
                    onChange={() => toggleSelect(row.id)}
                  />
                </td>
                <td className="p-3">{row.id}</td>
                <td className="p-3">
                  <img
                    src={row.image}
                    alt={row.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                </td>
                <td className="p-3">{row.name}</td>
                <td
                  className="p-3 max-w-xs overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: row.content }}
                />
                <td className="p-3">{row.author}</td>
                <td className="p-3">{row.created}</td>
                <td className="p-3">
                  <span className="px-3 py-1 bg-blue-500 text-white rounded-xl text-xs">
                    {row.status}
                  </span>
                </td>
                <td className="p-3 gap-2">
                  <button
                    onClick={() => openEditPopup(row)}
                    className="px-3 py-1 bg-yellow-300 text-white rounded-lg hover:bg-yellow-500"
                  >
                    ✎ Edit
                  </button>
                  <button
                    onClick={() =>
                      setData((prev) => prev.filter((i) => i.id !== row.id))
                    }
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup */}
      {showPopup && editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-3xl h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">
                {isEditMode ? "Edit Blog" : "Create Blog"}
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700 transition"
                onClick={() => {
                  setShowPopup(false);
                  setEditItem(null);
                  setIsEditMode(false);
                }}
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Name</label>
                <input
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={editItem.name}
                  onChange={(e) =>
                    setEditItem({ ...editItem, name: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Content</label>
                <ReactQuill
                  theme="snow"
                  value={editItem.content}
                  onChange={(content) =>
                    setEditItem({ ...editItem, content })
                  }
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, false] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image", "code-block"],
                      ["clean"],
                    ],
                  }}
                  className="rounded-xl overflow-hidden"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Author</label>
                <input
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={editItem.author}
                  onChange={(e) =>
                    setEditItem({ ...editItem, author: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={editItem.status}
                  onChange={(e) =>
                    setEditItem({ ...editItem, status: e.target.value })
                  }
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-4 p-4 border-t">
              <button
                onClick={saveItem}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                {isEditMode ? "Save Changes" : "Save"}
              </button>
              <button
                onClick={() => {
                  setShowPopup(false);
                  setEditItem(null);
                  setIsEditMode(false);
                }}
                className="flex-1 px-4 py-2 bg-gray-300 text-black rounded-xl hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
