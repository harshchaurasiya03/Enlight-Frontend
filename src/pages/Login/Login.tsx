import React, { useState } from "react";
import { X } from "lucide-react";

import SignupPopup from "./SignupPopup";
import Loginmail from "./Loginmail";

const Login: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [showLoginMail, setShowLoginMail] = useState(false);

  // Dummy "existing email" for simulation
  const existingEmails = ["test@example.com", "user@dummy.com"];

  const handleContinue = () => {
    if (email.trim() === "") return;

    // Check if email already exists
    if (existingEmails.includes(email.trim().toLowerCase())) {
      setShowLoginMail(true);
    } else {
      setShowSignup(true);
    }
  };

  if (showSignup) {
    return <SignupPopup email={email} onClose={onClose} />;
  }

  if (showLoginMail) {
    return <Loginmail onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="relative bg-white w-[360px] rounded-md shadow-lg border overflow-hidden">
        {/* Header */}
        <div className="bg-[#0056D2] text-white text-center py-3 font-medium text-lg">
          Sign up or Log in
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black/40 rounded-full p-1 hover:bg-black/60"
        >
          <X size={16} />
        </button>

        {/* Image Section */}
        <div className="flex justify-center py-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/744/744502.png"
            alt="login illustration"
            className="w-40"
          />
        </div>

        {/* Text */}
        <div className="text-center px-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Get the full experience
          </h2>
          <p className="text-gray-500 text-sm mt-1 mb-4">
            Save your favorites, schedule viewings, make offers and get access
            to member-only deals.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 px-6">
          <button className="flex items-center justify-center gap-2 border text-gray-800 font-semibold py-2 rounded-md hover:bg-gray-50 transition">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.png"
              alt="google"
              className="w-5 h-5"
            />
            CONTINUE WITH GOOGLE
          </button>

          <button className="flex items-center justify-center gap-2 bg-[#1877F2] text-white font-semibold py-2 rounded-md hover:bg-[#166FE0] transition">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg"
              alt="facebook"
              className="w-5 h-5 bg-white rounded"
            />
            CONTINUE WITH FACEBOOK
          </button>

          <div className="flex items-center my-2">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-500 text-sm mx-2">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {/* Continue with Email Button */}
          <button
            onClick={handleContinue}
            className="bg-[#0056D2] text-white font-semibold py-2 rounded-md hover:bg-[#0045B0] transition"
          >
            Continue with Email
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 mt-4 mb-3 px-4">
          By continuing, you agree to Enlight{" "}
          <a href="#" className="text-blue-600 underline">
            Privacy Policy.
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
