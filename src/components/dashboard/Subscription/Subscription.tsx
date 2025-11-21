import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type Feature = {
  title: string;
};

export type Subscription = {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: "USD" | "INR" | "EUR" | "GBP" | "THB" | string;
  percentSave: number;
  numberOfListings: number;
  limitPerAccount: number;
  features: Feature[];
  order: number;
  createdAt: string;
  status: "Active" | "Inactive";
  images?: string[];
};

const STORAGE_KEY = "subscriptions";

// normalize any old data from localStorage (backward compatible)
const normalizeSubscription = (raw: any, idx: number): Subscription => {
  return {
    id: raw.id ?? Date.now() + idx,
    name: raw.name ?? "",
    description: raw.description ?? "",
    price: typeof raw.price === "number" ? raw.price : Number(raw.price || 0),
    currency: raw.currency || "USD",
    percentSave:
      typeof raw.percentSave === "number"
        ? raw.percentSave
        : typeof raw.offer === "number"
        ? raw.offer
        : 0,
    numberOfListings:
      typeof raw.numberOfListings === "number"
        ? raw.numberOfListings
        : Number(raw.numberOfListings || 0),
    limitPerAccount:
      typeof raw.limitPerAccount === "number"
        ? raw.limitPerAccount
        : Number(raw.limitPerAccount || 0),
    features: Array.isArray(raw.features)
      ? raw.features.map((f: any) => ({
          title: typeof f === "string" ? f : f?.title || "",
        }))
      : [],
    order:
      typeof raw.order === "number"
        ? raw.order
        : typeof idx === "number"
        ? idx + 1
        : 1,
    createdAt: raw.createdAt || new Date().toISOString().slice(0, 10),
    status: raw.status === "Inactive" ? "Inactive" : "Active",
    images: Array.isArray(raw.images) ? raw.images : [],
  };
};

const loadSubscriptions = (): Subscription[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const arr = JSON.parse(saved);
      if (Array.isArray(arr)) return arr.map(normalizeSubscription);
    } catch (err) {
      console.error("Failed to parse subscriptions from storage", err);
    }
  }

  // fallback demo data
  const demo: Subscription[] = [
    {
      id: 1,
      name: "Premium Package",
      description: "Premium support, featured & priority placement",
      price: 2500,
      currency: "USD",
      percentSave: 33,
      numberOfListings: 15,
      limitPerAccount: 20,
      features: [
        { title: "15 listings allowed" },
        { title: "20 photos per listing" },
        { title: "Premium support" },
        { title: "Featured listings" },
        { title: "Priority listing placement" },
      ],
      order: 1,
      createdAt: "2025-10-07",
      status: "Active",
      images: [],
    },
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
  return demo;
};

