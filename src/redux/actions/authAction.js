// src/store/actions/authAction.js
import axios from "axios";
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
} from "../slices/authSlice";


const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// --- axios helpers ---
const getToken = () => localStorage.getItem("Bearer");

const authHeaders = () => {
  const t = getToken();
  return t
    ? {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${t}`,
        },
        withCredentials: true,
      }
    : {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
};

// --- ACTIONS ---

// Register
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(authReq());
    const { data } = await axios.post(`${BASE_URL}/auth/register`, userData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    
    dispatch(regOk(data));
  } catch (error) {
    dispatch(
      authErr(error.response?.data?.message || "Registration failed")
    );
  }
};

// Login
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(authReq());
    const { data } = await axios.post(`${BASE_URL}/auth/login`, credentials, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (data?.token) {
      localStorage.setItem("Bearer", data.token);
    }
    dispatch(loginOk(data)); 
  } catch (error) {
    dispatch(authErr(error.response?.data?.message || "Login failed"));
  }
};

// Google OAuth (email + name from your frontend Google flow)
export const googleAuth = (profile) => async (dispatch) => {
  try {
    dispatch(authReq());
    const { data } = await axios.post(`${BASE_URL}/auth/google`, profile, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    if (data?.token) {
      localStorage.setItem("Bearer", data.token);
    }
    dispatch(googleOk(data)); // same shape as loginOk
  } catch (error) {
    dispatch(authErr(error.response?.data?.message || "Google sign-in failed"));
  }
};

// Logout (server route is protected; also clear client token)
export const logout = () => async (dispatch) => {
  try {
    dispatch(authReq());
    await axios.post(`${BASE_URL}/auth/logout`, {}, authHeaders());
  } catch (_) {
    // ignore server failure for logout; still clear local state
  } finally {
    localStorage.removeItem("Bearer");
    dispatch(logoutOk());
  }
};

// Change Password (protected)
export const changePassword = (payload) => async (dispatch) => {
  try {
    dispatch(authReq());
    const { data } = await axios.post(
      `${BASE_URL}/auth/change-password`,
      payload,
      authHeaders()
    );
    dispatch(changePwdOk(data?.message || "Password changed successfully."));
  } catch (error) {
    dispatch(
      authErr(error.response?.data?.message || "Unable to change password")
    );
  }
};

// Forgot Password (send email)
export const forgotPassword = (email) => async (dispatch) => {
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
  } catch (error) {
    dispatch(
      authErr(error.response?.data?.message || "Unable to send reset email")
    );
  }
};

// Reset Password (via token from URL)
export const resetPassword = ({ token, newPassword }) => async (dispatch) => {
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
  } catch (error) {
    dispatch(
      authErr(error.response?.data?.message || "Invalid or expired token")
    );
  }
};

// Verify Email (token from URL)
export const verifyEmail = (token) => async (dispatch) => {
  try {
    dispatch(authReq());
    const { data } = await axios.get(`${BASE_URL}/auth/verify-email/${token}`, {
      withCredentials: true,
    });

    if (data?.token) {
      localStorage.setItem("Bearer", data.token);
    }

    // This will set user+token via reducer (see step 3)
    dispatch(verifyOk(data));
  } catch (error) {
    dispatch(
      authErr(error.response?.data?.message || "Email verification failed")
    );
  }
};


// Optional helper to clear transient messages
export const clearMessage = () => (dispatch) => {
  dispatch(clearMsg());
};
