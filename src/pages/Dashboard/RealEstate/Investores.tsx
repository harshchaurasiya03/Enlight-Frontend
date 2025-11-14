import React, { useState } from "react";

interface Investor {
  id: number;
  image: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
}

export default function Investores() {
  const [investors, setInvestors] = useState<Investor[]>([
    {
      id: 1,
      image: "/images/investor.avif",
      name: "John Doe",
      description: "Angel investor with 10 years of experience",
      status: "Active",
      createdAt: "2025-11-01",
    },
    {
      id: 2,
      image: "/images/investor.avif",
      name: "Jane Smith",
      description: "Venture capitalist specializing in tech startups",
      status: "Inactive",
      createdAt: "2025-10-20",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editInvestor, setEditInvestor] = useState<Investor | null>(null);
  const [formData, setFormData] = useState<Partial<Investor>>({
    image: "",
    name: "",
    description: "",
    status: "Active",
    createdAt: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setFormData({ ...formData, image: reader.result as string });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddOrEdit = () => {
    if (!formData.name || !formData.description) {
      return alert("Name and Description are required");
    }

    if (editInvestor) {
      setInvestors(
        investors.map((i) =>
          i.id === editInvestor.id ? { ...i, ...formData } as Investor : i
        )
      );
    } else {
      const newInvestor: Investor = {
        id: investors.length + 1,
        image: formData.image || "",
        name: formData.name || "",
        description: formData.description || "",
        status: formData.status || "Active",
        createdAt: formData.createdAt || new Date().toISOString().slice(0, 10),
      };
      setInvestors([...investors, newInvestor]);
    }

    setFormData({ image: "", name: "", description: "", status: "Active", createdAt: "" });
    setEditInvestor(null);
    setShowModal(false);
  };

  const handleEdit = (investor: Investor) => {
    setEditInvestor(investor);
    setFormData(investor);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setInvestors(investors.filter((i) => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-10 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Investores</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white rounded-xl px-6 py-2 hover:bg-blue-700"
        >
          Add Investor
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["ID", "Image", "Name", "Description", "Status", "Created At", "Operations"].map(
                (h) => (
                  <th key={h} className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {investors.map((investor) => (
              <tr key={investor.id}>
                <td className="px-6 py-4">{investor.id}</td>
                <td className="px-6 py-4">
                  {investor.image ? (
                    <img src={investor.image} className="w-12 h-12 rounded-lg object-cover" alt={investor.name} />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="px-6 py-4">{investor.name}</td>
                <td className="px-6 py-4">{investor.description}</td>
                <td className="px-6 py-4">{investor.status}</td>
                <td className="px-6 py-4">{investor.createdAt}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(investor)}
                    className="px-3 py-1 bg-yellow-300 text-white rounded-lg hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(investor.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl space-y-4 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setShowModal(false);
                setEditInvestor(null);
              }}
            >
              X
            </button>
            <h3 className="text-lg font-semibold text-gray-700">
              {editInvestor ? "Edit Investor" : "Add Investor"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <label className="text-sm text-gray-600">Name</label>
                <input
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  placeholder="Enter investor name"
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex flex-col space-y-1 md:col-span-2">
                <label className="text-sm text-gray-600">Description</label>
                <textarea
                  name="description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm text-gray-600">Status</label>
                <select
                  name="status"
                  value={formData.status || "Active"}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm text-gray-600">Created At</label>
                <input
                  type="date"
                  name="createdAt"
                  value={formData.createdAt || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex flex-col space-y-1 md:col-span-2">
                <label className="text-sm text-gray-600">Image</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {formData.image && (
                  <img src={formData.image} className="w-20 h-20 mt-2 object-cover rounded-lg" alt="Preview" />
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                className="border border-gray-300 rounded-xl px-6 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setShowModal(false);
                  setEditInvestor(null);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white rounded-xl px-6 py-2 hover:bg-blue-700"
                onClick={handleAddOrEdit}
              >
                {editInvestor ? "Update Investor" : "Add Investor"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