const saveSubscriptions = (subs: Subscription[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
};

const discountedPrice = (price: number, percentSave: number) =>
  Math.round((price - price * (percentSave / 100) + Number.EPSILON) * 100) /
  100;

const SubscriptionPage: React.FC = () => {
  const navigate = useNavigate();

  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() =>
    loadSubscriptions()
  );

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"id" | "name" | "createdAt" | "order">(
    "order"
  );
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Subscription | null>(null);

  useEffect(() => {
    saveSubscriptions(subscriptions);
  }, [subscriptions]);

  const processed = useMemo(() => {
    const lowered = search.trim().toLowerCase();
    let list = subscriptions.filter(
      (s) =>
        s.name.toLowerCase().includes(lowered) ||
        s.description.toLowerCase().includes(lowered) ||
        String(s.id).includes(lowered)
    );

    list = list.sort((a, b) => {
      let cmp = 0;
      if (sortBy === "id") cmp = a.id - b.id;
      else if (sortBy === "name") cmp = a.name.localeCompare(b.name);
      else if (sortBy === "order") cmp = a.order - b.order;
      else cmp = a.createdAt.localeCompare(b.createdAt);
      return sortDir === "asc" ? cmp : -cmp;
    });

    const total = list.length;
    const start = (page - 1) * pageSize;
    const pageItems = list.slice(start, start + pageSize);
    const pages = Math.max(1, Math.ceil(total / pageSize));

    return { total, pages, pageItems };
  }, [subscriptions, search, sortBy, sortDir, page]);

  useEffect(() => {
    if (page > processed.pages) setPage(1);
  }, [processed.pages, page]);

  const toggleSort = (key: "id" | "name" | "createdAt" | "order") => {
    if (sortBy === key) setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  const confirmDelete = (item: Subscription) => {
    setDeleteTarget(item);
    setShowDeleteConfirm(true);
  };

  const doDelete = () => {
    if (!deleteTarget) return;
    const updated = subscriptions.filter((s) => s.id !== deleteTarget.id);
    setSubscriptions(updated);
    setShowDeleteConfirm(false);
    setDeleteTarget(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search */}
      <div className="flex justify-between">
        <div className="gap-3 mb-4">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 border rounded-xl max-w-xs"
          placeholder="Search by name, id or description…"
        />
        <button
          className="px-4 py-2 border rounded-xl"
          onClick={() => setSearch("")}
        >
          Clear
        </button>
        </div>

        <button
          onClick={() => navigate("create")}
          className="flex mb-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          + Create
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="px-4 py-3 cursor-pointer text-left"
                onClick={() => toggleSort("order")}
              >
                Order {sortBy === "order" && (sortDir === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="px-4 py-3 cursor-pointer text-left"
                onClick={() => toggleSort("id")}
              >
                ID {sortBy === "id" && (sortDir === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="px-4 py-3 cursor-pointer text-left"
                onClick={() => toggleSort("name")}
              >
                Name {sortBy === "name" && (sortDir === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">% Save</th>
              <th className="px-4 py-3 text-left">Listings</th>
              <th className="px-4 py-3 text-left">Limit/Account</th>
              <th
                className="px-4 py-3 cursor-pointer text-left"
                onClick={() => toggleSort("createdAt")}
              >
                Created {sortBy === "createdAt" && (sortDir === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {processed.pageItems.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{s.order}</td>
                <td className="px-4 py-3">{s.id}</td>
                <td className="px-4 py-3">{s.name}</td>
                <td className="px-4 py-3">
                  {s.currency} {s.price.toLocaleString()}
                  <div className="text-xs text-gray-500">
                    After discount:{" "}
                    {s.currency}{" "}
                    {discountedPrice(s.price, s.percentSave).toLocaleString()}
                  </div>
                </td>
                <td className="px-4 py-3">{s.percentSave}%</td>
                <td className="px-4 py-3">{s.numberOfListings}</td>
                <td className="px-4 py-3">{s.limitPerAccount}</td>
                <td className="px-4 py-3">{s.createdAt}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-xl text-xs text-white ${
                      s.status === "Active" ? "bg-green-500" : "bg-gray-500"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`edit/${s.id}`, { state: s })
                      }
                      className="px-3 py-1 bg-blue-400 text-white rounded-xl text-xs hover:bg-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(s)}
                      className="px-3 py-1 bg-red-500 text-white rounded-xl text-xs hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {processed.total === 0 && (
              <tr>
                <td
                  colSpan={10}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No subscriptions found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="p-4 flex justify-between text-sm text-gray-700">
          <div>
            Showing {processed.pageItems.length} of {processed.total}
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="border px-3 py-1 rounded-xl disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              {page} / {processed.pages}
            </span>
            <button
              disabled={page === processed.pages}
              onClick={() =>
                setPage((p) => Math.min(processed.pages, p + 1))
              }
              className="border px-3 py-1 rounded-xl disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteConfirm && deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-2">
              Delete Subscription
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete{" "}
              <strong>{deleteTarget.name}</strong>? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border rounded-xl hover:bg-gray-100"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
                onClick={doDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;
