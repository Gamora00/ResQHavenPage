import axios from "axios";

const BASE_URL = 
  'https://resqhavenbackend-production.up.railway.app'

axios.defaults.withCredentials = true

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
      `${BASE_URL}/${endpoint}`, // ← removed hardcoded /auth/
      data
    );
    return response.data;
  } catch (error) {
    console.error('POST Error:', error);
    throw error;
  }
};