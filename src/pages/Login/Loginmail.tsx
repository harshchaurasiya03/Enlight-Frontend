// Loginmail.tsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { loginUser, clearMessage } from "../../redux/actions/authAction";
import { useLocation, useNavigate } from "react-router-dom";

type Props = { onClose: () => void; email: string };

const Loginmail: React.FC<Props> = ({ onClose, email }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: Location } };

  const { loading, error, user } = useSelector((state: RootState) => state.auth);
  const [pwd, setPwd] = useState("");

  const handleLogin = () => {
    if (!pwd.trim()) return;
    dispatch(loginUser({ email, password: pwd }));
  };

  useEffect(() => {
    if (user) {
      dispatch(clearMessage());
      // go back to where user wanted to go (default /dashboard)
      const redirectTo = location.state?.from?.pathname ?? "/dashboard";
      onClose?.();
      navigate(redirectTo, { replace: true });
    }
  }, [user, dispatch, onClose, navigate, location.state]);

  useEffect(() => {
  if (user) {
    onClose(); // closes popup
  }
}, [user, onClose]);


  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="relative bg-white w-[360px] rounded-md shadow-lg border overflow-hidden">
        <div className="text-center py-3 font-semibold border-b">LOG IN WITH EMAIL</div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={16} />
        </button>

        <div className="bg-gray-50 border m-4 rounded-lg p-3">
          <h3 className="font-semibold text-sm mb-1">Welcome Back</h3>
          <p className="text-xs text-gray-600">
            Please use your Enlight password to log in for <span className="font-medium">{email}</span>.
          </p>
        </div>

        <div className="px-4">
          <input
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="border w-full rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
        </div>

        <div className="px-4 mt-4">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2 rounded-md transition"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </div>

        <div className="text-center mt-4 mb-4">
          <a href="/forgot-password" className="text-blue-600 text-sm font-medium hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Loginmail;
