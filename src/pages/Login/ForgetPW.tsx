import React, { useState } from "react";
import { X } from "lucide-react";

interface ForgetPwProps {
  onClose: () => void;
}

const ForgetPw: React.FC<ForgetPwProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    console.log("Password reset link sent to:", email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="relative bg-white w-[360px] rounded-md shadow-lg border overflow-hidden">
        {/* Header */}
        <div className="bg-[#0056D2] text-white text-center py-3 font-medium text-lg">
          Forgot Password
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black/40 rounded-full p-1 hover:bg-black/60"
        >
          <X size={16} />
        </button>

        {/* Content */}
        <div className="text-center px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Reset your password
          </h2>
          <p className="text-gray-500 text-sm mb-5">
            Enter your registered email address and we’ll send you a reset link.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <button
              type="submit"
              className="bg-[#0056D2] text-white font-semibold py-2 rounded-md hover:bg-[#0045B0] transition mt-2"
            >
              Send Reset Link
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-5">
            Remember your password?{" "}
            <button
              type="button"
              onClick={onClose}
              className="text-blue-600 font-medium underline"
            >
              Back to Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPw;
