// src/redux/actions/propertiesAction.ts
import axios from "axios";
import { AppDispatch } from "../store";
import {
  propReq,
  propsOk,
  propOk,
  createPropOk,
  updatePropOk,
  patchPropOk,
  deletePropOk,
  propErr,
} from "../reducers/propertiesSlice";
import { Property } from "../../types/Property";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const getToken = () => {
  const t = localStorage.getItem("Bearer");
  return t?.replace("Bearer ", "").trim();
};

const jsonHeaders = () => {
  const token = getToken();
  return {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
};

// For FormData uploads (create/update)
const formHeaders = () => {
  const token = getToken();
  return {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
};


// ==================================================
// GET ALL PROPERTIES
// ==================================================
export const fetchProperties = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(propReq());
    const { data } = await axios.get(`${BASE_URL}/properties`, jsonHeaders());
    dispatch(
      propsOk({
        properties: data.properties as Property[],
        total: data.total || data.count || 0,
      })
    );
  } catch (err: any) {
    dispatch(propErr(err?.response?.data?.message || "Failed to load properties"));
  }
};

// ==================================================
// GET PROPERTY BY ID / SLUG
// ==================================================
export const fetchPropertyById =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(propReq());
      const { data } = await axios.get(`${BASE_URL}/properties/${id}`, jsonHeaders());
      dispatch(propOk(data.property));
    } catch (err: any) {
      dispatch(propErr(err?.response?.data?.message || "Property not found"));
    }
  };

// ==================================================
// CREATE PROPERTY (FormData)
// ==================================================
export const createProperty =
  (payload: FormData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(propReq());
      const { data } = await axios.post(
        `${BASE_URL}/properties`,
        payload,
        formHeaders()
      );
      dispatch(createPropOk({ message: data.message, property: data.property }));
      dispatch(fetchProperties());
    } catch (err: any) {
      dispatch(propErr(err?.response?.data?.message || "Create failed"));
    }
  };

// ==================================================
// UPDATE PROPERTY (PUT, Full Update)
// ==================================================
export const updateProperty =
  (id: string, payload: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(propReq());

      const isForm = payload?.constructor?.name === "FormData";
      const headers = isForm ? formHeaders() : jsonHeaders();

      const { data } = await axios.put(
        `${BASE_URL}/properties/${id}`,
        payload,
        headers
      );

      dispatch(updatePropOk({ message: data.message, property: data.property }));
      dispatch(fetchProperties());
    } catch (err: any) {
      dispatch(propErr(err?.response?.data?.message || "Update failed"));
    }
  };

// ==================================================
// PATCH PROPERTY (Partial Update)
// ==================================================
export const patchProperty =
  (id: string, payload: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(propReq());

      const isForm = payload?.constructor?.name === "FormData";
      const headers = isForm ? formHeaders() : jsonHeaders();

      const { data } = await axios.patch(
        `${BASE_URL}/properties/${id}`,
        payload,
        headers
      );

      dispatch(patchPropOk({ message: data.message, property: data.property }));
      dispatch(fetchProperties());
    } catch (err: any) {
      dispatch(propErr(err?.response?.data?.message || "Patch failed"));
    }
  };

// ==================================================
// DELETE PROPERTY
// ==================================================
export const deletePropertyById =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(propReq());
      const { data } = await axios.delete(
        `${BASE_URL}/properties/${id}`, // FIXED URL
        jsonHeaders()
      );
      dispatch(deletePropOk(data?.message || "Property deleted"));
      dispatch(fetchProperties());
    } catch (err: any) {
      dispatch(propErr(err?.response?.data?.message || "Delete failed"));
    }
  };

// ==================================================
// 🔍 SEARCH PROPERTIES
// GET /properties/search?keyword=...&city=...&minPrice=...
// ==================================================
export const searchPropertiesAction =
  (queryParams: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(propReq());

      const qs = new URLSearchParams(queryParams).toString();
      const { data } = await axios.get(
        `${BASE_URL}/properties/search?${qs}`,
        jsonHeaders()
      );

      dispatch(
        propsOk({
          properties: data.properties,
          total: data.total,
        })
      );
    } catch (err: any) {
      dispatch(propErr(err?.response?.data?.message || "Search failed"));
    }
  };

// ==================================================
// 📍 NEARBY PROPERTIES
// GET /properties/nearby?latitude=..&longitude=..
// ==================================================
export const fetchNearbyProperties =
  (params: { latitude: number; longitude: number; distance?: number }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(propReq());

      const qs = new URLSearchParams(params as any).toString();

      const { data } = await axios.get(
        `${BASE_URL}/properties/nearby?${qs}`,
        jsonHeaders()
      );

      dispatch(
        propsOk({
          properties: data.properties,
          total: data.total,
        })
      );
    } catch (err: any) {
      dispatch(propErr(err?.response?.data?.message || "Nearby fetch failed"));
    }
  };
