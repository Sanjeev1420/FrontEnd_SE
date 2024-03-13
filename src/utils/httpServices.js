import axios from "axios";

const get = async (url, params = {}) => {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to perform GET request");
  }
};

const post = async (url, data = {}, token = null) => {
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const result = await axios.post(url, data, {
    headers: headers,
  });
  return result;
};

const put = async (url, data = {}, token = null) => {
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await axios.put(url, data, {
    headers: headers,
  });
  return response;
};

const remove = async (url, token = null) => {
  const headers = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await axios.delete(url, {
    headers: headers,
  });
  return response;
};

export const http = {
  get,
  post,
  put,
  delete: remove,
};

export const host = "http://localhost:4000";
