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

const getToken = () => localStorage.getItem("Bearer");

const authHeaders = () => {
  const token = getToken();

  return token
    ? {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    : {
        headers: { "Content-Type": "application/json" },
      };
};

// ===============================
// GET ALL PROPERTIES
// ===============================
export const fetchProperties = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(propReq());
    const { data } = await axios.get(`${BASE_URL}/properties`, authHeaders());

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

// ===============================
// GET PROPERTY BY ID
// ===============================
export const fetchPropertyById =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(propReq());
      const { data } = await axios.get(`${BASE_URL}/properties/${id}`, authHeaders());
      dispatch(propOk(data.property as Property));
    } catch (err: any) {
      dispatch(propErr(err?.response?.data?.message || "Property not found"));
    }
  };

// ===============================
// CREATE PROPERTY
// ===============================
export const createProperty =
  (payload: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(propReq());
      const { data } = await axios.post(
        `${BASE_URL}/properties`,
        payload,
        authHeaders()
      );
      dispatch(createPropOk({ message: data.message, property: data.property }));
      dispatch(fetchProperties());
    } catch (err: any) {
      dispatch(propErr(err?.response?.data?.message || "Create failed"));
    }
  };

// ===============================
// UPDATE PROPERTY (PUT)
// ===============================
export const updateProperty =
  (id: string, payload: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(propReq());
      const { data } = await axios.put(
        `${BASE_URL}/properties/${id}`,
        payload,
        authHeaders()
      );
      dispatch(updatePropOk({ message: data.message, property: data.property }));
      dispatch(fetchProperties());
    } catch (err: any) {
      dispatch(propErr(err?.response?.data?.message || "Update failed"));
    }
  };

// ===============================
// PATCH PROPERTY
// ===============================
export const patchProperty =
  (id: string, payload: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(propReq());
      const { data } = await axios.patch(
        `${BASE_URL}/properties/${id}`,
        payload,
        authHeaders()
      );
      dispatch(patchPropOk({ message: data.message, property: data.property }));
      dispatch(fetchProperties());
    } catch (err: any) {
      dispatch(propErr(err?.response?.data?.message || "Patch failed"));
    }
  };

// ===============================
// DELETE PROPERTY
// ===============================
export const deletePropertyById =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(propReq());
      const { data } = await axios.delete(
        `${BASE_URL}/properties /${id}`,
        authHeaders()
      );
      dispatch(deletePropOk(data?.message || "Property deleted"));
      dispatch(fetchProperties());
    } catch (err: any) {
      dispatch(propErr(err?.response?.data?.message || "Delete failed"));
    }
  };
