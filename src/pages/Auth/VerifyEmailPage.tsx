import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../redux/store";
import { verifyEmail, clearMessage } from "../../redux/actions/authAction";

export default function VerifyEmailPage() {
  const { token } = useParams<{ token: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, message, user } = useSelector(
    (s: RootState) => s.auth
  );

  useEffect(() => {
    if (token) {
      dispatch(verifyEmail(token));
    }
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch, token]);

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [loading, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6 text-center">
        <h1 className="text-xl font-semibold mb-2">Verifying your email…</h1>

        {loading && (
          <p className="text-gray-600">Please wait while we confirm your account.</p>
        )}

        {!loading && message && (
          <p className="text-green-600">{message}</p>
        )}

        {!loading && error && (
          <>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Go Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}
