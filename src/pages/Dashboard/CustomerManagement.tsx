import React, { useState } from "react";

export default function CustomerManagement() {
  const [selected, setSelected] = useState<string[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showRolePopup, setShowRolePopup] = useState(false);
  const [roleEditItem, setRoleEditItem] = useState<any>(null);

  const [data, setData] = useState([
    {
      id: "1",
      username: "Alex",
      email: "ferry.hor@emmerich.com",
      phone: "9898989898",
      role: "Admin",
      created: "2025-10-22",
      status: "Activated",
      isSuper: true,
    },
    {
      id: "2",
      username: "Lorna Mark",
      email: "lorna@example.com",
      phone: "9999999999",
      role: "Member",
      created: "2025-10-25",
      status: "Activated",
      isSuper: false,
    },
  ]);

  const [showBulk, setShowBulk] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [bulkValues, setBulkValues] = useState({
    username: "",
    email: "",
    status: "",
    created: "",
  });

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleBulkApply = () => {
    const updated = data.map((item) => {
      if (selected.includes(item.id)) {
        return {
          ...item,
          username: bulkValues.username || item.username,
          email: bulkValues.email || item.email,
          status: bulkValues.status || item.status,
          created: bulkValues.created || item.created,
        };
      }
      return item;
    });

    setData(updated);
    setShowBulk(false);
  };

  const handleDelete = () => {
    setData(data.filter((item) => !selected.includes(item.id)));
    setSelected([]);
  };

  const handleEditSave = () => {
    const updated = data.map((item) =>
      item.id === editItem.id ? editItem : item
    );
    setData(updated);
    setEditItem(null);
  };

  return (
    <div className="w-full p-6 bg-white">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-3 relative">
          <button
            onClick={() => setShowBulk(!showBulk)}
            className="px-4 py-2 bg-white border rounded-md"
          >
            Bulk Actions
          </button>

          {/* BULK DROPDOWN */}
          {/* {showBulk && (
            <div className="absolute top-12 left-0 bg-white border rounded-md shadow-md w-64 p-3 z-20">
              <h3 className="font-semibold mb-2">Bulk Change</h3>

              <input
                placeholder="Username"
                className="w-full mb-2 px-2 py-1 border rounded"
                onChange={(e) =>
                  setBulkValues({ ...bulkValues, username: e.target.value })
                }
              />
              <input
                placeholder="Email"
                className="w-full mb-2 px-2 py-1 border rounded"
                onChange={(e) =>
                  setBulkValues({ ...bulkValues, email: e.target.value })
                }
              />
              <input
                placeholder="Status"
                className="w-full mb-2 px-2 py-1 border rounded"
                onChange={(e) =>
                  setBulkValues({ ...bulkValues, status: e.target.value })
                }
              />
              <input
                placeholder="Created At"
                className="w-full mb-2 px-2 py-1 border rounded"
                onChange={(e) =>
                  setBulkValues({ ...bulkValues, created: e.target.value })
                }
              />

              <button
                onClick={handleBulkApply}
                className="w-full bg-blue-600 text-white py-1 rounded"
              >
                Apply
              </button>

              <hr className="my-3" />

              <h3 className="font-semibold mb-2 text-red-600">Delete</h3>
              <button
                onClick={handleDelete}
                className="w-full bg-red-600 text-white py-1 rounded"
              >
                Delete Selected
              </button>
            </div>
          )} */}

          <button className="px-4 py-2 border rounded-md">Filters</button>
          <input
            placeholder="Search..."
            className="w-64 px-3 py-2 border rounded-md"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowCreatePopup(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            + Create
          </button>
          <button
            className="px-4 py-2 border rounded-md"
            onClick={() => window.location.reload()}
          >
            🗘Reload
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
              <th className="p-3 text-left">USERNAME</th>
              <th className="p-3 text-left">EMAIL</th>
              <th className="p-3 text-left">PHONE</th>
              <th className="p-3 text-left">ROLE</th>
              <th className="p-3 text-left">CREATED AT</th>
              <th className="p-3 text-left">STATUS</th>
              <th className="p-3 text-left">IS SUPER?</th>
              <th className="p-3 text-left">OPERATIONS</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(row.id)}
                    onChange={() => toggleSelect(row.id)}
                  />
                </td>

                <td className="p-3">{row.username}</td>
                <td className="p-3">{row.email}</td>
                <td className="p-3">{row.phone}</td>
                <td
                  className="p-3 text-blue-600 cursor-pointer underline"
                  onClick={() => {
                    setRoleEditItem({ ...row }); // current user
                    setShowRolePopup(true);
                  }}
                >
                  {row.role}
                </td>

                <td className="p-3">{row.created}</td>

                <td className="p-3">
                  <span className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs">
                    {row.status}
                  </span>
                </td>

                <td className="p-3">
                  <span className="px-3 py-1 bg-green-500 text-white rounded-md text-xs">
                    {row.isSuper ? "Yes" : "No"}
                  </span>
                </td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => setData(data.filter((i) => i.id !== row.id))}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md text-xs"
                  >
                    Remove super
                  </button>

                  <button
                    onClick={() => {
                      setEditItem({ ...row }); // Fill popup with selected row
                      setIsEditMode(true); // Enable edit mode
                      setShowCreatePopup(true); // Open popup
                    }}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs"
                  >
                    ✎
                  </button>

                  <button
                    onClick={() => setData(data.filter((i) => i.id !== row.id))}
                    className="px-3 py-1 bg-red-500 text-white rounded-md text-xs"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-4 text-gray-600 text-sm flex items-center gap-2">
          <span>
            🌐 Show from {data.length} to {data.length} in
          </span>
          <span className="bg-gray-200 px-2 rounded">{data.length}</span>
          <span>records</span>
        </div>
      </div>

      {/* CREATE POPUP */}
      {showCreatePopup && (
        <div className="flex items-center justify-center z-20 absolute inset-0 bg-opacity-40 backdrop-blur-sm">
          <div className="relative bg-white p-6 rounded shadow w-[700px] max-w-full translate-x-16">
            <h2 className="text-lg font-semibold mb-4">
              {isEditMode ? "Edit User" : "Create User"}
            </h2>

            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="text-sm font-medium">First Name</label>
                <input
                  className="w-full px-3 py-2 border rounded mt-1"
                  placeholder="Enter first name"
                  value={editItem?.firstName || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, firstName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Last Name</label>
                <input
                  className="w-full px-3 py-2 border rounded mt-1"
                  placeholder="Enter last name"
                  value={editItem?.lastName || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, lastName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Username & Email */}
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="text-sm font-medium">Username</label>
                <input
                  className="w-full px-3 py-2 border rounded mt-1"
                  placeholder="Enter username"
                  value={editItem?.username || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, username: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  className="w-full px-3 py-2 border rounded mt-1"
                  placeholder="Ex: example@gmail.com"
                  value={editItem?.email || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label className="text-sm font-medium">Phone</label>
              <div className="flex gap-2 mt-1">
                <span className="px-3 py-2 border rounded bg-gray-100">
                  +91
                </span>
                <input
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Phone"
                  value={editItem?.phone || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, phone: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password & Re-type Password */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded mt-1"
                  placeholder="Enter password"
                  value={editItem?.password || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, password: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Re-type Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded mt-1"
                  placeholder="Re-type password"
                  value={editItem?.repassword || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, repassword: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (isEditMode) {
                    // UPDATE existing user
                    setData((prev) =>
                      prev.map((user) =>
                        user.id === editItem.id
                          ? { ...user, ...editItem }
                          : user
                      )
                    );
                  } else {
                    // CREATE new user
                    const newUser = {
                      id: (data.length + 1).toString(),
                      username: editItem?.username || "",
                      email: editItem?.email || "",
                      phone: editItem?.phone || "",
                      role: "Member",
                      created: new Date().toISOString().split("T")[0],
                      status: "Activated",
                      isSuper: false,
                    };
                    setData([...data, newUser]);
                  }

                  setEditItem(null);
                  setIsEditMode(false);
                  setShowCreatePopup(false);
                }}
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

      {/* Role Popup*/}
      {showRolePopup && (
        <div className="flex items-center justify-center z-20 absolute inset-0 bg-opacity-40 backdrop-blur-sm">
          <div className="relative bg-white p-6 rounded shadow w-[400px] max-w-full translate-x-16">
            <h2 className="text-lg font-semibold mb-4">Edit Role</h2>

            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">
                Select Role
              </label>
              <select
                className="w-full px-3 py-2 border rounded mt-1"
                value={roleEditItem?.role || "Member"}
                onChange={(e) =>
                  setRoleEditItem({ ...roleEditItem, role: e.target.value })
                }
              >
                <option value="Admin">Admin</option>
                <option value="Member">Member</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  // Update role in data
                  setData((prev) =>
                    prev.map((user) =>
                      user.id === roleEditItem.id
                        ? { ...user, role: roleEditItem.role }
                        : user
                    )
                  );
                  setShowRolePopup(false);
                  setRoleEditItem(null);
                }}
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
    </div>
  );
}
