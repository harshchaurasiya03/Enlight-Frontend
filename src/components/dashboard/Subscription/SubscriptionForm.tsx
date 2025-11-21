import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { Subscription } from "../Subscription/Subscription";

const STORAGE_KEY = "subscriptions";

const loadSubscriptions = (): Subscription[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];
  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
};

const saveSubscriptions = (subs: Subscription[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
};

const discountedPrice = (price: number, percentSave: number) =>
  Math.round((price - price * (percentSave / 100) + Number.EPSILON) * 100) /
  100;

export default function SubscriptionForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const isEdit = Boolean(params.id);
  const existingFromState = location.state as Subscription | undefined;

  const [allSubs, setAllSubs] = useState<Subscription[]>(() =>
    loadSubscriptions()
  );

  const [form, setForm] = useState<Subscription | null>(null);
  const [newImages, setNewImages] = useState<File[]>([]);

  // initialize form (supports: edit with state, edit via URL, create)
  useEffect(() => {
    if (isEdit) {
      let base: Subscription | undefined = existingFromState;
      if (!base && params.id) {
        const idNum = Number(params.id);
        base = allSubs.find((s) => s.id === idNum);
      }
      if (base) {
        setForm({
          ...base,
          features:
            base.features && base.features.length > 0
              ? base.features
              : [{ title: "" }],
        });
      } else {
        // if no found, create blank for safety
        setForm({
          id: Number(params.id) || Date.now(),
          name: "",
          description: "",
          price: 0,
          currency: "USD",
          percentSave: 0,
          numberOfListings: 0,
          limitPerAccount: 0,
          features: [{ title: "" }],
          order: 1,
          createdAt: new Date().toISOString().slice(0, 10),
          status: "Active",
          images: [],
        });
      }
    } else {
      // create mode
      const maxOrder = allSubs.reduce(
        (max, s) => (s.order && s.order > max ? s.order : max),
        0
      );
      const nextOrder = maxOrder + 1;

      setForm({
        id: Date.now(),
        name: "",
        description: "",
        price: 0,
        currency: "USD",
        percentSave: 0,
        numberOfListings: 0,
        limitPerAccount: 0,
        features: [{ title: "" }],
        order: nextOrder,
        createdAt: new Date().toISOString().slice(0, 10),
        status: "Active",
        images: [],
      });
    }
  }, [isEdit, existingFromState, params.id, allSubs]);

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);
    setNewImages((prev) => [...prev, ...arr]);
  };

  const convertToBase64 = (file: File): Promise<string> =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });

  const handleFeatureChange = (index: number, value: string) => {
    if (!form) return;
    const updated = [...form.features];
    updated[index] = { title: value };
    setForm({ ...form, features: updated });
  };

  const addFeature = () => {
    if (!form) return;
    setForm({ ...form, features: [...form.features, { title: "" }] });
  };

  const removeFeature = (index: number) => {
    if (!form) return;
    const updated = form.features.filter((_, i) => i !== index);
    setForm({
      ...form,
      features: updated.length ? updated : [{ title: "" }],
    });
  };

  const isFormValid = useMemo(() => {
    if (!form) return false;
    return (
      form.name.trim().length > 0 &&
      form.description.trim().length > 0 &&
      form.price > 0 &&
      form.currency.trim().length > 0 &&
      form.percentSave >= 0 &&
      form.percentSave <= 100 &&
      form.numberOfListings > 0 &&
      form.limitPerAccount > 0 &&
      form.features.length > 0 &&
      form.features.every((f) => f.title.trim().length > 0)
    );
  }, [form]);

  const saveSubscription = async () => {
    if (!form) return;
    if (!isFormValid) return;

    let convertedFiles: string[] = [];
    for (const f of newImages) {
      const b64 = await convertToBase64(f);
      convertedFiles.push(b64);
    }

    const finalImages = [...(form.images || []), ...convertedFiles];
    const payload: Subscription = { ...form, images: finalImages };

    let updated: Subscription[];
    if (isEdit) {
      updated = allSubs.map((s) => (s.id === payload.id ? payload : s));
    } else {
      updated = [payload, ...allSubs];
    }

    setAllSubs(updated);
    saveSubscriptions(updated);

    navigate("/dashboard/subscriptions");
  };

  if (!form) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="text-gray-600 text-sm">Loading form…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full bg-white rounded-2xl shadow p-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEdit ? "Edit Subscription" : "Create Subscription"}
          </h2>
          <button
            onClick={() => navigate("/dashboard/subscriptions")}
            className="px-4 py-2 border rounded-xl hover:bg-gray-100 text-sm"
          >
            Back
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-sm">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border rounded-xl px-4 py-2 text-sm"
              placeholder="Premium Package"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-sm">Price</label>
            <input
              type="number"
              value={form.price === 0 ? "" : form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value === "" ? 0 : Number(e.target.value),
                })
              }
              className="border rounded-xl px-4 py-2 text-sm"
              placeholder="2500"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2 flex flex-col">
            <label className="font-medium mb-1 text-sm">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="border rounded-xl px-4 py-2 text-sm"
              placeholder="Short description"
            />
          </div>

          {/* Currency */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-sm">Currency</label>
            <select
              value={form.currency}
              onChange={(e) =>
                setForm({ ...form, currency: e.target.value || "USD" })
              }
              className="border rounded-xl px-4 py-2 text-sm"
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="THB">THB</option>
            </select>
          </div>

          {/* Percent Save */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-sm">Percent save</label>
            <input
              type="number"
              value={form.percentSave === 0 ? "" : form.percentSave}
              onChange={(e) =>
                setForm({
                  ...form,
                  percentSave:
                    e.target.value === ""
                      ? 0
                      : Math.max(0, Math.min(100, Number(e.target.value))),
                })
              }
              className="border rounded-xl px-4 py-2 text-sm"
              placeholder="33"
            />
          </div>

          {/* Number of listings */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-sm">
              Number of listings
            </label>
            <input
              type="number"
              value={form.numberOfListings === 0 ? "" : form.numberOfListings}
              onChange={(e) =>
                setForm({
                  ...form,
                  numberOfListings:
                    e.target.value === "" ? 0 : Number(e.target.value),
                })
              }
              className="border rounded-xl px-4 py-2 text-sm"
              placeholder="15"
            />
          </div>

          {/* Limit purchase by account */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-sm">
              Limit purchase by account
            </label>
            <input
              type="number"
              value={form.limitPerAccount === 0 ? "" : form.limitPerAccount}
              onChange={(e) =>
                setForm({
                  ...form,
                  limitPerAccount:
                    e.target.value === "" ? 0 : Number(e.target.value),
                })
              }
              className="border rounded-xl px-4 py-2 text-sm"
            />

            <span className="text-xs text-gray-500 mt-1">
              An account can purchase x times
            </span>
          </div>

          {/* Order (auto-assigned) */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-sm">Order</label>
            <input
              value={form.order}
              readOnly
              className="border rounded-xl px-4 py-2 text-sm bg-gray-50 text-gray-600"
            />
            <span className="text-xs text-gray-500 mt-1">
              Auto-assigned based on position
            </span>
          </div>

          {/* Created At */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-sm">Created at</label>
            <input
              type="date"
              value={form.createdAt}
              onChange={(e) => setForm({ ...form, createdAt: e.target.value })}
              className="border rounded-xl px-4 py-2 text-sm"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-sm">Status</label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as "Active" | "Inactive",
                })
              }
              className="border rounded-xl px-4 py-2 text-sm"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Features */}
          <div className="md:col-span-2 flex flex-col border rounded-2xl p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-sm">Features</h3>
              <button
                type="button"
                onClick={addFeature}
                className="text-xs px-3 py-1 rounded-xl border hover:bg-white"
              >
                + Add feature
              </button>
            </div>

            <div className="space-y-2">
              {form.features.map((f, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <span className="text-xs text-gray-500 w-10">Title</span>
                  <input
                    value={f.title}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                    className="border rounded-xl px-3 py-2 flex-1 text-sm"
                    placeholder={`Feature ${idx + 1}`}
                  />
                  {form.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(idx)}
                      className="text-xs px-2 py-1 rounded-xl border text-red-500 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="md:col-span-2 flex flex-col">
            <label className="font-medium mb-1 text-sm">Upload images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files)}
              className="border rounded-xl px-4 py-2 text-sm"
            />

            {/* New images preview */}
            {newImages.length > 0 && (
              <div className="flex gap-3 mt-3 flex-wrap">
                {newImages.map((img, i) => (
                  <div key={i} className="relative w-24 h-24">
                    <img
                      src={URL.createObjectURL(img)}
                      className="w-full h-full object-cover rounded-xl border"
                    />

                    {/* delete new uploaded img */}
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...newImages];
                        updated.splice(i, 1);
                        setNewImages(updated);
                      }}
                      className="
            absolute -top-2 -right-2 w-6 h-6
            bg-red-600 text-white rounded-full
            text-xs flex items-center justify-center
            hover:bg-red-700
          "
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Existing images preview */}
            {(form.images ?? []).length > 0 && (
              <div className="flex gap-3 mt-3 flex-wrap">
                {(form.images ?? []).map((img, i) => (
                  <div key={i} className="relative w-24 h-24">
                    <img
                      src={img}
                      className="w-full h-full object-cover rounded-xl border"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        const updated = (form.images ?? []).filter(
                          (_, idx) => idx !== i
                        );
                        setForm({ ...form, images: updated });
                      }}
                      className="
            absolute -top-2 -right-2 w-6 h-6
            bg-red-600 text-white rounded-full
            text-xs flex items-center justify-center
            hover:bg-red-700
          "
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Discount preview */}
          <div className="md:col-span-2 bg-gray-50 p-4 rounded-xl border text-sm">
            <div className="text-gray-700">
              <p>
                Base Price: {form.currency} {form.price.toLocaleString()}
              </p>
              <p>Percent save: {form.percentSave}%</p>
              <p className="font-semibold mt-2">
                Final Price: {form.currency}{" "}
                {discountedPrice(form.price, form.percentSave).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={saveSubscription}
            disabled={!isFormValid}
            className={`px-6 py-3 rounded-xl text-sm font-medium ${
              isFormValid
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isEdit ? "Update Subscription" : "Create Subscription"}
          </button>
        </div>
      </div>
    </div>
  );
}
