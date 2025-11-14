import React, { useState } from "react";

export default function SubscribePopupDashboard() {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("/logo/enlightlogo.png");

  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState("/images/Chong.webp");

  const [heading, setHeading] = useState("Subscribe to our Newsletter");
  const [description, setDescription] = useState(
    "Get exclusive offers and updates"
  );
  const [buttonText, setButtonText] = useState("Subscribe");

  // Handle logo file selection
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // Handle banner file selection
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    console.log({
      logoFile,
      bannerFile,
      heading,
      description,
      buttonText,
    });
    alert("Subscribe Popup content saved successfully!");
    // Here you can upload files to server or cloud storage
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-md shadow p-6 mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Subscribe Popup Settings</h1>

        <div className="space-y-4">
          {/* Banner Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Banner Image</label>
            <input type="file" accept="image/*" onChange={handleBannerChange} className="border" />
            <div className="mt-2 w-full h-48 bg-gray-100 flex items-center justify-center rounded-md overflow-hidden">
              <img
                src={bannerPreview}
                alt="Banner Preview"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Logo</label>
            <input type="file" accept="image/*" onChange={handleLogoChange}  className="border"/>
            <img
              src={logoPreview}
              alt="Logo Preview"
              className="mt-2 w-20 h-20 object-contain"
            />
          </div>

          {/* Heading */}
          <div>
            <label className="block text-sm font-medium mb-1">Heading</label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              rows={3}
            />
          </div>

          {/* Button Text */}
          <div>
            <label className="block text-sm font-medium mb-1">Button Text</label>
            <input
              type="text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-[#0056D2] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#0045B0] transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
