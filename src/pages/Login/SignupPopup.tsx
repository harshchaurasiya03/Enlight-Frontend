import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { registerUser } from "../../redux/actions/authAction";

interface SignupProps {
  email: string;
  onClose: () => void;
}

const SignupPopup: React.FC<SignupProps> = ({ email, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, message } = useSelector(
    (state: RootState) => state.auth
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [localError, setLocalError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // --- Validate fields ---
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      return setLocalError("Please enter your full name.");
    }
    if (!formData.password.trim() || !formData.confirmPassword.trim()) {
      return setLocalError("Please enter and confirm your password.");
    }
    if (formData.password !== formData.confirmPassword) {
      return setLocalError("Passwords do not match.");
    }
    if (!formData.agree) {
      return setLocalError("Please accept the terms and privacy policy.");
    }

    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
    const userData = {
      name: fullName,
      email: email.trim().toLowerCase(),
      password: formData.password,
      role: "user",
    };

    await dispatch(registerUser(userData));
  };

  useEffect(() => {
  if (message?.toLowerCase().includes("verification email sent")) {
    onClose();
  }
}, [message, onClose]);


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

        <form onSubmit={handleSubmit}>
          <div className="text-center px-6 py-1">
            <h2 className="text-lg font-semibold text-gray-800">
              Create your account
            </h2>
            <p className="text-gray-500 text-sm mt-1 mb-4">
              Please fill in the details below to continue.
            </p>
          </div>

          {/* Form Fields */}
          <div className="px-6 pb-4 flex flex-col gap-3">
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

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="h-4 w-4 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-xs text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-blue-600 underline">
                  Terms & Privacy Policy
                </a>
              </span>
            </div>

            {/* Errors */}
            {(localError || error) && (
              <p className="text-red-600 text-xs mt-1">
                {localError || error}
              </p>
            )}
            {message && (
              <p className="text-green-600 text-xs mt-1">{message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0056D2] disabled:opacity-60 text-white font-semibold py-2 rounded-md hover:bg-[#0045B0] transition mt-2"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPopup;
