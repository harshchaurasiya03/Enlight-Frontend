import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../../redux/actions/propertiesAction";
import { RootState } from "../../redux/store";

const ASSET_URL = import.meta.env.VITE_ASSET_URL || "";

const getMediaUrl = (url?: string) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `${ASSET_URL}${url}`;
};

export default function AmenitiesHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("View All");

  const { properties, loading } = useSelector(
    (state: RootState) => state.properties
  );

  // Fetch API on mount
  useEffect(() => {
    dispatch(fetchProperties() as any);
  }, [dispatch]);

  // Dynamic tabs from schema enum
  const tabs = [
    "View All",
    "Apartment",
    "House",
    "Villa",
    "Plot",
    "Commercial",
    "Other",
  ];

  // =============================
  // FILTER REAL API PROPERTIES
  // =============================
  const filtered =
    properties
      ?.filter((p) =>
        activeTab === "View All"
          ? true
          : p.propertyType?.toLowerCase() === activeTab.toLowerCase()
      )
      .slice(0, 6) || [];

  return (
    <div className="container px-4 sm:px-6 py-8 mx-auto w-full">
      <h2 className="flex alignItem-center justify-center text-3xl font-semibold mt-10 mb-6">
        Recommended Properties
      </h2>

      {/* Tabs */}
      <div className="flex alignItem-center justify-center gap-3 flex-wrap mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Loader */}
      {loading && <p className="text-center">Loading properties...</p>}

      {/* No Data */}
      {!loading && filtered.length === 0 && (
        <p className="text-center text-gray-500">No properties available.</p>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {filtered.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/propertydeatilspage/${p.slug}`)}
            className="bg-white rounded-2xl shadow border hover:shadow-xl transition cursor-pointer"
          >
            {/* MAIN IMAGE (first image or video fallback) */}
            <div className="w-full h-60">
              {p.images?.length > 0 ? (
                <img
                  src={getMediaUrl(p.images[0].url)}
                  alt={p.title}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
              ) : p.videos?.length > 0 ? (
                <video
                  src={getMediaUrl(p.videos[0].url)}
                  className="w-full h-full object-cover rounded-t-2xl"
                  muted
                  autoPlay
                  loop
                />
              ) : (
                <img
                  src="/images/default-property.jpeg"
                  className="w-full h-full object-cover rounded-t-2xl"
                />
              )}
            </div>

            {/* CONTENT */}
            <div className="p-3">
              <h4 className="font-semibold text-sm">
                {p.title || "Untitled Property"}
              </h4>

              <p className="text-xs text-gray-500">
                {p.city
                  ? `${p.city}, ${p.state || ""}`
                  : p.address || "Unknown Location"}
              </p>

              {/* AMENITIES + AREA */}
              <div className="mt-2 text-xs flex gap-2 flex-wrap">
                {p.amenities?.slice(0, 3).map((a, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 px-2 py-1 rounded text-gray-700"
                  >
                    {a}
                  </span>
                ))}

                {p.features?.area && (
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {p.features.area} sq ft
                  </span>
                )}
              </div>

              <hr className="my-2" />

              {/* OWNER + PRICE */}
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <img
                    src={"/images/investor.avif"} // no owner image in API
                    alt={p.owner?.name || "Owner"}
                    className="w-6 h-8 rounded-full"
                  />
                  <span>{p.owner?.name || "Unknown Owner"}</span>
                </div>

                <span className="font-semibold text-blue-600">
                  ₹{p.price?.toLocaleString()}
                </span>
              </div>
            </div>

            
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/projects")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          View All Properties
        </button>
      </div>
    </div>
  );
}
