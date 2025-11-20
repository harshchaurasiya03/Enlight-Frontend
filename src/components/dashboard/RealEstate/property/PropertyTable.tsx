// src/components/PropertyTable.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/store";
import {
  fetchProperties,
  deletePropertyById,
} from "../../../../redux/actions/propertiesAction";
import PropertyFormModal from "./PropertyFormModal";
import { Property } from "../../../../types/Property";
import { format } from "date-fns";

export default function PropertyTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { properties, loading } = useSelector((s: RootState) => s.properties);

  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Partial<Property> | null>(null);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    dispatch(fetchProperties() as any);
  }, [dispatch]);

  const toggleExpand = (id: string) => {
    setExpandedIds((p) => ({ ...p, [id]: !p[id] }));
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this property?")) return;
    dispatch(deletePropertyById(id) as any);
  };

  const filtered = properties.filter((p) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      p.title?.toLowerCase().includes(q) ||
      p.city?.toLowerCase().includes(q) ||
      p.propertyId?.toLowerCase().includes(q) ||
      p.slug?.toLowerCase().includes(q)
    );
  });

  const ASSET_URL = import.meta.env.VITE_ASSET_URL || "";

const getMediaUrl = (url?: string) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `${ASSET_URL}${url}`;
};


  return (
    <div className="p-6">
      <div className="flex justify-between gap-3 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title / city / propertyId"
          className="border px-3 py-2 rounded-lg w-80"
        />
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditingProperty(null);
              setOpenModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Create
          </button>
          <button
            onClick={() => dispatch(fetchProperties() as any)}
            className="border px-4 py-2 rounded-lg"
          >
            Reload
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">City</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Owner</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <React.Fragment key={p._id}>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3">{p.propertyId || p._id}</td>
                    <td className="p-3">
                      <img
                      src={getMediaUrl(p.images?.[0]?.url) || "/images/property-placeholder.jpeg"}
                        alt={p.title}
                        className="w-20 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-3">{p.title}</td>
                    <td className="p-3">{p.city}</td>
                    <td className="p-3">₹{p.price?.toLocaleString()}</td>
                    <td className="p-3">{p.status}</td>
                    <td className="p-3">{p.owner?.name || p.owner?.email}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => {
                          setEditingProperty(p);
                          setOpenModal(true);
                        }}
                        className="px-3 py-1 rounded bg-yellow-400 text-white"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="px-3 py-1 rounded bg-red-500 text-white"
                      >
                        🗑
                      </button>
                      <button
                        onClick={() => toggleExpand(p._id)}
                        className="px-3 py-1 rounded bg-gray-200"
                      >
                        {expandedIds[p._id] ? "▲" : "▼"}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded row */}
                  {expandedIds[p._id] && (
                    <tr className="bg-gray-50">
                      <td colSpan={8} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Left Column */}
                          <div className="space-y-2">
                            <div>
                              <strong>Description:</strong>
                              <p>{p.description}</p>
                            </div>

                            <div>
                              <strong>Address:</strong>
                              <p>{p.address}</p>
                            </div>
                            <div>
                              <strong>City/State:</strong>
                              <p>{p.city}, {p.state}</p>
                            </div>
                            
                            <div>
                              <strong>Country:</strong>
                              <p>{p.country}</p>
                            </div>

                            <div>
                              <strong>Features:</strong>
                              <ul className="list-disc ml-6">
                                <li>BHK: {p.features?.BHK ?? "-"}</li>
                                <li>Area: {p.features?.area ?? "-"} sq.ft</li>
                                <li>Parking: {p.features?.parking ? "Yes" : "No"}</li>
                                <li>Furnished: {p.features?.furnished ?? "-"}</li>
                                <li>Bathrooms: {p.features?.bathrooms ?? "-"}</li>
                                <li>Balconies: {p.features?.balconies ?? "-"}</li>
                              </ul>
                            </div>

                            <div>
                              <strong>Amenities:</strong>
                              <div className="flex gap-2 flex-wrap mt-2">
                                {p.amenities?.length ? (
                                  p.amenities.map((a) => (
                                    <span key={a} className="px-2 py-1 bg-blue-100 rounded text-xs">
                                      {a}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-sm text-gray-500">No amenities</span>
                                )}
                              </div>
                            </div>

                            <div>
                              <strong>Media:</strong>
                              <div className="flex gap-2 mt-2">
                                {p.images?.length ? (
                                  p.images.map((im, idx) => (
                                    <img
                                      key={idx}
                                      src={getMediaUrl(im.url)}
                                      alt={`img-${idx}`}
                                      className="w-28 h-20 object-cover rounded"
                                    />
                                  ))
                                ) : (
                                  <span>No images</span>
                                )}
                                {p.videos?.length ? (
                                  p.videos.map((v, idx) => (
                                    <video
                                      key={idx}
                                      src={getMediaUrl(v.url)}
                                      className="w-40 h-24 object-cover rounded"
                                      controls
                                    />
                                  ))
                                ) : null}
                              </div>
                            </div>
                          </div>

                          {/* Right Column */}
                          <div className="space-y-2">
                            <div>
                              <strong>Property ID:</strong> {p.propertyId}
                            </div>
                            <div>
                              <strong>Type:</strong> {p.propertyType}
                            </div>
                            <div>
                              <strong>Available From:</strong>{" "}
                              {p.availableFrom ? format(new Date(p.availableFrom), "yyyy-MM-dd") : "-"}
                            </div>
                            <div>
                              <strong>Owner:</strong>
                              <div>{p.owner?.name}</div>
                              <div className="text-sm text-gray-600">{p.owner?.email}</div>
                            </div>
                            <div>
                              <strong>Geo (lng, lat):</strong>
                              <div>{p.location?.coordinates ? `${p.location.coordinates[0]}, ${p.location.coordinates[1]}` : "-"}</div>
                            </div>
                            <div>
                              <strong>Slug:</strong> {p.slug}
                            </div>
                            <div>
                              <strong>Created At:</strong>{" "}
                              {p.createdAt ? format(new Date(p.createdAt), "yyyy-MM-dd HH:mm") : "-"}
                            </div>
                            <div>
                              <strong>Updated At:</strong>{" "}
                              {p.updatedAt ? format(new Date(p.updatedAt), "yyyy-MM-dd HH:mm") : "-"}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <PropertyFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        initial={editingProperty || undefined}
      />
    </div>
  );
}
