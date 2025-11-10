import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import Login from "../pages/Login/Login";

export default function RequireAuth() {
  const { user, loading } = useSelector((s: RootState) => s.auth);
  const [showLogin, setShowLogin] = useState(false);

  if (loading) return null; // or a spinner

  if (!user) {
    if (!showLogin) setShowLogin(true);

    return (
      <>
        {showLogin && (
          <Login
            onClose={() => {
              setShowLogin(false);
              
            }}
          />
        )}
      </>
    );
  }
  return <Outlet />;
}
