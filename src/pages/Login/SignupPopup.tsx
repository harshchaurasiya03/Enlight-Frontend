import React, { useState } from "react";
import { X } from "lucide-react";

interface SignupProps {
  email: string;
  onClose: () => void;
}

const SignupPopup: React.FC<SignupProps> = ({ email, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    agree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="relative bg-white w-[360px] rounded-md shadow-lg border overflow-hidden">
        {/* Header */}
        <div className="bg-[#0056D2] text-white text-center py-3 font-medium text-lg">
          Complete your sign up
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black/40 rounded-full p-1 hover:bg-black/60"
        >
          <X size={16} />
        </button>

        <div className="text-center px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Create your account
          </h2>
          <p className="text-gray-500 text-sm mt-1 mb-4">
            Please fill in the details below to continue.
          </p>
        </div>

        {/* Form */}
        <div className="px-6 flex flex-col gap-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50 text-sm text-gray-700">
              🇮🇳 +91
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="flex-1 border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <input
            type="email"
            value={email}
            disabled
            className="border rounded-md px-3 py-2 text-sm bg-gray-100 text-gray-600 cursor-not-allowed"
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <label className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            I'm not a robot
          </label>

          <button className="bg-[#0056D2] text-white font-semibold py-2 rounded-md hover:bg-[#0045B0] transition mt-2">
            Sign Up
          </button>
        </div>

        <div className="text-center text-xs text-gray-500 mt-4 mb-3 px-4">
          By signing up, you agree to our{" "}
          <a href="#" className="text-blue-600 underline">
            Terms & Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default SignupPopup;
