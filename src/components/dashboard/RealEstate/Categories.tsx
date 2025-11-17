import React, { useState } from "react";

interface Category {
  id: number;
  name: string;
  description: string;
  status: string;
  createdAt: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Villa",
      description: "Luxury standalone houses with private space",
      status: "Active",
      createdAt: "2025-11-01",
    },
    {
      id: 2,
      name: "Condo",
      description: "Apartments in a building with shared amenities",
      status: "Active",
      createdAt: "2025-10-20",
    },
    {
      id: 3,
      name: "2BHK",
      description: "Two-bedroom hall kitchen apartment",
      status: "Inactive",
      createdAt: "2025-09-15",
    },
    {
      id: 4,
      name: "Penthouse",
      description: "Top floor luxury apartment with panoramic views",
      status: "Active",
      createdAt: "2025-08-10",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<Partial<Category>>({
    name: "",
    description: "",
    status: "Active",
    createdAt: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrEdit = () => {
    if (!formData.name || !formData.description) return alert("Name and Description are required");

    if (editCategory) {
      setCategories(
        categories.map((c) => (c.id === editCategory.id ? { ...c, ...formData } as Category : c))
      );
    } else {
      const newCategory: Category = {
        id: categories.length + 1,
        name: formData.name || "",
        description: formData.description || "",
        status: formData.status || "Active",
        createdAt: formData.createdAt || new Date().toISOString().slice(0, 10),
      };
      setCategories([...categories, newCategory]);
    }

    setFormData({ name: "", description: "", status: "Active", createdAt: "" });
    setEditCategory(null);
    setShowModal(false);
  };

  const handleEdit = (category: Category) => {
    setEditCategory(category);
    setFormData(category);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-10 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Categories</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white rounded-xl px-6 py-2 hover:bg-blue-700"
        >
          Add Category
        </button>
      </div>

      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["ID", "Name", "Description", "Created At", "Status", "Operations"].map(
                (h) => (
                  <th key={h} className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4">{category.id}</td>
                <td className="px-6 py-4">{category.name}</td>
                <td className="px-6 py-4">{category.description}</td>
                <td className="px-6 py-4">{category.createdAt}</td>
                <td className="px-6 py-4">{category.status}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="px-3 py-1 bg-yellow-300 text-white rounded-lg hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
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

      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl space-y-4 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setShowModal(false);
                setEditCategory(null);
              }}
            >
              X
            </button>
            <h3 className="text-lg font-semibold text-gray-700">{editCategory ? "Edit Category" : "Add Category"}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <label className="text-sm text-gray-600">Name</label>
                <input
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  placeholder="Enter category name"
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
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                className="border border-gray-300 rounded-xl px-6 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setShowModal(false);
                  setEditCategory(null);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white rounded-xl px-6 py-2 hover:bg-blue-700"
                onClick={handleAddOrEdit}
              >
                {editCategory ? "Update Category" : "Add Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
