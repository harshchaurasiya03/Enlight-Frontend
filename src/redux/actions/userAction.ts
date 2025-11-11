// src/redux/actions/userAction.ts
import axios from "axios";
import { AppDispatch } from "../store";
import {
  userReq,
  usersOk,
  userOk,
  updateOk,
  patchOk,
  deleteOk,
  profileOk,
  favsOk,
  userErr,
  clearUserMsg,
} from "../reducers/userSlice";
import { User } from "../../types/User";

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

/* =========================
   ADMIN / GENERAL USER CRUD
   ========================= */

// GET /user/users — all users
export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userReq());
    const { data } = await axios.get(`${BASE_URL}/user/users`, authHeaders());
    dispatch(usersOk(data.users as User[]));
  } catch (err: any) {
    dispatch(userErr(err?.response?.data?.message || "Failed to load users"));
  }
};

// GET /user/users/:id — single user
export const fetchUserById =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userReq());
      const { data } = await axios.get(
        `${BASE_URL}/user/${id}`,
        authHeaders()
      );
      dispatch(userOk(data.user as User));
    } catch (err: any) {
      dispatch(userErr(err?.response?.data?.message || "User not found"));
    }
  };

// PUT /user/users/:id — replace/update user
export const updateUser =
  (id: string, payload: Partial<User> & { password?: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(userReq());
      const { data } = await axios.put(
        `${BASE_URL}/user/users/${id}`,
        payload,
        authHeaders()
      );
      dispatch(updateOk({ message: data.message, user: data.user as User }));
    } catch (err: any) {
      dispatch(userErr(err?.response?.data?.message || "Update failed"));
    }
  };

// PATCH /user/users/:id — partial update
export const patchUser =
  (id: string, payload: Partial<User>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userReq());
      const { data } = await axios.patch(
        `${BASE_URL}/user/users/${id}`,
        payload,
        authHeaders()
      );
      dispatch(patchOk({ message: data.message, user: data.user as User }));
    } catch (err: any) {
      dispatch(userErr(err?.response?.data?.message || "Patch failed"));
    }
  };

// DELETE /user/users/:id — delete user
export const deleteUserById =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userReq());
      const { data } = await axios.delete(
        `${BASE_URL}/user/users/${id}`,
        authHeaders()
      );
      dispatch(deleteOk(data?.message || "User deleted"));
    } catch (err: any) {
      dispatch(userErr(err?.response?.data?.message || "Delete failed"));
    }
  };

/* =========================
   SELF PROFILE
   ========================= */
// PATCH /user/update-profile — update own profile (with optional photo)
export const updateMyProfile =
  (form: {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    preferences?: Record<string, any>;
    photoFile?: File | null;
    [k: string]: any;
  }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(userReq());

      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === "photoFile") return;
        if (v !== undefined && v !== null) {
          fd.append(k, typeof v === "object" ? JSON.stringify(v) : String(v));
        }
      });
      if (form.photoFile) {
        fd.append("photo", form.photoFile);
      }

      const token = getToken();
      const headers = token
        ? {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        : { withCredentials: true };

      const { data } = await axios.patch(
        `${BASE_URL}/user/update-profile`,
        fd,
        headers
      );

      dispatch(profileOk(data.user as User));
    } catch (err: any) {
      dispatch(
        userErr(err?.response?.data?.message || "Profile update failed")
      );
    }
  };

/* =========================
   FAVORITES
   ========================= */

// POST /user/favorites — add favorite
export const addFavorite =
  (propertyId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userReq());
      const { data } = await axios.post(
        `${BASE_URL}/user/favorites`,
        { propertyId },
        authHeaders()
      );
      dispatch(favsOk(data.favorites));
    } catch (err: any) {
      dispatch(
        userErr(err?.response?.data?.message || "Unable to add favorite")
      );
    }
  };

// DELETE /user/favorites — remove favorite
export const removeFavorite =
  (propertyId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userReq());
      const { data } = await axios.delete(`${BASE_URL}/user/favorites`, {
        ...authHeaders(),
        data: { propertyId },
      });
      dispatch(favsOk(data.favorites));
    } catch (err: any) {
      dispatch(
        userErr(err?.response?.data?.message || "Unable to remove favorite")
      );
    }
  };

// GET /user/favorites — get favorites
export const getFavorites = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userReq());
    const { data } = await axios.get(`${BASE_URL}/user/favorites`, authHeaders());
    dispatch(favsOk(data.favorites));
  } catch (err: any) {
    dispatch(
      userErr(err?.response?.data?.message || "Unable to fetch favorites")
    );
  }
};

export const clearUserMessage = () => (dispatch: AppDispatch) => {
  dispatch(clearUserMsg());
};
