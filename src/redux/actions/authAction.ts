import axios from "axios";
import { AppDispatch } from "../store";
import {
  authReq,
  regOk,
  loginOk,
  googleOk,
  logoutOk,
  changePwdOk,
  forgotOk,
  resetOk,
  verifyOk,
  authErr,
  clearMsg,
  User,
} from "../reducers/authSlice";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const getToken = () => localStorage.getItem("Bearer");

const authHeaders = () => {
  const token = getToken();
  return token
    ? {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    : {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
};

// Check Email
export const checkEmailExists =
  (email: string) => async (): Promise<boolean> => {
    try {
      const { data } = await axios.get(`${BASE_URL}/auth/check-email`, {
        params: { email },
        withCredentials: true,
      });
      return data.exists;
    } catch (error) {
      console.error("Check email failed:", error);
      return false;
    }
  };

// Register
export const registerUser =
  (userData: Record<string, any>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authReq());
      const { data } = await axios.post(`${BASE_URL}/auth/register`, userData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      dispatch(regOk(data));
    } catch (error: any) {
      dispatch(authErr(error.response?.data?.message || "Registration failed"));
    }
  };

// Login
export const loginUser =
  (credentials: { email: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(authReq());
      const { data } = await axios.post(`${BASE_URL}/auth/login`, credentials, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (data?.token) localStorage.setItem("Bearer", data.token);

      dispatch(
        loginOk({
          user: data.user as User,
          token: data.token,
          message: data.message,
        })
      );
    } catch (error: any) {
      dispatch(authErr(error.response?.data?.message || "Login failed"));
    }
  };

// Google OAuth
export const googleAuth =
  (profile: Record<string, any>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authReq());
      const { data } = await axios.post(`${BASE_URL}/auth/google`, profile, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (data?.token) localStorage.setItem("Bearer", data.token);
      dispatch(googleOk(data));
    } catch (error: any) {
      dispatch(authErr(error.response?.data?.message || "Google sign-in failed"));
    }
  };

// Logout
export const logout = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(authReq());
    await axios.post(`${BASE_URL}/auth/logout`, {}, authHeaders());
  } catch (_) {
  } finally {
    localStorage.removeItem("Bearer");
    dispatch(logoutOk());
  }
};

// Load user from token
export const loadUser = () => async (dispatch: AppDispatch) => {
  const token = localStorage.getItem("Bearer");
  if (!token) return;

  try {
    dispatch(authReq());
    const { data } = await axios.get(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    dispatch(
      loginOk({
        user: data.user as User,
        token,
        message: "Session restored",
      })
    );
  } catch (error) {
    localStorage.removeItem("Bearer");
    dispatch(authErr("Session expired. Please log in again."));
  }
};

//  Change Password
export const changePassword =
  (payload: Record<string, any>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authReq());
      const { data } = await axios.post(
        `${BASE_URL}/auth/change-password`,
        payload,
        authHeaders()
      );
      dispatch(changePwdOk(data?.message || "Password changed successfully."));
    } catch (error: any) {
      dispatch(
        authErr(error.response?.data?.message || "Unable to change password")
      );
    }
  };

// Forgot Password
export const forgotPassword =
  (email: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authReq());
      const { data } = await axios.post(
        `${BASE_URL}/auth/forgot-password`,
        { email },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch(forgotOk(data?.message || "Reset email sent."));
    } catch (error: any) {
      dispatch(
        authErr(error.response?.data?.message || "Unable to send reset email")
      );
    }
  };

// Reset Password
export const resetPassword =
  ({ token, newPassword }: { token: string; newPassword: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(authReq());
      const { data } = await axios.put(
        `${BASE_URL}/auth/reset-password/${token}`,
        { newPassword },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch(resetOk(data?.message || "Password reset successful."));
    } catch (error: any) {
      dispatch(
        authErr(error.response?.data?.message || "Invalid or expired token")
      );
    }
  };

//  Verify Email
export const verifyEmail =
  (token: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authReq());
      const { data } = await axios.get(`${BASE_URL}/auth/verify-email/${token}`, {
        withCredentials: true,
      });

      if (data?.token) localStorage.setItem("Bearer", data.token);
      dispatch(verifyOk(data));
    } catch (error: any) {
      dispatch(
        authErr(error.response?.data?.message || "Email verification failed")
      );
    }
  };

//  Clear message
export const clearMessage = () => (dispatch: AppDispatch) => {
  dispatch(clearMsg());
};
