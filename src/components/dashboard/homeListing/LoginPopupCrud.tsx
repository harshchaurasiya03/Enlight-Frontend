import React, { useState } from "react";

export default function LoginPopupDashboard() {
  // State to store popup content
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState(
    "https://cdn-icons-png.flaticon.com/512/744/744502.png"
  );

  const [heading, setHeading] = useState("Get the full experience");
  const [description, setDescription] = useState(
    "Save your favorites, schedule viewings, make offers and get access to member-only deals."
  );
  const [buttonText, setButtonText] = useState("Continue with Email");

  // Handle logo file selection
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    console.log({ logoFile, heading, description, buttonText });

  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-md shadow p-6 mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Login Popup Settings</h1>

        <div className="space-y-4">
          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Logo</label>
            <input type="file" accept="image/*" onChange={handleLogoChange} className="border" />
            <img
              src={logoPreview}
              alt="Logo Preview"
              className="mt-2 w-24 h-24 object-contain"
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
