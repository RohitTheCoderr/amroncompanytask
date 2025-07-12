// utils/api.js
'use client'; // at top of file

import axios from "axios";
import { store } from "../../reduxStore";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
  // const state = store.getState(); // 👈 Access Redux state directly
  const state = store.getState();
  const reduxToken = state.auth.token;
  const localStorageToken =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return reduxToken || localStorageToken || "";
}


// function getToken() {
//   const state = useAuthStore.getState();
//   return state.token || localStorage.getItem("token") || "";
// }



async function handleResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    const error = new Error(response.data || "Something went wrong");
    error.data = response.data;
    throw error;
  }
}

async function apiCall(endpoint, method = "GET", data = null) {
  const url = `${apiUrl}${endpoint}`;
  const token = getToken();

  const options = {
    method,
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  if (data && !(data instanceof FormData)) {
    options.headers["Content-Type"] = "application/json";
  }

  try {
    console.log("options",options);
    
    const response = await axios(options);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error with ${method} request to ${endpoint}:`, error);
    throw error;
  }
}

export const getData = (endpoint) => apiCall(endpoint, "GET");
export const postData = (endpoint, data) => apiCall(endpoint, "POST", data);
export const patchData = (endpoint, data) => apiCall(endpoint, "PATCH", data);
export const putData = (endpoint, data) => apiCall(endpoint, "PUT", data);
export const deleteData = (endpoint, data) => apiCall(endpoint, "DELETE", data);

