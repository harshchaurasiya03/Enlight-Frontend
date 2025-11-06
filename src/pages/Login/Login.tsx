import React from "react";

type LoginProps = {
  onClose: () => void;
};

const Login: React.FC<LoginProps> = ({ onClose }) => {
  return (
    // Overlay with blur
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop blur */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        onClick={onClose} // click outside to close
      ></div>

      {/* Modal content */}
      <div className="relative bg-white w-80 p-6 rounded-xl shadow-lg z-10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
