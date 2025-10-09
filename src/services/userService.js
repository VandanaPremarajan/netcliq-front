import axios from "axios";
import { Base_URL, TOKEN_HEADER_KEY } from "../constants/api_settings";

const API_URL = Base_URL + "users";

export const addSubscriber = async (user) => {
  try {
    return await axios.post(API_URL + "/register/subscriber", user);
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else if (error.request) {
      console.error("No response from server:", error.request);
    } else {
      console.error("Error creating subscription:", error.message);
    }
    throw error;
  }
};

export const addAdmin = async (user) => {
  try {
    return await axios.post(API_URL + "/register/admin", user);
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else if (error.request) {
      console.error("No response from server:", error.request);
    } else {
      console.error("Error creating subscription:", error.message);
    }
    throw error;
  }
};

export const isValidSubscriber = async (user) => {
  try {
    return await axios.post(API_URL + "/login/subscriber", user);
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else if (error.request) {
      console.error("No response from server:", error.request);
    } else {
      console.error("Error creating subscription:", error.message);
    }
    throw error;
  }
};

export const isValidAdmin = async (user) => {
  try {
    return await axios.post(API_URL + "/login/admin", user);
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else if (error.request) {
      console.error("No response from server:", error.request);
    } else {
      console.error("Error creating subscription:", error.message);
    }
    throw error;
  }
};

export const getAllUser = async () => {
  try {
    return await axios.get(API_URL);
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else if (error.request) {
      console.error("No response from server:", error.request);
    } else {
      console.error("Error creating subscription:", error.message);
    }
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    return await axios.get(`${API_URL}/${id}`);
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else if (error.request) {
      console.error("No response from server:", error.request);
    } else {
      console.error("Error creating subscription:", error.message);
    }
    throw error;
  }
};

export const updateUser = async (id, user) => {
  try {
    return await axios.put(`${API_URL}/${id}`, user);
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else if (error.request) {
      console.error("No response from server:", error.request);
    } else {
      console.error("Error creating subscription:", error.message);
    }
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    return await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else if (error.request) {
      console.error("No response from server:", error.request);
    } else {
      console.error("Error creating subscription:", error.message);
    }
    throw error;
  }
};
