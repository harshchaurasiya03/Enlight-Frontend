import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface AdminRole {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  createdAt?: string;
  createdBy?: string;
}

export default function AdminRole() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState<AdminRole[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminRole | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(roles.length / pageSize);
  const paginatedRoles = roles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Load roles from localStorage
  useEffect(() => {
    setLoading(true);
    const saved = localStorage.getItem("adminRoles");

    if (saved) {
      setRoles(JSON.parse(saved));
    } else {
      // Default dummy for first load
      const dummy = [
        {
          id: "1",
          name: "Admin",
          description: "Admin users role",
          shortDescription: "Full access",
          createdAt: "2025-10-22",
          createdBy: "System Admin",
        },
      ];
      setRoles(dummy);
      localStorage.setItem("adminRoles", JSON.stringify(dummy));
    }

    setLoading(false);
  }, []);

  // Delete role
  const confirmDelete = () => {
    if (!deleteTarget) return;

    const updated = roles.filter((r) => r.id !== deleteTarget.id);
    setRoles(updated);
    localStorage.setItem("adminRoles", JSON.stringify(updated));

    setDeleteTarget(null);
  };

  return (
    <div className="w-full p-6 bg-white">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Admin Roles</h2>

        <button
          onClick={() => navigate("/dashboard/AdminRole/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          + Create Role
        </button>
      </div>

      {/* Table */}
      <div className="border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Created By</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Operations</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : paginatedRoles.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-gray-500 text-center py-4">
                  No roles found
                </td>
              </tr>
            ) : (
              paginatedRoles.map((role) => (
                <tr key={role.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{role.name}</td>
                  <td className="p-3">{role.description}</td>
                  <td className="p-3">{role.createdBy}</td>
                  <td className="p-3">{role.createdAt}</td>

                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/AdminRole/edit/${role.id}`)
                      }
                      className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setDeleteTarget(role)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="p-3 flex justify-between text-sm text-gray-600">
          <span>
            Showing {paginatedRoles.length} record
            {paginatedRoles.length > 1 ? "s" : ""}
          </span>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* DELETE POPUP */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-[400px]">
            <h3 className="text-lg font-semibold mb-2">Delete Role</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete{" "}
              <strong>{deleteTarget.name}</strong>?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
