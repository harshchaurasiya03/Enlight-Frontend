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
    },

    propOk(state, action: PayloadAction<Property>) {
      state.loading = false;
      state.property = action.payload;
    },

    createPropOk(
      state,
      action: PayloadAction<{ message: string; property: Property }>
    ) {
      state.loading = false;
      state.message = action.payload.message;
      state.properties.push(action.payload.property);
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
    },

    deletePropOk(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;

      // remove from list
      state.properties = state.properties.filter(
        (p) => p._id !== state.property?._id
      );
    },

    propErr(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
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
} = propertiesSlice.actions;

export default propertiesSlice.reducer;
