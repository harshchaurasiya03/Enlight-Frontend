import React, { useState } from "react";

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
      id: "1",
      image: "/images/property5.jpeg",
      name: "Bali Property",
      views: 120,
      uniqueId: "BKP-2025",
      created: "2025-08-22",
      expire: "2025-11-30",
      status: "Draft",
      moderation: "Rejected",
    },
    {
      id: "2",
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
    <div className="w-full p-6 bg-white">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64 px-3 py-2 border rounded-md"
        />

        <div className="flex gap-3">
          <button
            onClick={() => {
              setEditItem(null);
              setIsEditMode(false);
              setShowPopup(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            + Create
          </button>
          <button
            className="px-4 py-2 border rounded-md"
            onClick={() => window.location.reload()}
          >
            🗘 Reload
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
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
              <tr key={row.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(row.id)}
                    onChange={() => toggleSelect(row.id)}
                  />
                </td>
                <td className="p-3">{row.id}</td>
                <td className="p-3">
                  <img src={row.image} alt={row.name} className="w-12 h-12" />
                </td>
                <td className="p-3">{row.name}</td>
                <td className="p-3">{row.views}</td>
                <td className="p-3">{row.uniqueId}</td>
                <td className="p-3">{row.created}</td>
                <td className="p-3">{row.expire}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-md text-xs text-white ${
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
                    className={`px-3 py-1 rounded-md text-xs text-white ${
                      row.moderation === "Approved"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {row.moderation}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => {
                      setEditItem({ ...row });
                      setIsEditMode(true);
                      setShowPopup(true);
                    }}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs"
                  >
                    ✎ Edit
                  </button>
                  <button
                    onClick={() =>
                      setData(data.filter((i) => i.id !== row.id))
                    }
                    className="px-3 py-1 bg-red-500 text-white rounded-md text-xs"
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-4 text-gray-600 text-sm flex items-center gap-2">
          <span>
            🌐 Showing {filteredData.length} of {data.length} records
          </span>
        </div>
      </div>

      {/* Create/Edit Popup */}
      {showPopup && (
        <div className="flex items-center justify-center z-20 absolute inset-0 bg-opacity-40 backdrop-blur-sm">
          <div className="relative bg-white p-6 rounded shadow w-[700px] max-w-full translate-x-16">
            <h2 className="text-lg font-semibold mb-4">
              {isEditMode ? "Edit Property" : "Create Property"}
            </h2>

            {/* Name & Unique ID */}
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="text-sm font-medium">Property Name</label>
                <input
                  className="w-full px-3 py-2 border rounded mt-1"
                  value={editItem?.name || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Unique ID</label>
                <input
                  className="w-full px-3 py-2 border rounded mt-1"
                  value={editItem?.uniqueId || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, uniqueId: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Multiple Image Upload */}
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">
                Property Images
              </label>
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
                className="w-full px-3 py-2 border rounded mt-1"
              />
              {editItem?.images?.length > 0 && (
                <div className="mt-2 flex gap-2 flex-wrap">
                  {editItem.images.map((img: any, index: number) => (
                    <div key={index} className="relative">
                      <img
                        src={img.url}
                        alt={`Property ${index}`}
                        className="w-24 h-24 object-cover rounded-md border"
                      />
                      <button
                        onClick={() => {
                          setEditItem({
                            ...editItem,
                            images: editItem.images.filter(
                              (_: any, i: number) => i !== index
                            ),
                          });
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Views, Status, and Moderation */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium">Views</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded mt-1"
                  value={editItem?.views || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, views: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <select
                  className="w-full px-3 py-2 border rounded mt-1"
                  value={editItem?.status || "Draft"}
                  onChange={(e) =>
                    setEditItem({ ...editItem, status: e.target.value })
                  }
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Moderation</label>
                <select
                  className="w-full px-3 py-2 border rounded mt-1"
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

            {/* Save / Cancel Buttons */}
            <div className="flex gap-3">
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
                className="px-4 py-2 bg-blue-600 text-white rounded-md flex-1"
              >
                {isEditMode ? "Save Changes" : "Save"}
              </button>

              <button
                onClick={() => {
                  setShowPopup(false);
                  setEditItem(null);
                  setIsEditMode(false);
                }}
                className="px-4 py-2 bg-gray-300 text-black rounded-md flex-1"
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
