import React from "react";
import { X } from "lucide-react";

const Loginmail: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="relative bg-white w-[360px] rounded-md shadow-lg border overflow-hidden">
        <div className="text-center py-3 font-semibold border-b">
          LOG IN WITH EMAIL
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={16} />
        </button>

        <div className="bg-gray-50 border m-4 rounded-lg p-3">
          <h3 className="font-semibold text-sm mb-1">Welcome Back</h3>
          <p className="text-xs text-gray-600">
            please use your Enlight password to log
            in.
          </p>
        </div>

        <div className="px-4">
          <input
            type="password"
            placeholder="Password"
            className="border w-full rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="px-4 mt-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition">
            Log in
          </button>
        </div>

        <div className="text-center mt-4 mb-4">
          <a
            href="#"
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Loginmail;
