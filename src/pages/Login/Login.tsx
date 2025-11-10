import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { checkEmailExists } from "../../redux/actions/authAction";
import SignupPopup from "./SignupPopup";
import Loginmail from "./Loginmail";
import OAuth from "./OAuth";

const Login: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth); // 👈 access logged-in user
  const [email, setEmail] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [showLoginMail, setShowLoginMail] = useState(false);
  const [checking, setChecking] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // ✅ If user already logged in, redirect immediately
  useEffect(() => {
    if (user) {
      onClose(); // close popup
      navigate("/dashboard/profile", { replace: true }); // go to dashboard
    }
  }, [user, navigate, onClose]);

  const handleContinue = async () => {
    setErr(null);
    if (!email.trim()) {
      setErr("Please enter an email.");
      return;
    }

    setChecking(true);
    try {
      const exists = await dispatch(checkEmailExists(email.trim().toLowerCase()));
      if (exists) setShowLoginMail(true);
      else setShowSignup(true);
    } catch {
      setErr("Something went wrong. Please try again.");
    } finally {
      setChecking(false);
    }
  };

  if (showSignup) return <SignupPopup email={email} onClose={onClose} />;
  if (showLoginMail) return <Loginmail email={email} onClose={onClose} />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="relative bg-white w-[360px] rounded-md shadow-lg border overflow-hidden">
        <div className="bg-[#0056D2] text-white text-center py-3 font-medium text-lg">
          Sign up or Log in
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black/40 rounded-full p-1 hover:bg-black/60"
        >
          <X size={16} />
        </button>

        <div className="flex justify-center py-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/744/744502.png"
            alt="login illustration"
            className="w-24 sm:w-32"
          />
        </div>

        <div className="text-center px-6">
          <h2 className="text-lg font-semibold text-gray-800">Get the full experience</h2>
          <p className="text-gray-500 text-sm mt-1 mb-4">
            Save your favorites, schedule viewings, make offers and get access to member-only deals.
          </p>
        </div>

        <div className="flex flex-col gap-3 px-6">
          <button className="flex items-center justify-center gap-2 border text-gray-800 font-semibold py-2 rounded-md hover:bg-gray-50 transition">
            <OAuth/>
            <span className="text-sm sm:text-base">CONTINUE WITH GOOGLE</span>
          </button>

          <button className="flex items-center justify-center gap-2 bg-[#1877F2] text-white font-semibold py-2 rounded-md hover:bg-[#166FE0] transition">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg"
              alt="facebook"
              className="w-5 h-5 bg-white rounded"
            />
            <span className="text-sm sm:text-base">CONTINUE WITH FACEBOOK</span>
          </button>

          <div className="flex items-center my-2">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-500 text-sm mx-2">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />

          {err && <p className="text-red-600 text-xs">{err}</p>}

          <button
            onClick={handleContinue}
            disabled={checking}
            className="bg-[#0056D2] disabled:opacity-60 text-white font-semibold py-2 rounded-md hover:bg-[#0045B0] transition"
          >
            {checking ? "Checking..." : "Continue with Email"}
          </button>
        </div>

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
