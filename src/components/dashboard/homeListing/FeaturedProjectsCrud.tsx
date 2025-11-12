import { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaMapMarkerAlt } from "react-icons/fa";

type Project = {
  id: number;
  image: string;
  projectName: string;
  societyName: string;
  location: string;
};

export default function FeaturedProjectsCrud() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      image: "/images/property8.jpeg",
      projectName: "The Horizon Residences",
      societyName: "Skyline Society",
      location: "Bangkok",
    },
    {
      id: 2,
      image: "/images/property15.jpeg",
      projectName: "Riverfront Towers",
      societyName: "Waterside Society",
      location: "Chiang Mai",
    },
    {
      id: 3,
      image: "/images/property24.jpeg",
      projectName: "Luxury Villas",
      societyName: "Golden Palm Society",
      location: "Phuket",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    image: "",
    projectName: "",
    societyName: "",
    location: "",
  });

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        image: project.image,
        projectName: project.projectName,
        societyName: project.societyName,
        location: project.location,
      });
    } else {
      setEditingProject(null);
      setFormData({ image: "", projectName: "", societyName: "", location: "" });
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editingProject) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingProject.id ? { ...p, ...formData } : p
        )
      );
    } else {
      const newProject: Project = {
        id: Date.now(),
        ...formData,
      };
      setProjects((prev) => [...prev, newProject]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Featured Projects
          </h2>
          <p className="text-gray-500">
            Manage featured project cards displayed on the homepage
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> Add Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="h-[70%] w-full">
              <img
                src={project.image}
                alt={project.projectName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-4 h-[30%]">
              <span className="text-gray-700 truncate">{project.projectName}</span>
              <h3 className="font-bold text-lg mt-1 truncate">
                {project.societyName}
              </h3>
              <div className="flex items-center text-gray-600 mt-1">
                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                <span className="truncate">{project.location}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between p-3 border-t text-sm">
              <button
                onClick={() => openModal(project)}
                className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
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
          <div className="bg-white w-[600px] rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingProject ? "Edit Project" : "Add Project"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Project Name
                </label>
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) =>
                    setFormData({ ...formData, projectName: e.target.value })
                  }
                  placeholder="Enter project name"
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Society Name
                </label>
                <input
                  type="text"
                  value={formData.societyName}
                  onChange={(e) =>
                    setFormData({ ...formData, societyName: e.target.value })
                  }
                  placeholder="Enter society name"
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="text-gray-600 text-sm font-medium">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Enter project location"
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>

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
                  placeholder="/images/property8.jpeg"
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
                {formData.image && (
                  <div className="mt-3">
                    <p className="text-gray-600 text-sm mb-1">Preview:</p>
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-lg border"
                    />
                  </div>
                )}
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
