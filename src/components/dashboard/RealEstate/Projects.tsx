import React, { useState } from "react";

interface Project {
  id: number;
  image: string;
  name: string;
  properties: string;
  views: number;
  uniqueId: string;
  createdAt: string;
  status: string;
}

export default function Project() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      image: "/images/property2.jpeg",
      name: "Sunshine Villa",
      properties: "Villa",
      views: 120,
      uniqueId: "PRJ001",
      createdAt: "2025-11-01",
      status: "Active",
    },
    {
      id: 2,
      image: "/images/property1.jpeg",
      name: "Green Apartments",
      properties: "Apartment",
      views: 90,
      uniqueId: "PRJ002",
      createdAt: "2025-10-20",
      status: "Inactive",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    image: "",
    name: "",
    properties: "",
    views: 0,
    uniqueId: "",
    createdAt: "",
    status: "Active",
  });



  // Input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Image upload handler
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

  // Add or update project
  const handleAddOrEdit = () => {
    if (!formData.name || !formData.properties) return alert("Name and Properties are required");

    if (editProject) {
      // Update existing project
      setProjects(
        projects.map((p) => (p.id === editProject.id ? { ...p, ...formData } as Project : p))
      );
    } else {
      // Add new project
      const newProject: Project = {
        id: projects.length + 1,
        image: formData.image || "",
        name: formData.name || "",
        properties: formData.properties || "",
        views: formData.views || 0,
        uniqueId: formData.uniqueId || `PRJ${projects.length + 1}`,
        createdAt: formData.createdAt || new Date().toISOString().slice(0, 10),
        status: formData.status || "Active",
      };
      setProjects([...projects, newProject]);
    }

    // Reset form
    setFormData({ image: "", name: "", properties: "", views: 0, uniqueId: "", createdAt: "", status: "Active" });
    setEditProject(null);
    setShowModal(false);
  };

  const handleEdit = (project: Project) => {
    setEditProject(project);
    setFormData(project);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-10 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white rounded-xl px-6 py-2 hover:bg-blue-700"
        >
          Add Project
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["ID", "Image", "Name", "Properties", "Views", "Unique ID", "Created At", "Status", "Operations"].map(
                (h) => (
                  <th key={h} className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="px-6 py-4">{project.id}</td>
                <td className="px-6 py-4">
                  {project.image ? (
                    <img src={project.image} className="w-12 h-12 rounded-lg object-cover" alt={project.name} />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="px-6 py-4">{project.name}</td>
                <td className="px-6 py-4">{project.properties}</td>
                <td className="px-6 py-4">{project.views}</td>
                <td className="px-6 py-4">{project.uniqueId}</td>
                <td className="px-6 py-4">{project.createdAt}</td>
                <td className="px-6 py-4">{project.status}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="px-3 py-1 bg-yellow-300 text-white rounded-lg hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
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
                setEditProject(null);
              }}
            >
              X
            </button>
            <h3 className="text-lg font-semibold text-gray-700">{editProject ? "Edit Project" : "Add Project"}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <label className="text-sm text-gray-600">Name</label>
                <input
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  placeholder="Enter project name"
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm text-gray-600">Properties</label>
                <input
                  name="properties"
                  value={formData.properties || ""}
                  onChange={handleInputChange}
                  placeholder="Enter properties"
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm text-gray-600">Views</label>
                <input
                  type="number"
                  name="views"
                  value={formData.views || 0}
                  onChange={handleInputChange}
                  placeholder="Enter views"
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm text-gray-600">Unique ID</label>
                <input
                  name="uniqueId"
                  value={formData.uniqueId || ""}
                  onChange={handleInputChange}
                  placeholder="Enter unique ID"
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
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
                  setEditProject(null);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white rounded-xl px-6 py-2 hover:bg-blue-700"
                onClick={handleAddOrEdit}
              >
                {editProject ? "Update Project" : "Add Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
