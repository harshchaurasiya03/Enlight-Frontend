import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/redux";
import {
  fetchUsers,
  patchUser,
  deleteUserById,
} from "../../../redux/actions/userAction";
import { createUserBySuperAdmin } from "../../../redux/actions/authAction";
import { User } from "../../../types/User";
import Pagination from "../../dashboard/common/Pagination";

type EditableUser = Partial<User> & { _id?: string; id?: string };

export default function CustomerManagement() {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((s) => s.user);

  const ASSET_URL = import.meta.env.VITE_ASSET_URL || "";

  // ---------------- UI States ----------------
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editItem, setEditItem] = useState<EditableUser | null>(null);

  const [showRolePopup, setShowRolePopup] = useState(false);
  const [roleEditItem, setRoleEditItem] = useState<EditableUser | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<EditableUser | null>(null);

  // ---------------- Pagination States ----------------
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(users.length / pageSize);
  const paginatedUsers = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const getUserId = (u: EditableUser) => u._id || u.id || "";

  const getPhoto = (photo?: string) => {
    if (!photo) return "/images/user.png";
    return photo.startsWith("http") ? photo : `${ASSET_URL}${photo}`;
  };

  // ---------------- Create / Edit User ----------------
  const handleSave = async () => {
    if (!editItem) return;
    if (!editItem.name || !editItem.email) {
      alert("Name & Email are required");
      return;
    }

    try {
      if (isEditMode) {
        const id = getUserId(editItem);
        if (!id) {
          alert("Invalid user id");
          return;
        }
        await dispatch(
          patchUser(id, {
            name: editItem.name,
            email: editItem.email,
            phone: editItem.phone,
            role: editItem.role,
            agency: editItem.agency,
          })
        );
      } else {
        await dispatch(
          createUserBySuperAdmin({
            name: editItem.name!,
            email: editItem.email!,
            role: editItem.role || "user",
          })
        );
      }
      await dispatch(fetchUsers());
    } catch (err) {
      console.error("Save failed", err);
    } finally {
      setShowCreatePopup(false);
      setIsEditMode(false);
      setEditItem(null);
    }
  };

  // ---------------- Delete User ----------------
  const handleConfirmDelete = async () => {
    const id = getUserId(deleteTarget || {});
    if (!id) return;

    try {
      await dispatch(deleteUserById(id));
      await dispatch(fetchUsers());
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeleteTarget(null);
    }
  };

  // ---------------- Edit Role ----------------
  const handleRoleSave = async () => {
    if (!roleEditItem) return;
    const id = getUserId(roleEditItem);
    if (!id) return;

    try {
      await dispatch(patchUser(id, { role: roleEditItem.role }));
      await dispatch(fetchUsers());
    } catch (err) {
      console.error("Role update failed", err);
    } finally {
      setShowRolePopup(false);
      setRoleEditItem(null);
    }
  };

  // ---------------- Dummy status toggle ----------------
  const toggleStatus = (u: EditableUser) => {
    const id = getUserId(u);
    console.log("Toggled status for", id);
  };

  return (
    <div className="w-full p-6 bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Customer Management</h2>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setEditItem({ name: "", email: "", phone: "", role: "user", agency: "" });
              setIsEditMode(false);
              setShowCreatePopup(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            + Create
          </button>

          <button
            className="px-4 py-2 border rounded-md"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Photo</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Agency</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">STATUS</th>
              <th className="p-3 text-left">IS SUPER?</th>
              <th className="p-3 text-left">OPERATIONS</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="py-5 text-center text-gray-500">
                  Loading users...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={9} className="py-5 text-center text-red-500">{error}</td>
              </tr>
            ) : paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-5 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => {
                const uid = getUserId(user);
                const isSuper = user.role === "superadmin";
                return (
                  <tr key={uid} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          src={getPhoto(user.photo)}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td
                      className="p-3 text-blue-600 cursor-pointer underline"
                      onClick={() => {
                        setRoleEditItem({ ...user });
                        setShowRolePopup(true);
                      }}
                    >
                      {user.role}
                    </td>
                    <td className="p-3">{user.agency || "-"}</td>
                    <td className="p-3">{user.phone || "-"}</td>
                    <td className="p-3">
                      <span
                        className="px-3 py-1 rounded-md text-xs cursor-pointer bg-blue-500 text-white"
                        onClick={() => toggleStatus(user)}
                      >
                        Activated
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 text-white rounded-md text-xs ${
                          isSuper ? "bg-green-800" : "bg-gray-500"
                        }`}
                      >
                        {isSuper ? "YES" : "NO"}
                      </span>
                    </td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => {
                          setEditItem({ ...user });
                          setIsEditMode(true);
                          setShowCreatePopup(true);
                        }}
                        className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => setDeleteTarget({ ...user })}
                        className="px-3 py-1 bg-red-500 text-white rounded-md text-xs"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <div className="p-4 text-gray-600 text-sm flex items-center gap-2">
          <span>
            🌐 Showing {paginatedUsers.length} record
            {paginatedUsers.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ---------------- Create/Edit Popup ---------------- */}
      {showCreatePopup && editItem && (
        <div className="flex items-center top-0 left-0 justify-center z-50 absolute inset-0 bg-opacity-40 backdrop-blur-sm">
          <div className="relative bg-white p-8 rounded shadow w-[700px] max-w-full translate-x-16">
            <h2 className="text-lg font-semibold mb-4">
              {isEditMode ? "Edit User" : "Create User"}
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input
                  className="w-full px-3 py-2 border rounded mt-1"
                  placeholder="Enter name"
                  value={editItem.name || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  className="w-full px-3 py-2 border rounded mt-1"
                  placeholder="Ex: example@gmail.com"
                  value={editItem.email || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="text-sm font-medium">Phone</label>
                <input
                  className="w-full px-3 py-2 border rounded mt-1"
                  placeholder="Phone"
                  value={editItem.phone || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Agency</label>
                <input
                  className="w-full px-3 py-2 border rounded mt-1"
                  placeholder="Agency"
                  value={editItem.agency || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, agency: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium">Role</label>
              <select
                className="w-full px-3 py-2 border rounded mt-1"
                value={editItem.role || "user"}
                onChange={(e) =>
                  setEditItem({ ...editItem, role: e.target.value })
                }
              >
                <option value="user">user</option>
                <option value="buyer">buyer</option>
                <option value="owner">owner</option>
                <option value="admin">admin</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md flex-1"
              >
                {isEditMode ? "Save Changes" : "Save"}
              </button>
              <button
                onClick={() => {
                  setShowCreatePopup(false);
                  setIsEditMode(false);
                  setEditItem(null);
                }}
                className="px-4 py-2 bg-gray-300 text-black rounded-md flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Role Popup ---------------- */}
      {showRolePopup && roleEditItem && (
        <div className="flex items-center justify-center z-20 absolute inset-0 bg-opacity-40 backdrop-blur-sm">
          <div className="relative bg-white p-6 rounded shadow w-[400px] max-w-full translate-x-16">
            <h2 className="text-lg font-semibold mb-4">Edit Role</h2>
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Select Role</label>
              <select
                className="w-full px-3 py-2 border rounded mt-1"
                value={roleEditItem.role || "user"}
                onChange={(e) =>
                  setRoleEditItem({ ...roleEditItem, role: e.target.value })
                }
              >
                <option value="user">user</option>
                <option value="buyer">buyer</option>
                <option value="owner">owner</option>
                <option value="seller">seller</option>
                <option value="admin">admin</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRoleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md flex-1"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowRolePopup(false);
                  setRoleEditItem(null);
                }}
                className="px-4 py-2 bg-gray-300 text-black rounded-md flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Delete Confirmation ---------------- */}
      {deleteTarget && (
        <div className="flex items-center justify-center z-50 fixed inset-0 bg-black/30">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">Delete User</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 bg-gray-300 text-black rounded-md flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md flex-1"
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
