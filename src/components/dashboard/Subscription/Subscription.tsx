import React, { useMemo, useState } from "react";

type Subscription = {
  id: number;
  name: string;
  price: number; // base price in USD (or your currency)
  offer: number; // percentage e.g. 20 means 20% off
  description?: string;
  createdAt: string; // YYYY-MM-DD
  status: "Active" | "Inactive";
};

export default function SubscriptionDashboard() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    { id: 5, name: "Premium Package", price: 199, offer: 20, description: "All premium features", createdAt: "2025-10-07", status: "Active" },
    { id: 4, name: "Professional Package", price: 129, offer: 15, description: "For professionals & small teams", createdAt: "2025-10-07", status: "Active" },
    { id: 3, name: "Standard Package", price: 79, offer: 10, description: "Most popular", createdAt: "2025-10-07", status: "Active" },
    { id: 2, name: "Basic Listing", price: 29, offer: 0, description: "Basic listing features", createdAt: "2025-10-07", status: "Active" },
    { id: 1, name: "Free Trial", price: 0, offer: 0, description: "Free limited trial", createdAt: "2025-10-07", status: "Active" },
  ]);

  // --- UI state ---
  const [showModal, setShowModal] = useState(false); // create/edit modal
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<Subscription | null>(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Subscription | null>(null);

  // form state for create/edit
  const [form, setForm] = useState<Partial<Subscription>>({
    name: "",
    price: 0,
    offer: 0,
    description: "",
    status: "Active",
    createdAt: new Date().toISOString().slice(0, 10),
  });

  // search / sort / pagination
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"id" | "name" | "createdAt">("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // --- helpers ---
  const resetForm = () =>
    setForm({
      name: "",
      price: 0,
      offer: 0,
      description: "",
      status: "Active",
      createdAt: new Date().toISOString().slice(0, 10),
    });

  const openCreate = () => {
    resetForm();
    setEditItem(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const openEdit = (sub: Subscription) => {
    setForm({ ...sub });
    setEditItem(sub);
    setIsEditing(true);
    setShowModal(true);
  };

  const saveSubscription = () => {
    if (!form.name || form.name.trim() === "") {
      alert("Name is required");
      return;
    }
    if (form.price == null || Number.isNaN(Number(form.price))) {
      alert("Price must be a number");
      return;
    }
    if (form.offer == null || Number.isNaN(Number(form.offer))) {
      alert("Offer must be a number (percent)");
      return;
    }

    // sanitize
    const payload: Subscription = {
      id: isEditing && editItem ? editItem.id : Date.now(), // unique id
      name: String(form.name).trim(),
      price: Number(form.price),
      offer: Math.max(0, Math.min(100, Number(form.offer))), // clamp 0-100
      description: form.description || "",
      createdAt: form.createdAt || new Date().toISOString().slice(0, 10),
      status: (form.status as "Active" | "Inactive") || "Active",
    };

    if (isEditing && editItem) {
      setSubscriptions((prev) => prev.map((s) => (s.id === editItem.id ? payload : s)));
    } else {
      setSubscriptions((prev) => [payload, ...prev]); // add to top
    }

    setShowModal(false);
    setEditItem(null);
    setIsEditing(false);
    resetForm();
  };

  const confirmDelete = (sub: Subscription) => {
    setDeleteTarget(sub);
    setShowDeleteConfirm(true);
  };

  const doDelete = () => {
    if (!deleteTarget) return;
    setSubscriptions((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    setShowDeleteConfirm(false);
    setDeleteTarget(null);
  };

  // discount calculation helper
  const discountedPrice = (price: number, offer: number) =>
    Math.round((price - (price * (offer / 100)) + Number.EPSILON) * 100) / 100;

  // filtered + sorted + paginated
  const processed = useMemo(() => {
    const lowered = search.trim().toLowerCase();
    let list = subscriptions.filter(
      (s) =>
        s.name.toLowerCase().includes(lowered) ||
        (s.description || "").toLowerCase().includes(lowered) ||
        String(s.id).includes(lowered)
    );

    list = list.sort((a, b) => {
      let cmp = 0;
      if (sortBy === "id") cmp = a.id - b.id;
      else if (sortBy === "name") cmp = a.name.localeCompare(b.name);
      else cmp = a.createdAt.localeCompare(b.createdAt);

      return sortDir === "asc" ? cmp : -cmp;
    });

    const total = list.length;
    const start = (page - 1) * pageSize;
    const pageItems = list.slice(start, start + pageSize);
    const pages = Math.max(1, Math.ceil(total / pageSize));

    return { total, pages, pageItems };
  }, [subscriptions, search, sortBy, sortDir, page]);

  // when subscriptions or search change, ensure current page is valid
  React.useEffect(() => {
    if (page > processed.pages) setPage(1);
  }, [processed.pages, page]);

  // toggle sort helper
  const toggleSort = (key: "id" | "name" | "createdAt") => {
    if (sortBy === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Subscriptions</h1>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name, id or description..."
            className="w-full md:w-64 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={() => {
              setSearch("");
              setPage(1);
            }}
            className="px-4 py-2 border rounded-xl hover:bg-gray-100"
          >
            Clear
          </button>

          <button
            onClick={openCreate}
            className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            + Create
          </button>
        </div>
      </div>

      {/* table */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer" onClick={() => toggleSort("id")}>
                ID {sortBy === "id" ? (sortDir === "asc" ? "▲" : "▼") : null}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer" onClick={() => toggleSort("name")}>
                Name {sortBy === "name" ? (sortDir === "asc" ? "▲" : "▼") : null}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Offer</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Discounted</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer" onClick={() => toggleSort("createdAt")}>
                Created At {sortBy === "createdAt" ? (sortDir === "asc" ? "▲" : "▼") : null}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Operations</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {processed.pageItems.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{s.id}</td>
                <td className="px-6 py-4">{s.name}</td>
                <td className="px-6 py-4">${s.price.toFixed(2)}</td>
                <td className="px-6 py-4">{s.offer}%</td>
                <td className="px-6 py-4">${discountedPrice(s.price, s.offer).toFixed(2)}</td>
                <td className="px-6 py-4">{s.createdAt}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-xl text-xs text-white ${s.status === "Active" ? "bg-green-500" : "bg-gray-500"}`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => openEdit(s)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded-xl hover:bg-yellow-500 text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(s)}
                    className="px-3 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600 text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {processed.total === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                  No subscriptions found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* footer: summary & pagination */}
        <div className="flex items-center justify-between px-6 py-3 text-sm text-gray-600">
          <div>Showing {processed.pageItems.length} of {processed.total} subscriptions</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 border rounded-xl disabled:opacity-50"
              disabled={page === 1}
            >
              Prev
            </button>
            <span>Page {page} / {processed.pages}</span>
            <button
              onClick={() => setPage((p) => Math.min(processed.pages, p + 1))}
              className="px-3 py-1 border rounded-xl disabled:opacity-50"
              disabled={page === processed.pages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setShowModal(false);
                setIsEditing(false);
                setEditItem(null);
              }}
            >
              ✕
            </button>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">{isEditing ? "Edit Subscription" : "Create Subscription"}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Name</label>
                <input
                  name="name"
                  value={form.name || ""}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. Premium Package"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Price (USD)</label>
                <input
                  name="price"
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.price ?? 0}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Offer (%)</label>
                <input
                  name="offer"
                  type="number"
                  min={0}
                  max={100}
                  value={form.offer ?? 0}
                  onChange={(e) => setForm({ ...form, offer: Math.max(0, Math.min(100, Number(e.target.value))) })}
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Created At</label>
                <input
                  name="createdAt"
                  type="date"
                  value={form.createdAt || new Date().toISOString().slice(0, 10)}
                  onChange={(e) => setForm({ ...form, createdAt: e.target.value })}
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="md:col-span-2 flex flex-col">
                <label className="text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description || ""}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Short description of subscription features"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={form.status || "Active"}
                  onChange={(e) => setForm({ ...form, status: e.target.value as "Active" | "Inactive" })}
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              {/* Live discount preview */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Discount Preview</label>
                <div className="border border-gray-200 rounded-xl px-3 py-2 bg-gray-50">
                  <div className="text-sm text-gray-600">Base: ${Number(form.price ?? 0).toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Offer: {Number(form.offer ?? 0)}%</div>
                  <div className="text-sm font-medium mt-2">After Discount: ${discountedPrice(Number(form.price ?? 0), Number(form.offer ?? 0)).toFixed(2)}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setIsEditing(false);
                  setEditItem(null);
                }}
                className="border border-gray-300 rounded-xl px-6 py-2 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={() => saveSubscription()}
                className="bg-blue-600 text-white rounded-xl px-6 py-2 hover:bg-blue-700"
              >
                {isEditing ? "Update Subscription" : "Save Subscription"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {showDeleteConfirm && deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Delete Subscription</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteTarget(null);
                }}
                className="px-4 py-2 rounded-xl border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={doDelete}
                className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
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
