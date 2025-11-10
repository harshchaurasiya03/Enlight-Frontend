import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { loginUser, clearMessage } from "../../redux/actions/authAction";
import { useLocation, useNavigate } from "react-router-dom";
import ForgetPw from "./ForgetPW";

type Props = { onClose: () => void; email: string };

const Loginmail: React.FC<Props> = ({ onClose, email }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: Location } };

  const { loading, error, user } = useSelector((state: RootState) => state.auth);
  const [pwd, setPwd] = useState("");
  const [showForgetPw, setShowForgetPw] = useState(false); // ✅ state for ForgetPw modal

  // Login handler
  const handleLogin = () => {
    if (!pwd.trim()) return;
    dispatch(loginUser({ email, password: pwd }));
  };

  // Redirect after successful login
  useEffect(() => {
    if (user) {
      dispatch(clearMessage());
      const redirectTo = location.state?.from?.pathname ?? "/dashboard";
      onClose?.();
      navigate(redirectTo, { replace: true });
    }
  }, [user, dispatch, onClose, navigate, location.state]);

  // Close modal if user exists
  useEffect(() => {
    if (user) onClose();
  }, [user, onClose]);

  // ✅ Show ForgetPw modal if clicked
  if (showForgetPw) return <ForgetPw onClose={() => setShowForgetPw(false)} />;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="relative bg-white w-[360px] rounded-md shadow-lg border overflow-hidden">
        <div className="text-center py-3 font-semibold border-b">LOG IN WITH EMAIL</div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={16} />
        </button>

        {/* Info box */}
        <div className="bg-gray-50 border m-4 rounded-lg p-3">
          <h3 className="font-semibold text-sm mb-1">Welcome Back</h3>
          <p className="text-xs text-gray-600">
            Please use your Enlight password to log in for{" "}
            <span className="font-medium">{email}</span>.
          </p>
        </div>

        {/* ✅ Form for password input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(); // ✅ Enter key works
          }}
          className="px-4"
        >
          <input
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="border w-full rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          {error && <p className="text-red-600 text-xs mt-2">{error}</p>}

          <div className="mt-4">
            <button
              type="submit" // ✅ makes Enter key trigger submit
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2 rounded-md transition"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </div>
        </form>

        {/* Forgot password link */}
        <div className="text-center mt-4 mb-4">
          <button
            type="button"
            onClick={() => setShowForgetPw(true)} // ✅ open ForgetPw modal
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loginmail;
