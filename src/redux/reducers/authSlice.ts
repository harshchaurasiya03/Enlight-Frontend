import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthState {
  loading: boolean;
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
  message: string | null;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  token:
    typeof window !== "undefined" ? localStorage.getItem("Bearer") : null,
  isAuthenticated:
    typeof window !== "undefined" && !!localStorage.getItem("Bearer"),
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authReq(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    regOk(state, action: PayloadAction<{ message?: string }>) {
      state.loading = false;
      state.message =
        action.payload?.message ||
        "Registration successful. Check your email.";
      state.error = null;
    },

    loginOk(
      state,
      action: PayloadAction<{ user: User; token: string; message?: string }>
    ) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload.token;
      state.error = null;
      state.message = action.payload.message || "Login successful.";
    },

    googleOk(
      state,
      action: PayloadAction<{ user: User; token: string; message?: string }>
    ) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload.token;
      state.error = null;
      state.message = action.payload.message || "Signed in with Google.";
    },

    logoutOk(state) {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.message = "Logged out.";
    },

    changePwdOk(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload || "Password changed.";
      state.error = null;
    },

    forgotOk(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload || "Reset email sent.";
      state.error = null;
    },

    resetOk(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload || "Password reset successful.";
      state.error = null;
    },

    verifyOk(
      state,
      action: PayloadAction<{
        message?: string;
        token?: string;
        user?: User;
      }>
    ) {
      state.loading = false;
      state.message =
        action.payload.message || "Email verified successfully.";
      state.error = null;

      if (action.payload?.token) {
        state.token = action.payload.token;
        state.user = action.payload.user || null;
        state.isAuthenticated = true;
      }
    },

    authErr(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    },

    clearMsg(state) {
      state.message = null;
      state.error = null;
    },
  },
});

export const {
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
} = authSlice.actions;

export default authSlice.reducer;
