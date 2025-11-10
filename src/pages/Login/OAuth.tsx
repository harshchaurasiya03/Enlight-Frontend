import React from "react";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  UserCredential,
} from "firebase/auth";
import app from "../../firebase";
import { useDispatch } from "react-redux";
import { googleOk } from "../../redux/reducers/authSlice";
import { useNavigate } from "react-router-dom";

type BackendUser = {
  id: string;           
  name: string;
  email: string;
  role: string;
};

type GoogleAuthResponse = {
  success: boolean;
  message: string;
  token: string;
  user: BackendUser;
};

const OAuth: React.FC = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      // 1) Google sign-in
      const result: UserCredential = await signInWithPopup(auth, provider);
      const gUser = result.user;

      if (!gUser?.email || !gUser?.displayName) {
        throw new Error("Incomplete Google user data");
      }

      // 2) Hit backend
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/google`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name: gUser.displayName,
            email: gUser.email,
            googlePhotoUrl: gUser.photoURL,
          }),
        }
      );

      let data: GoogleAuthResponse;
      try {
        data = (await res.json()) as GoogleAuthResponse;
      } catch {
        throw new Error("Could not parse server response.");
      }

      if (!res.ok) {
        throw new Error((data as any)?.message || "Google login failed.");
      }

      // 3) Optional: persist token locally (if your app uses it)
      if (data?.token) {
        localStorage.setItem("Bearer", data.token);
      }

      // 4) Dispatch EXACT payload your slice expects
      //    { user: User; token: string; message?: string }
      dispatch(
        googleOk({
          user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
          },
          token: data.token,
          message: data.message,
        })
      );

      // 5) Navigate
      navigate("/");
    } catch (err: any) {
      console.error("OAuth error:", err);
      alert("Login failed: " + (err?.message || "Unexpected error"));
    }
  };

  return (
    <Button type="button" outline onClick={handleGoogleClick}>
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
};

export default OAuth;
