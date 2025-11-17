import { useState } from "react";

export default function PropertiesTable() {
  const [selected, setSelected] = useState<string[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [data, setData] = useState([
    {
      id: "1",
      image: "/images/property1.jpeg",
      name: "Bangkok Property",
      views: 120,
      uniqueId: "BKP-2025",
      created: "2025-10-22",
      expire: "2025-12-30",
      status: "Published",
      moderation: "Approved",
    },
    {
      id: "2",
      image: "/images/property2.jpeg",
      name: "Thailand Property",
      views: 75,
      uniqueId: "PHP-2025",
      created: "2025-10-25",
      expire: "2026-01-10",
      status: "Draft",
      moderation: "Pending",
    },
    {
      id: "3",
      image: "/images/property5.jpeg",
      name: "Bali Property",
      views: 120,
      uniqueId: "BKP-2025",
      created: "2025-08-22",
      expire: "2025-11-30",
      status: "Draft",
      moderation: "Approved",
    },
    {
      id: "4",
      image: "/images/property8.jpeg",
      name: "Phuket Property",
      views: 75,
      uniqueId: "PHP-2025",
      created: "2025-12-25",
      expire: "2026-01-10",
      status: "Draft",
      moderation: "Pending",
    },
  ]);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.uniqueId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Top bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <div className="flex gap-3">
          <button
            onClick={() => {
              setEditItem(null);
              setIsEditMode(false);
              setShowPopup(true);
            }}
            className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            + Create
          </button>
          <button
            className="px-5 py-2 border rounded-xl hover:bg-gray-100"
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
              <th className="p-3 text-left">Views</th>
              <th className="p-3 text-left">Unique ID</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Expire Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Moderation Status</th>
              <th className="p-3 text-left">Operations</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
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
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                </td>
                <td className="p-3">{row.name}</td>
                <td className="p-3">{row.views}</td>
                <td className="p-3">{row.uniqueId}</td>
                <td className="p-3">{row.created}</td>
                <td className="p-3">{row.expire}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-xl text-xs text-white ${
                      row.status === "Published"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-xl text-xs text-white ${
                      row.moderation === "Approved"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {row.moderation}
                  </span>
                </td>
                <td className="p-3 gap-2">
                  <button
                    onClick={() => {
                      setEditItem({ ...row });
                      setIsEditMode(true);
                      setShowPopup(true);
                    }}
                    className="px-3 py-1 bg-yellow-300 text-white rounded-lg hover:bg-yellow-500"
                  >
                    ✎ Edit
                  </button>
                  <button
                    onClick={() =>
                      setData(data.filter((i) => i.id !== row.id))
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

        <div className="p-4 text-gray-600 text-sm flex items-center gap-2">
          🌐 Showing {filteredData.length} of {data.length} records
        </div>
      </div>

      {/* Create/Edit Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="relative bg-white p-6 rounded-2xl shadow-lg w-full max-w-3xl space-y-4">
            <h2 className="text-lg font-semibold">
              {isEditMode ? "Edit Property" : "Create Property"}
            </h2>

            {/* Name & Unique ID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Property Name</label>
                <input
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={editItem?.name || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, name: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Unique ID</label>
                <input
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={editItem?.uniqueId || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, uniqueId: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Multiple Image Upload */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">Property Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    const filesArray = Array.from(e.target.files);
                    const imagesPreview = filesArray.map((file) => ({
                      file,
                      url: URL.createObjectURL(file),
                    }));
                    setEditItem({
                      ...editItem,
                      images: [...(editItem?.images || []), ...imagesPreview],
                    });
                  }
                }}
                className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {editItem?.images?.length > 0 && (
                <div className="mt-2 flex gap-2 flex-wrap">
                  {editItem.images.map((img: any, index: number) => (
                    <div key={index} className="relative">
                      <img
                        src={img.url}
                        alt={`Property ${index}`}
                        className="w-24 h-24 object-cover rounded-xl border"
                      />
                      <button
                        onClick={() =>
                          setEditItem({
                            ...editItem,
                            images: editItem.images.filter(
                              (_: any, i: number) => i !== index
                            ),
                          })
                        }
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Views, Status, Moderation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Views</label>
                <input
                  type="number"
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={editItem?.views || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, views: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Status</label>
                <select
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={editItem?.status || "Draft"}
                  onChange={(e) =>
                    setEditItem({ ...editItem, status: e.target.value })
                  }
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Moderation</label>
                <select
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={editItem?.moderation || "Pending"}
                  onChange={(e) =>
                    setEditItem({ ...editItem, moderation: e.target.value })
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Save / Cancel */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => {
                  if (isEditMode) {
                    setData((prev) =>
                      prev.map((item) =>
                        item.id === editItem.id
                          ? { ...item, ...editItem }
                          : item
                      )
                    );
                  } else {
                    const newItem = {
                      id: (data.length + 1).toString(),
                      image:
                        editItem?.images?.[0]?.url ||
                        "https://via.placeholder.com/50",
                      name: editItem?.name || "",
                      views: editItem?.views || 0,
                      uniqueId: editItem?.uniqueId || `UID-${Date.now()}`,
                      created: new Date().toISOString().split("T")[0],
                      expire: "2026-01-01",
                      status: editItem?.status || "Draft",
                      moderation: editItem?.moderation || "Pending",
                    };
                    setData([...data, newItem]);
                  }
                  setEditItem(null);
                  setIsEditMode(false);
                  setShowPopup(false);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                {isEditMode ? "Save Changes" : "Save"}
              </button>

              <button
                onClick={() => {
                  setShowPopup(false);
                  setEditItem(null);
                  setIsEditMode(false);
                }}
                className="flex-1 px-4 py-2 bg-gray-300 text-black rounded-xl hover:bg-gray-400"
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
