import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";



export interface UserState {
  loading: boolean;
  users: User[];          
  user: User | null;      
  profile: User | null;   
  favorites: any[];      
  message: string | null;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  users: [],
  user: null,
  profile: null,
  favorites: [],
  message: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Common Request
    userReq(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    // Success: All Users
    usersOk(state, action: PayloadAction<User[]>) {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    },

    // Success: Single User
    userOk(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },

    // Success: Profile update
    profileOk(state, action: PayloadAction<User>) {
      state.loading = false;
      state.profile = action.payload;
      state.error = null;
      state.message = "Profile updated successfully.";
    },

    // PUT Update
    updateOk(state, action: PayloadAction<{ message: string; user: User }>) {
      state.loading = false;
      state.user = action.payload.user;
      state.message = action.payload.message || "User updated successfully.";
      state.error = null;
    },

    // PATCH Update
    patchOk(state, action: PayloadAction<{ message: string; user: User }>) {
      state.loading = false;
      state.user = action.payload.user;
      state.message = action.payload.message || "User patched successfully.";
      state.error = null;
    },

    // Delete
    deleteOk(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload || "User deleted successfully.";
      state.error = null;
      // Optionally remove from users list:
      state.users = state.users.filter(u => u.id !== state.user?.id);
    },

    // Favorites
    favsOk(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.favorites = action.payload;
      state.error = null;
      state.message = "Favorites updated.";
    },

    // Error
    userErr(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload || "Something went wrong.";
    },

    // Clear message/error
    clearUserMsg(state) {
      state.message = null;
      state.error = null;
    },
  },
});

export const {
  userReq,
  usersOk,
  userOk,
  profileOk,
  updateOk,
  patchOk,
  deleteOk,
  favsOk,
  userErr,
  clearUserMsg,
} = userSlice.actions;

export default userSlice.reducer;
