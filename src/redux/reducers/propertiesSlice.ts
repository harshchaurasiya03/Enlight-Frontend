// src/redux/reducers/propertiesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Property } from "../../types/Property";

export interface PropertiesState {
  loading: boolean;
  properties: Property[];
  property: Property | null;
  total: number;
  message: string | null;
  error: string | null;
}

const initialState: PropertiesState = {
  loading: false,
  properties: [],
  property: null,
  total: 0,
  message: null,
  error: null,
};

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    propReq(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    propsOk(
      state,
      action: PayloadAction<{ properties: Property[]; total: number }>
    ) {
      state.loading = false;
      state.properties = action.payload.properties;
      state.total = action.payload.total;
      state.error = null;
    },

    propOk(state, action: PayloadAction<Property>) {
      state.loading = false;
      state.property = action.payload;
      state.error = null;
    },

    createPropOk(
      state,
      action: PayloadAction<{ message: string; property: Property }>
    ) {
      state.loading = false;
      state.message = action.payload.message;

      // Add new property to list
      state.properties.unshift(action.payload.property);
    },

    updatePropOk(
      state,
      action: PayloadAction<{ message: string; property: Property }>
    ) {
      state.loading = false;
      state.message = action.payload.message;

      state.properties = state.properties.map((p) =>
        p._id === action.payload.property._id ? action.payload.property : p
      );
      if (state.property?._id === action.payload.property._id) {
        state.property = action.payload.property;
      }
    },

    patchPropOk(
      state,
      action: PayloadAction<{ message: string; property: Property }>
    ) {
      state.loading = false;
      state.message = action.payload.message;

      state.properties = state.properties.map((p) =>
        p._id === action.payload.property._id ? action.payload.property : p
      );

      if (state.property?._id === action.payload.property._id) {
        state.property = action.payload.property;
      }
    },

    deletePropOk(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;

      // delete by ID — correct logic
      const deletedId = action.payload; // backend sends id or message?

      // If backend only sends { message: "deleted" },
      // change in actions file: deletePropOk(id);
      state.properties = state.properties.filter(
        (p) => p._id !== deletedId
      );

      if (state.property?._id === deletedId) {
        state.property = null;
      }
    },

    propErr(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    resetProps(state) {
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  propReq,
  propsOk,
  propOk,
  createPropOk,
  updatePropOk,
  patchPropOk,
  deletePropOk,
  propErr,
  resetProps,
} = propertiesSlice.actions;

export default propertiesSlice.reducer;
