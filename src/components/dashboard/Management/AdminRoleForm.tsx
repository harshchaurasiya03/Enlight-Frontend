import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PermissionFlags from "./PermissionFlags";

interface AdminRole {
  id?: string;
  name: string;
  description: string;
  shortDescription?: string;
}

export default function AdminRoleForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = !!id;

  const [role, setRole] = useState<AdminRole>({
    name: "",
    description: "",
    shortDescription: "",
  });

  // Load existing record
  useEffect(() => {
    const saved = localStorage.getItem("adminRoles");
    if (!saved) return;

    const roles = JSON.parse(saved);

    if (isEditMode) {
      const found = roles.find((r: any) => r.id === id);
      if (found) setRole(found);
    }
  }, [id]);

  const handleSave = () => {
    if (!role.name || !role.description) {
      alert("Name & Description are required");
      return;
    }

    const saved = localStorage.getItem("adminRoles");
    let roles = saved ? JSON.parse(saved) : [];

    if (isEditMode) {
      // Update
      roles = roles.map((r: any) =>
        r.id === id ? { ...r, ...role } : r
      );
    } else {
      // Create
      const newRole = {
        ...role,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().slice(0, 10),
        createdBy: "You",
      };
      roles.push(newRole);
    }

    localStorage.setItem("adminRoles", JSON.stringify(roles));
    navigate("/dashboard/AdminRole");
  };

  return (
    <div className="p-6 bg-white w-full">
      <h2 className="text-2xl font-semibold mb-4">
        {isEditMode ? "Edit Admin Role" : "Create Admin Role"}
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm font-medium">Role Name</label>
          <input
            className="w-full px-3 py-2 border rounded mt-1"
            placeholder="Admin"
            value={role.name}
            onChange={(e) => setRole({ ...role, name: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Short Description</label>
          <input
            className="w-full px-3 py-2 border rounded mt-1"
            placeholder="Optional"
            value={role.shortDescription}
            onChange={(e) =>
              setRole({ ...role, shortDescription: e.target.value })
            }
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium">Description</label>
        <textarea
          className="w-full px-3 py-2 border rounded mt-1"
          rows={3}
          value={role.description}
          onChange={(e) =>
            setRole({ ...role, description: e.target.value })
          }
        />
      </div>

      <PermissionFlags />

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {isEditMode ? "Save Changes" : "Save"}
        </button>

        <button
          onClick={() => navigate("/dashboard/AdminRole")}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
