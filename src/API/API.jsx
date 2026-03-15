import axios from "axios";

const BASE_URL = 'https://resqhavenbackend-production.up.railway.app'

    //const BASE_URL = 'http://localhost:5000'


// GET request
export const getRequest = async (endpoint) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${endpoint}`,
      { withCredentials: true } 
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
      `${BASE_URL}/${endpoint}`, 
      data,
      { withCredentials: true } 
    );
    return response.data;
  } catch (error) {
    console.error('POST Error:', error);
    throw error;
  }
};