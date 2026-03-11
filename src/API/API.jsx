// src/services/api.js
import axios from "axios";
const postUrl = "resqhavenbackend-production.up.railway.app/auth/"
const BASE_URL = 'resqhavenbackend-production.up.railway.app';

// GET request
export const getRequest = async (endpoint) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${endpoint}`
    );
    return response.data;
  } catch (error) {
    console.error('GET Error:', error);
    throw error;
  }
};

// POST request
export const postRequest = async (endpoint, data) => {
  try {
    const response = await axios.post(
      `${postUrl}${endpoint}`, data,
      {
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    console.error('POST Error:', error);
    throw error;
  }
};

// PUT request
export const putRequest = async (endpoint, data) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${endpoint}`, data
    );
    return response.data;
  } catch (error) {
    console.error('PUT Error:', error);
    throw error;
  }
};

// DELETE request
export const deleteRequest = async (endpoint) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/${endpoint}`
    );
    return response.data;
  } catch (error) {
    console.error('DELETE Error:', error);
    throw error;
  }
};