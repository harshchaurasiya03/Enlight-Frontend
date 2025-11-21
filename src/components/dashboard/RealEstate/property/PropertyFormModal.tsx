// src/components/PropertyFormModal.tsx
import React, { useEffect, useState } from "react";
import { Property } from "../../../../types/Property";
import { useDispatch } from "react-redux";
import {
  createProperty,
  patchProperty,
} from "../../../../redux/actions/propertiesAction";
import { AppDispatch } from "../../../../redux/store";

type Props = {
  open: boolean;
  onClose: () => void;
  initial?: Partial<Property & { latitude?: number; longitude?: number }>;
};

const AMENITIES = [
  "Gym",
  "Swimming Pool",
  "Lift",
  "Security",
  "Power Backup",
  "Garden",
  "Club House",
  "Play Area",
];

const PROPERTY_TYPES = [
  "Apartment",
  "House",
  "Villa",
  "Plot",
  "Commercial",
  "Other",
];

export default function PropertyFormModal({
  open,
  onClose,
  initial = {},
}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  // Basic fields
  const [title, setTitle] = useState(initial.title || "");
  const [description, setDescription] = useState(initial.description || "");
  const [address, setAddress] = useState(initial.address || "");
  const [city, setCity] = useState(initial.city || "");
  const [stateVal, setStateVal] = useState(initial.state || "");
  const [country, setCountry] = useState(initial.country || "India");
  const [price, setPrice] = useState<number | "">(initial.price ?? "");
  const [propertyType, setPropertyType] = useState(
    (initial.propertyType as string) || PROPERTY_TYPES[0]
  );
  const [status, setStatus] = useState(
    (initial.status as string) || "For Sale"
  );

  // Features (separate fields)
  const [BHK, setBHK] = useState<number | "">(initial.features?.BHK ?? "");
  const [area, setArea] = useState<number | "">(initial.features?.area ?? "");
  const [parking, setParking] = useState<boolean>(
    initial.features?.parking ?? false
  );
  const [furnished, setFurnished] = useState<string>(
    initial.features?.furnished ?? "Unfurnished"
  );
  const [bathrooms, setBathrooms] = useState<number | "">(
    initial.features?.bathrooms ?? ""
  );
  const [balconies, setBalconies] = useState<number | "">(
    initial.features?.balconies ?? ""
  );

  // Amenities (multi-select)
  const [amenities, setAmenities] = useState<string[]>(
    (initial.amenities as string[]) ?? []
  );

  const [extraInfo, setExtraInfo] = useState<{ key: string; value: string }[]>(
    []
  );

  const [newAmenity, setNewAmenity] = useState("");

  // Geo
  const [latitude, setLatitude] = useState<number | "">(
    initial.location?.coordinates ? initial.location.coordinates[1] : ""
  );
  const [longitude, setLongitude] = useState<number | "">(
    initial.location?.coordinates ? initial.location.coordinates[0] : ""
  );

  // Media - existing / new
  // existing images/videos: array of { url, public_id } as backend returns
  const [existingImages, setExistingImages] = useState<
    { url?: string; public_id?: string }[]
  >(initial.images ?? []);
  const [existingVideos, setExistingVideos] = useState<
    { url?: string; public_id?: string }[]
  >(initial.videos ?? []);

  // new uploads
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [newVideos, setNewVideos] = useState<File[]>([]);
  const [newVideoPreviews, setNewVideoPreviews] = useState<string[]>([]);

  // removed existing
  const [removeImageIds, setRemoveImageIds] = useState<string[]>([]);
  const [removeVideoIds, setRemoveVideoIds] = useState<string[]>([]);

  const isEditMode = Boolean(initial && initial._id);

  useEffect(() => {
    if (!open) return;

    // populate form only ONCE when modal opens
    const init = initial || {};

    setTitle(init.title || "");
    setDescription(init.description || "");
    setAddress(init.address || "");
    setCity(init.city || "");
    setStateVal(init.state || "");
    setCountry(init.country || "India");
    setPrice(init.price ?? "");
    setPropertyType(init.propertyType || "Apartment");
    setStatus(init.status || "For Sale");

    setBHK(init.features?.BHK ?? "");
    setArea(init.features?.area ?? "");
    setParking(init.features?.parking ?? false);
    setFurnished(init.features?.furnished ?? "Unfurnished");
    setBathrooms(init.features?.bathrooms ?? "");
    setBalconies(init.features?.balconies ?? "");

    setAmenities(init.amenities ?? []);

    setLatitude(init.location?.coordinates?.[1] ?? "");
    setLongitude(init.location?.coordinates?.[0] ?? "");

    setExistingImages(init.images ?? []);
    setExistingVideos(init.videos ?? []);

    setNewImages([]);
    setNewImagePreviews([]);
    setNewVideos([]);
    setNewVideoPreviews([]);
    setRemoveImageIds([]);
    setRemoveVideoIds([]);
    setExtraInfo(
      init.extraInfo
        ? Object.entries(init.extraInfo).map(([key, value]) => ({
            key,
            value: String(value),
          }))
        : []
    );
  }, [open]);

  // helper: toggle amenity
  const toggleAmenity = (a: string) => {
    setAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  };

  // handle new image files
  const onImagesPicked = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);
    setNewImages((prev) => [...prev, ...arr]);
    setNewImagePreviews((prev) => [
      ...prev,
      ...arr.map((f) => URL.createObjectURL(f)),
    ]);
  };

  // handle new video files
  const onVideosPicked = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);
    setNewVideos((prev) => [...prev, ...arr]);
    setNewVideoPreviews((prev) => [
      ...prev,
      ...arr.map((f) => URL.createObjectURL(f)),
    ]);
  };

  // remove existing image (mark for removal)
  const removeExistingImage = (idx: number) => {
    const img = existingImages[idx];
    if (img?.public_id) setRemoveImageIds((s) => [...s, img.public_id!]);
    setExistingImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const removeExistingVideo = (idx: number) => {
    const v = existingVideos[idx];
    if (v?.public_id) setRemoveVideoIds((s) => [...s, v.public_id!]);
    setExistingVideos((prev) => prev.filter((_, i) => i !== idx));
  };

  // remove newly added image
  const removeNewImage = (idx: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== idx));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const removeNewVideo = (idx: number) => {
    setNewVideos((prev) => prev.filter((_, i) => i !== idx));
    setNewVideoPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const buildAndSendForm = () => {
    const fd = new FormData();

    // required fields; send as strings so backend gets consistent shape
    fd.append("title", title || "");
    fd.append("description", description || "");
    fd.append("address", address || "");
    fd.append("city", city || "");
    fd.append("state", stateVal || "");
    fd.append("country", country || "");
    fd.append("price", String(price || ""));
    fd.append("propertyType", propertyType || "");
    fd.append("status", status || "");

    // features - match curl: features[BHK], features[area], ...
    fd.append("features[BHK]", String(BHK || ""));
    fd.append("features[area]", String(area || ""));
    fd.append("features[parking]", String(parking));
    fd.append("features[furnished]", furnished || "Unfurnished");
    fd.append("features[bathrooms]", String(bathrooms || ""));
    fd.append("features[balconies]", String(balconies || ""));

    // amenities[] - append each
    if (amenities.length === 0) {
      // append empty to avoid missing keys if backend expects it
      // but most servers can handle missing arrays; still we send nothing in that case.
    } else {
      amenities.forEach((a) => fd.append("amenities[]", a));
    }

    extraInfo.forEach((item) => {
      if (item.key && item.value) {
        fd.append(`extraInfo[${item.key}]`, item.value);
      }
    });

    // existing images/videos: send their public_id so backend can keep them if needed
    // Many backends ignore this; we include to be safe.
    existingImages.forEach((img) => {
      if (img.public_id) fd.append("existingImages[]", img.public_id);
      else if (img.url) fd.append("existingImages[]", img.url);
    });
    existingVideos.forEach((v) => {
      if (v.public_id) fd.append("existingVideos[]", v.public_id);
      else if (v.url) fd.append("existingVideos[]", v.url);
    });

    // removal arrays
    removeImageIds.forEach((id) => fd.append("removeImages[]", id));
    removeVideoIds.forEach((id) => fd.append("removeVideos[]", id));

    // new media files
    newImages.forEach((file) => fd.append("images", file));
    newVideos.forEach((file) => fd.append("videos", file));

    // location
    if (latitude !== "" && longitude !== "") {
      fd.append("location[latitude]", String(latitude));
      fd.append("location[longitude]", String(longitude));
    } else {
      // send empty? not necessary; include nothing if not provided
    }

    // Send via redux actions
    if (isEditMode && initial._id) {
      dispatch(patchProperty(initial._id, fd) as any);
    } else {
      dispatch(createProperty(fd) as any);
    }

    onClose();
  };

  const ASSET_URL = import.meta.env.VITE_ASSET_URL || "";

  const getMediaUrl = (url?: string) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `${ASSET_URL}${url}`;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
        <h3 className="text-xl font-semibold mb-4">
          {isEditMode ? "Edit Property" : "Create Property"}
        </h3>

        {/* Basic grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border px-3 py-2 rounded-lg"
          />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="border px-3 py-2 rounded-lg"
          />
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="border px-3 py-2 rounded-lg"
          />
          <input
            value={stateVal}
            onChange={(e) => setStateVal(e.target.value)}
            placeholder="State"
            className="border px-3 py-2 rounded-lg"
          />
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            className="border px-3 py-2 rounded-lg"
          />
          <input
            value={price as any}
            onChange={(e) => setPrice(Number(e.target.value) || "")}
            placeholder="Price"
            type="number"
            className="border px-3 py-2 rounded-lg"
          />
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          >
            {PROPERTY_TYPES.map((pt) => (
              <option key={pt} value={pt}>
                {pt}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
            <option value="Sold">Sold</option>
          </select>
        </div>

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full mt-3 border px-3 py-2 rounded-lg"
          rows={4}
        />

        {/* Features */}
        <div className="mt-3 p-3 border rounded-lg">
          <h4 className="font-medium mb-2">Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <input
              type="number"
              value={BHK as any}
              onChange={(e) => setBHK(Number(e.target.value) || "")}
              placeholder="BHK"
              className="border px-3 py-2 rounded-lg"
            />
            <input
              type="number"
              value={area as any}
              onChange={(e) => setArea(Number(e.target.value) || "")}
              placeholder="Area (sq.ft)"
              className="border px-3 py-2 rounded-lg"
            />
            <input
              type="number"
              value={bathrooms as any}
              onChange={(e) => setBathrooms(Number(e.target.value) || "")}
              placeholder="Bathrooms"
              className="border px-3 py-2 rounded-lg"
            />
            <input
              type="number"
              value={balconies as any}
              onChange={(e) => setBalconies(Number(e.target.value) || "")}
              placeholder="Balconies"
              className="border px-3 py-2 rounded-lg"
            />

            <div className="flex items-center gap-2">
              <label className="mr-2">Parking</label>
              <input
                type="checkbox"
                checked={parking}
                onChange={(e) => setParking(e.target.checked)}
              />
            </div>

            <select
              value={furnished}
              onChange={(e) => setFurnished(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            >
              <option value="Furnished">Furnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
          </div>
        </div>

        {/* Amenities multi-select */}
        <div className="mt-3">
          <h4 className="font-medium mb-2">Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {/* Predefined Amenities */}
            {AMENITIES.map((a) => {
              const active = amenities.includes(a);
              return (
                <button
                  key={a}
                  onClick={() => toggleAmenity(a)}
                  type="button"
                  className={`px-3 py-1 rounded-full border ${
                    active ? "bg-blue-600 text-white" : "bg-white"
                  }`}
                >
                  {a}
                </button>
              );
            })}

            {/* Custom-added Amenities */}
            {amenities
              .filter((a) => !AMENITIES.includes(a))
              .map((custom) => (
                <button
                  key={custom}
                  onClick={() => toggleAmenity(custom)}
                  type="button"
                  className="px-3 py-1 rounded-full border bg-purple-500 text-white"
                >
                  {custom}
                </button>
              ))}

            <input
              value={newAmenity}
              onChange={(e) => setNewAmenity(e.target.value)}
              placeholder="Add custom amenity (e.g. Private Pool, Rooftop Garden)"
              className="border px-3 py-1 rounded-lg flex-1"
            />

            <button
              onClick={() => {
                const trimmed = newAmenity.trim();
                if (trimmed && !amenities.includes(trimmed)) {
                  setAmenities((prev) => [...prev, trimmed]);
                }
                setNewAmenity("");
              }}
              className="bg-blue-600 text-white px-3 rounded-lg"
            >
              Add
            </button>
          </div>
        </div>

        {/* Extra Custom Fields */}
        <div className="mt-4 p-3 border rounded-lg">
          <h4 className="font-medium mb-2">Extra Fields (Custom)</h4>

          {extraInfo.map((item, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                value={item.key}
                onChange={(e) =>
                  setExtraInfo((prev) =>
                    prev.map((x, i) =>
                      i === idx ? { ...x, key: e.target.value } : x
                    )
                  )
                }
                placeholder="Field Name (e.g. flooring)"
                className="border px-3 py-2 rounded-lg flex-1"
              />
              <input
                value={item.value}
                onChange={(e) =>
                  setExtraInfo((prev) =>
                    prev.map((x, i) =>
                      i === idx ? { ...x, value: e.target.value } : x
                    )
                  )
                }
                placeholder="Value (e.g. Marble)"
                className="border px-3 py-2 rounded-lg flex-1"
              />
              <button
                onClick={() =>
                  setExtraInfo((prev) => prev.filter((_, i) => i !== idx))
                }
                className="bg-red-500 text-white px-3 py-1 rounded-lg"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            onClick={() =>
              setExtraInfo((prev) => [...prev, { key: "", value: "" }])
            }
            className="mt-2 bg-green-600 text-white px-3 py-1 rounded-lg"
          >
            + Add Field
          </button>
        </div>

        {/* Location */}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
          <input
            value={latitude as any}
            onChange={(e) => setLatitude(Number(e.target.value) || "")}
            placeholder="Latitude"
            className="border px-3 py-2 rounded-lg"
          />
          <input
            value={longitude as any}
            onChange={(e) => setLongitude(Number(e.target.value) || "")}
            placeholder="Longitude"
            className="border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Images */}
        <div className="mt-4">
          <h4 className="font-medium mb-2">Images</h4>
          <div className="flex flex-wrap gap-2 mb-2">
            {existingImages.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={getMediaUrl(img.url)}
                  alt={`img-${i}`}
                  className="w-28 h-20 object-cover rounded-lg border"
                />
                <button
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1 text-xs"
                  onClick={() => removeExistingImage(i)}
                  type="button"
                >
                  ✕
                </button>
              </div>
            ))}

            {newImagePreviews.map((src, i) => (
              <div key={`new-${i}`} className="relative">
                <img
                  src={src}
                  alt={`new-${i}`}
                  className="w-28 h-20 object-cover rounded-lg border"
                />
                <button
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1 text-xs"
                  onClick={() => removeNewImage(i)}
                  type="button"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => onImagesPicked(e.target.files)}
            className="border px-3 py-2 rounded-lg w-full"
          />
        </div>

        {/* Videos */}
        <div className="mt-4">
          <h4 className="font-medium mb-2">Videos</h4>
          <div className="flex flex-wrap gap-2 mb-2">
            {existingVideos.map((v, i) => (
              <div key={i} className="relative">
                <video
                  src={getMediaUrl(v.url)}
                  className="w-36 h-24 object-cover rounded-lg border"
                />
                <button
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1 text-xs"
                  onClick={() => removeExistingVideo(i)}
                  type="button"
                >
                  ✕
                </button>
              </div>
            ))}

            {newVideoPreviews.map((src, i) => (
              <div key={`nv-${i}`} className="relative">
                <video
                  src={src}
                  className="w-36 h-24 object-cover rounded-lg border"
                />
                <button
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1 text-xs"
                  onClick={() => removeNewVideo(i)}
                  type="button"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <input
            type="file"
            accept="video/*"
            multiple
            onChange={(e) => onVideosPicked(e.target.files)}
            className="border px-3 py-2 rounded-lg w-full"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={buildAndSendForm}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
          >
            {isEditMode ? "Update Property" : "Create Property"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
